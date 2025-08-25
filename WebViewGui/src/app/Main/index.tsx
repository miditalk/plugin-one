import * as Juce from 'juce-framework-frontend';

import Grid from '@mui/material/Grid';
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
    <Grid
      container
      spacing={2}
      sx={{
        flexGrow: 1,
        '--Grid-borderWidth': '1px',
        '& > div': {
          borderRight: 'var(--Grid-borderWidth) solid',
          borderColor: 'divider',
        },
      }}
    >
      <Grid container size={9}>
        <Stack
          alignItems="center"
          justifyContent="center"
          spacing={2}
        >
          <JuceSlider identifier="cutoffSlider" title="Cutoff" />
          <CallBackendButton />
          <FetchDataButton />
          <JuceCheckbox identifier="muteToggle" />
          <JuceComboBox identifier="filterTypeCombo" />
        </Stack>
      </Grid>
      <Grid container size={3}>
        test
      </Grid>
    </Grid>
  );
}
