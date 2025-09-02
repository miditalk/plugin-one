import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { type SelectProps } from '@mui/material/Select';

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
        '& .MuiButtonBase-root': {
          px: 2,
          py: 2.5,
          color: 'var(--mui-palette-primary-light)',
          border: 'none',
          background: 'unset',
          '& .button': {
            backgroundColor: 'var(--mui-palette-primary-darker)',
            fontWeight: 'var(--mui-fontWeight-lg)',
            borderRadius: '0.5em',
            border: '0.1em solid var(--mui-palette-grey)',
            px: '0.8em',
            boxShadow: `
              0em 0.2em 0.4em rgba(0,0,0,0.5),
              inset 0em 0.1em 0.4em rgba(255,255,255,0.3)
            `,
          },
          '&:hover': {
            background: 'unset',
            '& .button': {
              // backgroundColor: 'var(--mui-palette-primary-lighter)',
            },
          },
          '&.Mui-selected': {
            color: 'var(--mui-palette-black)',
            '& .button': {
              boxShadow: 'none',
              backgroundColor: 'var(--mui-palette-primary-lightest)',
              borderColor: 'var(--mui-palette-primary-light)',
            }
          }
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
            disableRipple
          >
            <Stack
              direction="row"
              spacing={2}
            >
              <Box className="button" />
              <Typography>
                {choice}
              </Typography>
            </Stack>
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Stack>
  );
}
