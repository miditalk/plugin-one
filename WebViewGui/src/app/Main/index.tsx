import { useState } from 'react';
import * as Juce from 'juce-framework-frontend';

import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import JuceSlider from '@/ui/JuceSlider';
import JuceCheckbox from '@/ui/JuceCheckbox';
import JuceComboBox from '@/ui/JuceComboBox';

const controlParameterIndexAnnotation = 'controlparameterindex';

const sayHello = Juce.getNativeFunction('sayHello');

function App() {
  const controlParameterIndexUpdater = new Juce.ControlParameterIndexUpdater(
    controlParameterIndexAnnotation
  );

  document.addEventListener('mousemove', (event) => {
    controlParameterIndexUpdater.handleMouseMove(event);
  });

  const [open, setOpen] = useState(false);
  const [snackbarMessage, setMessage] = useState('No message received yet');

  const openSnackbar = () => {
    setOpen(true);
  };

  const handleClose = (event: any, reason: any) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const action = (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={handleClose}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );

  return (
    <div>
      <Container>
        <JuceSlider identifier="cutoffSlider" title="Cutoff" />
      </Container>
      <CardActions style={{ justifyContent: 'center' }}>
        <Button
          variant="contained"
          sx={{ marginTop: 2 }}
          onClick={() => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            sayHello('JUCE').then((result: any) => {
              setMessage(result);
              openSnackbar();
            });
          }}
        >
          Call backend function
        </Button>
      </CardActions>
      <CardActions style={{ justifyContent: 'center' }}>
        <Button
          variant="contained"
          sx={{ marginTop: 2 }}
          onClick={() => {
            fetch(Juce.getBackendResourceAddress('data.txt'))
              .then((response) => response.text())
              .then((text) => {
                setMessage('Data fetched: ' + text);
                openSnackbar();
              });
          }}
        >
          Fetch data from backend
        </Button>
      </CardActions>
      <JuceCheckbox identifier="muteToggle" />
      <br></br>
      <JuceComboBox identifier="filterTypeCombo" />
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={snackbarMessage}
        action={action}
      />
    </div>
  );
}

export default App;
