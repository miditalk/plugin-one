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
        fontSize: 'var(--mui-fontSize-sm)'
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
      >
        <Box>
          JoEunsoo
        </Box>
        <Box>
          v1.0.0
        </Box>
      </Stack>
    </AppBar>
  );
}
