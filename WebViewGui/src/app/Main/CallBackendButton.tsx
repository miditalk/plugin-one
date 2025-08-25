'use client';

import * as Juce from 'juce-framework-frontend';

import Button from '@mui/material/Button';

import { useSnackbarStore } from '@/src/store/SnackbarStore';

const sayHello = Juce.getNativeFunction('sayHello');

export default function App() {
  const { setOpen } = useSnackbarStore();

  return (
    <Button
      variant="contained"
      sx={{ marginTop: 2 }}
      onClick={() => {
        (sayHello('JUCE') as Promise<string>).then((result: string) => {
          setOpen(result);

          return null;
        }).catch(null);
      }}
    >
      Call backend function
    </Button>
  );
}
