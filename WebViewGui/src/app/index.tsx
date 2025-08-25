import Box from '@mui/material/Box';

import '@fontsource/Pretendard/300.css';
import '@fontsource/Pretendard/400.css';
import '@fontsource/Pretendard/500.css';
import '@fontsource/Pretendard/700.css';

import Main from './Main';
import MuiProvider from './Provider/MuiProvider';

function App() {
  return (
    <MuiProvider>
      <Box>
        <Main />
      </Box>
    </MuiProvider>
  );
}

export default App;
