import Box from '@mui/material/Box';

export interface KnobProps {
  width?: number
}

export default function JuceSlider({
  width = 100,
}: KnobProps) {
  const distanceHalf = width * 0.5;
  const distanceGuide = width * 0.43;

  const step = 9;
  const stepArray = Array.from({ length: step });

  const guideWidth = width * 0.1;
  const guideHeight = width * 0.03;

  return (
    <>
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
    </>
  );
}
