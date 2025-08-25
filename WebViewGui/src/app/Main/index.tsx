import * as Juce from 'juce-framework-frontend';

import Stack from '@mui/material/Stack';

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
      alignItems="center"
    >
      <JuceSlider identifier="cutoffSlider" title="Cutoff" />
      <CallBackendButton />
      <FetchDataButton />
      <JuceCheckbox identifier="muteToggle" />
      <JuceComboBox identifier="filterTypeCombo" />
    </Stack>
  );
}
