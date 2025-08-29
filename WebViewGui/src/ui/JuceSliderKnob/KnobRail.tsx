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
        backgroundColor: 'var(--mui-palette-primary-lighten)',
        transform: `
          translate(-50%, -50%)
        `,
        zIndex: 200
      }}
    />
  );
}
