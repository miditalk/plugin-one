import { PluginName } from '@/src/define';
import AppBar from '@mui/material/AppBar';
import Stack from '@mui/material/Stack';
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
      <Stack
        direction="row"
        alignItems="center"
        sx={{
          minHeight: 'var(--Header-minHeight)'
        }}
      >
        <Typography fontWeight="var(--mui-fontWeight-xl)">
          {PluginName}
        </Typography>
      </Stack>
    </AppBar>
  );
}
