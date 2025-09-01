import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function App() {
  return (
    <AppBar
      color="info"
      sx={{
        position: 'static',
        px: 2,
        py: 1,
      }}
    >
      <Box>
        <Typography>
          Plugin One
        </Typography>
      </Box>
    </AppBar>
  );
}
