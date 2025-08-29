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
import KnobThumb from './KnobThumb';
import KnobGuide from './KnobGuide';
import React from 'react';

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
    <React.Fragment>
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
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
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
          component="span"
          className="rail"
          sx={{
            position: 'absolute',
            width: '80%',
            height: '80%',
            borderRadius: '50%',
            backgroundColor: 'currentColor',
            opacity: 0.38,
          }}
        />

        <KnobGuide />
        <KnobThumb value={props.value} />
      </Box>

      <Slider
        {...props}
        value={props.value}
        sx={{ display: 'none' }}
      />
    </React.Fragment>
  );
}
