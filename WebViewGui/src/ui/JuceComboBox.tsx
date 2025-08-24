import { useState, useEffect } from 'react';
import * as Juce from 'juce-framework-frontend';

import Box from '@mui/material/Container';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const controlParameterIndexAnnotation = 'controlparameterindex';

type JuceComboBoxProps = {
  identifier: string,
}

export default function JuceComboBox({
  identifier
}: JuceComboBoxProps) {

  const comboBoxState = Juce.getComboBoxState(identifier);

  const [value, setValue] = useState(comboBoxState.getChoiceIndex());
  const [properties, setProperties] = useState(comboBoxState.properties);

  const handleChange = (event: any) => {
    comboBoxState.setChoiceIndex(event.target.value);
    setValue(event.target.value);
  };

  useEffect(() => {
    const valueListenerId = comboBoxState.valueChangedEvent.addListener(() => {
      setValue(comboBoxState.getChoiceIndex());
    });
    const propertiesListenerId =
      comboBoxState.propertiesChangedEvent.addListener(() => {
        setProperties(comboBoxState.properties);
      });

    return function cleanup() {
      comboBoxState.valueChangedEvent.removeListener(valueListenerId);
      comboBoxState.propertiesChangedEvent.removeListener(propertiesListenerId);
    };
  });

  return (
    <Box
      {...{
        [controlParameterIndexAnnotation]:
          comboBoxState.properties.parameterIndex,
      }}
    >
      <FormControl fullWidth>
        <InputLabel id={identifier}>{properties.name}</InputLabel>
        <Select
          labelId={identifier}
          value={value}
          label={properties.name}
          onChange={handleChange}
        >
          {properties.choices.map((choice: any, i: number) => (
            <MenuItem value={i} key={i}>
              {choice}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
