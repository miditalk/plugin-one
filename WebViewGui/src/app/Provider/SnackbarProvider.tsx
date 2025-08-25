'use client';

import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import { useSnackbarStore } from '@/src/store/SnackbarStore';

export default function App() {
  const { open, onClose, message } = useSnackbarStore();

  const handleClose = (event: any, reason: any) => {
    if (reason === 'clickaway') {
      return;
    }

    onClose();
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
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      message={message}
      action={action}
    />
  );
}
