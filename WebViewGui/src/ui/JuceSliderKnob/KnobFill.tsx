import Box from '@mui/material/Box';

export interface KnobProps {
  value: number
}

export default function JuceSlider({
  value
}: KnobProps) {
  return (
    <>
      <Box
        sx={{
          position: 'absolute',
          width: '50%',
          height: '100%',
          transformOrigin: '100% 50%',
          backgroundColor: 'currentColor',
          borderRadius: '100% 0 0 100% / 50% 0 0 50%',
          transform: `
            translate(-100%, -50%)
            rotate(${(value * 270) + 225}deg)
          `,
          zIndex: 130
        }}
      />
      <Box
        sx={{
          display: value * 270 > 180 ? 'block' : 'none',
          position: 'absolute',
          width: '50%',
          height: '100%',
          transformOrigin: '100% 50%',
          backgroundColor: 'currentColor',
          borderRadius: '100% 0 0 100% / 50% 0 0 50%',
          transform: `
            translate(-100%, -50%)
            rotate(45deg)
          `,
          zIndex: 100
        }}
      />
      <Box
        sx={{
          display: value * 270 > 180 ? 'none' : 'block',
          position: 'absolute',
          width: '50%',
          height: '100%',
          transformOrigin: '100% 50%',
          boxSizing: 'content-box',
          border:'2px solid var(--mui-palette-background-default)',
          backgroundColor: 'var(--mui-palette-background-default)',
          borderRadius: '100% 0 0 100% / 50% 0 0 50%',
          transform: `
            translate(-100%, -50%)
            rotate(225deg)
          `,
          zIndex: 150
        }}
      />
    </>
  );
}
