import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

export default function App() {
  return (
    <AppBar
      color="info"
      sx={{
        position: 'static',
        px: 2,
        py: 0.5,
        '& .MuiTypography-root': {
          fontSize: 'var(--mui-fontSize-sm)',
          fontWeight: 'var(--mui-fontWeight-md)'
        }
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          minHeight: 'var(--Footer-minHeight)'
        }}
      >
        <Box />
      </Stack>
    </AppBar>
  );
}
