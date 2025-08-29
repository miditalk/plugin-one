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
      }}
    >
      <Box
        component="div"
        className="thumb"
        sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          transform: `
          rotate(${(value * 270) + 270}deg)
        `
        }}
      >
        <Box
          component="div"
          sx={{
            width: 'var(--thumb-width)',
            height: 'var(--thumb-height)',
            backgroundColor: 'currentColor',
            transform: `
                rotate(45deg)
              `,
          }}
        />
      </Box>
    </Box>
  );
}
