import * as Juce from 'juce-framework-frontend';

import Grid from '@mui/material/Grid';

import JuceSliderKnob from '@/ui/JuceSliderKnob';

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
        <JuceSliderKnob identifier="inputGainSlider" title="Input Gain" subDigit={2} />
      </Grid>
      <Grid container size={4}>
        <JuceSliderKnob identifier="driveSlider" title="Output" subDigit={0} />
      </Grid>
      <Grid container size={4}>
        <JuceSliderKnob identifier="outputGainSlider" title="Output Gain" subDigit={2} />
      </Grid>
    </Grid>
  );
}
