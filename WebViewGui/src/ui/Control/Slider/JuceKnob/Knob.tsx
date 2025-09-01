'use client';

import {
  motion,
  useMotionValue,
  useTransform,
  useDragControls,
  useMotionValueEvent,
} from 'framer-motion';

import Box from '@mui/material/Box';
import Slider, { type SliderProps } from '@mui/material/Slider';

import KnobRail from './KnobRail';
import KnobThumb from './KnobThumb';
import KnobFill from './KnobFill';

export interface KnobProps
  extends
  Omit<
    SliderProps,
    | 'value'
  > {
  value: number;
  dragRange?: number;
}

export default function JuceSlider({
  dragRange = 150,
  ...props
}: KnobProps) {
  const handleValue = useMotionValue(props.value * (1-dragRange));
  const progressScaleValue = useTransform(handleValue, [0, -dragRange], [0, 1]);
  const dragControls = useDragControls();

  useMotionValueEvent(progressScaleValue, 'change', (latest) => {
    if (props.onChange) {
      props.onChange(new Event('change'), latest, 0);
    }
  });

  return (
    <Box>
      <Box
        className="slider-container"
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onMouseDown={(e: any) => {
          if (props.onMouseDown) {
            props.onMouseDown(e);
          }

          return dragControls.start(e, { snapToCursor: false, distanceThreshold: 0 });
        }}
        sx={{
          position: 'relative',
          width: '100%',
          aspectRatio: 1,
          color: 'var(--mui-palette-primary-main)',
        }}
      >
        <motion.div
          className="handle"
          drag="y"
          dragConstraints={{ top: -dragRange, bottom: 0 }}
          dragControls={dragControls}
          dragMomentum={false}
          onDragEnd={(event) => {
            if (props.onChangeCommitted) {
              props.onChangeCommitted(event, progressScaleValue.get());
            }
          }}
          style={{
            y: handleValue,
            // display:'none',
            backgroundColor: '#ff0000',
            width: '5px',
            height: '5px'
          }}
        />

        <svg
          viewBox="0 0 200 200"
        >
          <KnobFill value={props.value} />
          <KnobRail />
          <KnobThumb value={props.value} />
        </svg>
      </Box>

      <Slider
        {...props}
        value={props.value}
        sx={{ display: 'none' }}
      />
    </Box>
  );
}
