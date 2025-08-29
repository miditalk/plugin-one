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
        width: 'var(--thumb-width)',
        height: 'var(--thumb-height)',
        backgroundColor: 'var(--mui-palette-primary-moreDark)',
        transformOrigin: '50% 100%',
        borderRadius: '5px',
        transform: `
          translate(-50%, -100%)
          rotate(${(value * 270) + 225}deg)
        `,
        zIndex: 300
      }}
    >
    </Box>
  );
}
