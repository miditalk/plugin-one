import * as Juce from 'juce-framework-frontend';

import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';

import JuceKnob from '@/src/ui/Control/Slider/JuceKnob';
import JuceButtons from '@/src/ui/Control/ComboBox/JuceButtonGroup';

import controlParameterIndexAnnotation from '@/src/define/controlParameterIndexAnnotation';
import JuceToggleButton from '@/src/ui/Control/ToggleButton/JuceToggleButton';

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
      sx={{
        flexGrow: 1,
        '--Grid-borderWidth': '1px',
        '& > div': {
          borderRight: 'var(--Grid-borderWidth) solid',
          borderColor: 'divider',
        },
        '& > div:last-child': {
          borderRight: 'none',
        },
        '& .MuiGrid-root': {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }
      }}
    >
      <Grid size={2}>
        <Stack
          direction="column"
          alignItems="center"
          justifyContent="center"
          spacing={2}
        >
          <JuceKnob
            identifier="inputGainSlider"
            title="Input"
            defaultValue={0.5}
            subDigit={1}
          />
          <JuceKnob
            identifier="saturationDriveSlider"
            title="Drive"
            defaultValue={0.5}
            subDigit={1}
            sx={{
              flexShrink: 0
            }}
          />
          <JuceToggleButton
            identifier="bypassToggle"
          />
        </Stack>
      </Grid>
      <Grid size={6}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
        >
          <JuceButtons
            identifier="saturationTypeCombo"
            hideTitle
          />
        </Stack>
      </Grid>
      <Grid
        size={2}
      >
        <Stack
          justifyContent="center"
          spacing={2}
        >
          <JuceKnob
            identifier="emphasisSlider"
            title="Emphasis"
            defaultValue={0.5}
            subDigit={1}
            sx={{
              flexShrink: 0
            }}
          />
          <JuceKnob
            identifier="tiltSlider"
            title="Tone/Tilt"
            defaultValue={0.5}
            subDigit={1}
          />
        </Stack>

      </Grid>
      <Grid
        size={2}
      >
        <JuceKnob
          identifier="outputGainSlider"
          title="Output"
          defaultValue={0.5}
          subDigit={1}
        />
      </Grid>
    </Grid>
  );
}
