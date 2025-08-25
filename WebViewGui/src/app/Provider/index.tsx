import MuiProvider from './MuiProvider';
import SnackbarProvider from './SnackbarProvider';

type ProviderProps = {
  children: React.ReactNode
}

export default function Provider({
  children
}: ProviderProps) {
  return (
    <MuiProvider>
      {children}
      <SnackbarProvider />
    </MuiProvider>
  );
}
