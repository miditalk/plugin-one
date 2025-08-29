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
  width?: number
}

export default function JuceSlider({
  width = 100,
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

  const thumbWidth = width * 0.2;
  const thumbHeight = width * 0.1;
  const distanceHalf = width * 0.5;
  const distanceThumb = width * 0.25;
  const distanceGuide = width * 0.43;

  const step = 9;
  const stepArray = Array.from({ length: step });

  const guideWidth = width * 0.1;
  const guideHeight = width * 0.03;

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
            component="div"
            className="thumb"
            sx={{
              position: 'absolute',
              transform: `
                translate(${distanceHalf}px, ${distanceHalf}px)
                translate(-50%, -50%)
                rotate(${(props.value * 270) + 90}deg)
                translate(${distanceThumb}px, ${distanceThumb}px)
              `
            }}
          >
            <Box
              component="div"
              sx={{
                width: `${thumbWidth}px`,
                height: `${thumbHeight}px`,
                backgroundColor: 'currentColor',
                transform: `
                rotate(45deg)
                `,
              }}
            />
          </Box>
        {stepArray.map((value, index) => (
          <Box
            key={`guide${index}`}
            component="div"
            className="guide"
            sx={{
              position: 'absolute',
              transform: `
                translate(${distanceHalf}px, ${distanceHalf}px)
                translate(-50%, -50%)
                rotate(${(index * (270 / (step - 1))) + 90}deg)
                translate(${distanceGuide}px, ${distanceGuide}px)
              `
            }}
          >
            <Box
              component="div"
              sx={{
                width: `${guideWidth}px`,
                height: `${guideHeight}px`,
                backgroundColor: 'currentColor',
                transform: `
                rotate(45deg)
                `,
              }}
            />
          </Box>
        ))}
      </div>

      <Slider
        {...props}
        value={props.value}
        sx={{ display: 'none' }}
      />
    </>
  );
}
