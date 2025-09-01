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
    >
      <ToggleButtonGroup
        orientation="vertical"
        value={props.value}
        exclusive
        onChange={handleChange}
        sx={{
          width:'fit-content'
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
