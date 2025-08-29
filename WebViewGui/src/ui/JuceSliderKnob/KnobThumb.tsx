import Box from '@mui/material/Box';

export interface KnobProps {
  value: number
}

export default function JuceSlider({
  value
}: KnobProps) {
  return (
    <Box
      sx={{
        position: 'absolute',
        width: 'var(--distance-thumb)',
        height: 'var(--distance-thumb)',
        transform: `
          translate(-50%, -50%)
          rotate(${(value * 270) + 270}deg)
        `,
      }}
    >
      <Box
        component="div"
        sx={{
          width: 'var(--thumb-width)',
          height: 'var(--thumb-height)',
          backgroundColor: 'currentColor',
          borderRadius: '10px',
          transform: `
            rotate(45deg)
          `,
        }}
      />
    </Box>
  );
}
