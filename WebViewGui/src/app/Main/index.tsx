import * as Juce from 'juce-framework-frontend';

import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';

import JuceKnob from '@/src/ui/Control/Slider/JuceKnob';
import JuceButtons from '@/src/ui/Control/ComboBox/JuceButtonGroup';

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
        '& > div:last-child': {
          borderRight: 'none',
        },
        '& .MuiGrid-root': {
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }
      }}
    >
      <Grid container size={3}>
        <JuceKnob
          identifier="inputGainSlider"
          defaultValue={0.5}
          subDigit={1}
        />
      </Grid>
      <Grid container size={6}>
        <Stack
          direction="row"
          alignItems="center"
        >
          <JuceKnob
            identifier="saturationDriveSlider"
            defaultValue={0.5}
            subDigit={1}
          />
          <JuceButtons identifier="saturationTypeCombo" />
        </Stack>
      </Grid>
      <Grid container size={3}>
        <JuceKnob
          identifier="outputGainSlider"
          defaultValue={0.5}
          subDigit={1}
        />
      </Grid>
    </Grid>
  );
}
