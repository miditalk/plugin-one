import * as Juce from 'juce-framework-frontend';

import Grid from '@mui/material/Grid';

import JuceKnob from '@/src/ui/Control/Slider/JuceKnob';
import JuceButtons from '@/src/ui/Control/ComboBox/JuceButtons';
import JuceComboBox from '@/src/ui/Control/ComboBox/JuceComboBox';

import controlParameterIndexAnnotation from '@/src/define/controlParameterIndexAnnotation';

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
        userSelect: 'none',
        '--Grid-borderWidth': '1px',
        '& > div': {
          borderRight: 'var(--Grid-borderWidth) solid',
          borderColor: 'divider',
        },
        '& .MuiGrid-root': {
          flexDirection:'column',
          alignItems: 'center',
          justifyContent: 'center'
        }
      }}
    >
      <Grid container size={4}>
        <JuceKnob identifier="inputGainSlider" title="Input Gain" subDigit={1} />
      </Grid>
      <Grid container size={4}>
        <JuceButtons identifier="filterTypeCombo" />
      </Grid>
      <Grid container size={4}>
        <JuceKnob identifier="outputGainSlider" title="Output Gain" subDigit={1} />
      </Grid>
    </Grid>
  );
}
