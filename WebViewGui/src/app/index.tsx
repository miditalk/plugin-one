import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import '@fontsource/Pretendard/400.css';
import '@fontsource/Pretendard/500.css';
import '@fontsource/Pretendard/600.css';
import '@fontsource/Pretendard/700.css';

import Main from './Main';
import Header from './Header';
import Footer from './Footer';
import Provider from './Provider';

export default function App() {
  return (
    <Provider>
      <Box
        sx={{
          display: 'flex',
          minHeight: '100dvh'
        }}
      >
        <Stack>
          <Header />
          <Main />
          <Footer />
        </Stack>
      </Box>
    </Provider>
  );
}
