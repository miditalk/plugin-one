import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

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
        justifyContent="space-between"
      >
        <Box>
          <Typography>
            JoEunsoo
          </Typography>
        </Box>
        <Box>
          <Typography>
            v1.0.0
          </Typography>
        </Box>
      </Stack>
    </AppBar>
  );
}
