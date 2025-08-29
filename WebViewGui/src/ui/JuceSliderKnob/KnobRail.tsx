import Box from '@mui/material/Box';

export default function JuceSlider() {
  return (
    <Box
      className="rail"
      sx={{
        position: 'absolute',
        width: '80%',
        height: '80%',
        borderRadius: '50%',
        backgroundColor: 'currentColor',
        opacity: 0.38,
        transform: `
            translate(-50%, -50%)
          `,
      }}
    />
  );
}
