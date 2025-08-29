import Box from '@mui/material/Box';

export default function JuceSlider() {
  const step = 9;
  const stepArray = Array.from({ length: step });

  return (
    <>
      {stepArray.map((value, index) => (
        <Box
          key={`guide${index}`}
          component="div"
          className="guide"
          sx={{
            position: 'absolute',
            width: 'var(--distance-guide)',
            height: 'var(--distance-guide)',
            transform: `
              translate(-50%, -50%)
              rotate(${(index * (270 / (step - 1))) + 270}deg)
            `,
          }}
        >
          <Box
            component="div"
            sx={{
              width: 'var(--guide-width)',
              height: 'var(--guide-height)',
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
