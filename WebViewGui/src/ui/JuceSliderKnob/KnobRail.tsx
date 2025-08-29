import Box from '@mui/material/Box';

export default function JuceSlider() {
  return (
    <Box
      className="rail"
      sx={{
        position: 'absolute',
        width: 'var(--distance-rail)',
        height: 'var(--distance-rail)',
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
