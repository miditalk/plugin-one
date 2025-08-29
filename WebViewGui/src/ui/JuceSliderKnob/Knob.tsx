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
import KnobGuide from './KnobGuide';

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
  const handleValue = useMotionValue(props.value);
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
          '--thumb-width': '17%',
          '--thumb-height': '7%',
          '--guide-width': '10%',
          '--guide-height': '3%',
          '--distance-thumb': '50%',
          '--distance-guide': '70%',
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
            display: 'none',
          }}
        />

        <Box
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            left: '50%',
            top: '50%',
          }}
        >
          <KnobRail />
          <KnobGuide />
          <KnobThumb value={props.value} />
        </Box>
      </Box>

      <Slider
        {...props}
        value={props.value}
        sx={{ display: 'none' }}
      />
    </Box>
  );
}
