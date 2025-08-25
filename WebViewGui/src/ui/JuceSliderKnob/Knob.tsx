'use client';

import {
  motion,
  useMotionValue,
  useTransform,
  useDragControls,
  useMotionValueEvent
} from 'framer-motion';

import Box from '@mui/material/Box';
import Slider, { type SliderProps } from '@mui/material/Slider';

export interface KnobProps
  extends
  Omit<
    SliderProps,
    | 'value'
  > {
  value: number
  width?: number;
  thumbWidth?: number
}

export default function JuceSlider({
  width = 100,
  thumbWidth = 20,
  ...props
}: KnobProps) {
  const handleValue = useMotionValue(props.value);
  const progressScaleValue = useTransform(handleValue, [0, -width], [0, 1]);
  const dragControls = useDragControls();

  useMotionValueEvent(progressScaleValue, 'change', (latest) => {
    if (props.onChange) {
      props.onChange(new Event('change'), latest, 0);
    }
  });

  const distanceHalf = width * 0.5;
  const distanceThumb = width * 0.25;

  return (
    <>
      <div
        className="slider-container"
        onMouseDown={
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (e: any) => dragControls.start(e, { snapToCursor: false, distanceThreshold: 0 })
        }
        style={{
          position: 'relative',
          width: `${width}px`,
          height: `${width}px`,
          aspectRatio: 'auto 1 / 1',
          color: 'var(--mui-palette-primary-main)',
          boxSizing: 'content-box',
          display: 'inline-block'
        }}
      >
        <motion.div
          className="handle"
          drag="y"
          dragConstraints={{ top: -width, bottom: 0 }}
          dragControls={dragControls}
          dragMomentum={false}
          onDragEnd={(event) => {
            if (props.onChangeCommitted) {
              props.onChangeCommitted(event, progressScaleValue.get());
            }
          }}
          style={{
            y: handleValue,
            display: 'none'
          }}
        />
        <Box
          component="span"
          className="rail"
          sx={{
            position: 'absolute',
            width: `${width}px`,
            height: `${width}px`,
            borderRadius: '50%',
            backgroundColor: 'currentColor',
            opacity: 0.38
          }}
        />
        <Box
          className="thumb"
          sx={{
            // left: `${x}px`,
            // top: `${y}px`,
            position: 'absolute',
            width: `${thumbWidth}px`,
            height: `${thumbWidth}px`,
            borderRadius: '50%',
            backgroundColor: 'currentColor',
            // x: `${halfDistance}px`,
            // y: `${halfDistance}px`,
            transform: `
              translate(${distanceHalf}px, ${distanceHalf}px)
              translate(-50%, -50%)
              rotate(${(props.value * 270) + 90}deg)
              translate(${distanceThumb}px, ${distanceThumb}px)
            `
          }}
        />
      </div>

      <Slider
        {...props}
        value={props.value}
        sx={{ display: 'none' }}
      />
    </>
  );
}
