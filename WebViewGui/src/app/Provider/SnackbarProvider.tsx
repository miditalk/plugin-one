'use client';

import Snackbar, { type SnackbarCloseReason } from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import { useSnackbarStore } from '@/src/store/SnackbarStore';

export default function App() {
  const { open, onClose, message } = useSnackbarStore();

  const handleClose = (event: any, reason?: SnackbarCloseReason) => {
    if (reason === 'clickaway') {
      return;
    }

    onClose();
  };

  const action = (
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
