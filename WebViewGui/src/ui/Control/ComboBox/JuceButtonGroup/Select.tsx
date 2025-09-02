import Stack from '@mui/material/Stack';

import { type SelectProps } from '@mui/material/Select';

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export interface JuceComboBoxProps
  extends Omit<
    SelectProps,
    | 'value'
    | 'onChange'
  > {
  value: number | string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  choices: any;
}

export default function JuceComboBox({
  choices,
  ...props
}: JuceComboBoxProps) {
  const handleChange = (event: React.MouseEvent<HTMLElement>, nextValue: string) => {
    props.onChange(event, nextValue);
  };

  return (
    <Stack
      alignItems="center"
      sx={{
        pt: 8,
        '& .MuiButtonBase-root': {
          mb: '-0.3em',
          backgroundColor: 'var(--mui-palette-primary-darken)',
          color: 'var(--mui-palette-white)',
          fontWeight: 'var(--mui-fontWeight-lg)',
          borderRadius: '0.5em',
          border: '0.15em solid var(--mui-palette-black)',
          padding: '0.8em 1.5em',
          boxShadow: '0em 0.2em 0.4em rgba(0,0,0,0.5), inset 0em 0.1em 0.4em rgba(255,255,255,0.3)',
          '&:hover': {
            backgroundColor: 'var(--mui-palette-primary-main)',
          },
          '&.Mui-selected': {
            boxShadow: 'none',
            borderColor: 'var(--mui-palette-primary-light)',
            backgroundColor: 'var(--mui-palette-primary-lighten)',
          },
        }
      }}
    >
      <ToggleButtonGroup
        orientation="vertical"
        value={props.value}
        exclusive
        onChange={handleChange}
        sx={{
          width: 'fit-content'
        }}
      >
        {choices.map((choice: number | string, i: number) => (
          <ToggleButton
            key={i}
            value={i}
          >
            {choice}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Stack>
  );
}
