import Box from '@mui/material/Box';

export interface KnobProps {
  value: number
  width?: number
}

export default function JuceSlider({
  width = 100,
  value
}: KnobProps) {
  const distanceHalf = width * 0.5;
  const distanceThumb = width * 0.28;

  const thumbWidth = width * 0.2;
  const thumbHeight = width * 0.07;

  return (
    <Box
      component="div"
      className="thumb"
      sx={{
        position: 'absolute',
        transform: `
          translate(${distanceHalf}px, ${distanceHalf}px)
          translate(-50%, -50%)
          rotate(${(value * 270) + 90}deg)
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
  );
}
