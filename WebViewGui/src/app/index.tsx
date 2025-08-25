import Box from '@mui/material/Box';

import '@fontsource/Pretendard/300.css';
import '@fontsource/Pretendard/400.css';
import '@fontsource/Pretendard/500.css';
import '@fontsource/Pretendard/700.css';

import Main from './Main';
import Provider from './Provider';

export default function App() {
  return (
    <Provider>
      <Box>
        <Main />
      </Box>
    </Provider>
  );
}
