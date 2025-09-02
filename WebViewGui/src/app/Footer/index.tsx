import * as Juce from 'juce-framework-frontend';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const visitWebsite = Juce.getNativeFunction('visitWebsite');

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
      >
        <Button
          onClick={() => visitWebsite('https://joeunsoo.com')}
          variant="text"
          sx={{
            color:'var(--mui-palette-white)'
          }}
        >
          JoEunsoo
        </Button>
        <Box>
          <Typography>
            v1.0.0
          </Typography>
        </Box>
      </Stack>
    </AppBar>
  );
}
