import * as Juce from 'juce-framework-frontend';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';

import JuceSlider from '@/ui/JuceSlider';
import JuceCheckbox from '@/ui/JuceCheckbox';
import JuceComboBox from '@/ui/JuceComboBox';

import controlParameterIndexAnnotation from '@/src/define/controlParameterIndexAnnotation';

import FetchDataButton from './FetchDataButton';
import CallBackendButton from './CallBackendButton';

export default function App() {
  const controlParameterIndexUpdater = new Juce.ControlParameterIndexUpdater(
    controlParameterIndexAnnotation
  );

  document.addEventListener('mousemove', (event) => {
    controlParameterIndexUpdater.handleMouseMove(event);
  });

  return (
    <Stack
      direction="row"
      divider={<Divider orientation="vertical" flexItem />}
      spacing={2}
      sx={{
        flexGrow: 1
      }}
    >
      <Stack
        alignItems="center"
        sx={{
          flexGrow: 2
        }}
      >
        <JuceSlider identifier="cutoffSlider" title="Cutoff" />
        <CallBackendButton />
        <FetchDataButton />
        <JuceCheckbox identifier="muteToggle" />
        <JuceComboBox identifier="filterTypeCombo" />
      </Stack>
      <Box
        sx={{
          flexGrow: 1
        }}
      >
        test
      </Box>
    </Stack>
  );
}
