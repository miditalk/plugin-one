'use client';

import { useState, useEffect } from 'react';
import * as Juce from 'juce-framework-frontend';

import Box from '@mui/material/Container';

import type { SelectChangeEvent } from '@mui/material/Select';

import controlParameterIndexAnnotation from '@/src/define/controlParameterIndexAnnotation';
import Typography from '@mui/material/Typography';
import { LabelTypographySx } from '@/src/ui/Style';

import Select from './Select';

type JuceComboBoxProps = {
  identifier: string,
  hideTitle?: boolean
}

export default function JuceComboBox({
  identifier,
  hideTitle = false
}: JuceComboBoxProps) {
  const comboBoxState = Juce.getComboBoxState(identifier);

  const [value, setValue] = useState(comboBoxState.getChoiceIndex());
  const [properties, setProperties] = useState(comboBoxState.properties);

  const handleChange = (event: SelectChangeEvent, nextValue: string | number) => {
    if (nextValue !== null) {
      comboBoxState.setChoiceIndex(nextValue);
      setValue(nextValue);
    }
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
      <Select
        value={value}
        choices={properties.choices}
        onChange={handleChange}
      />
      {!hideTitle &&
        <Typography
          className="cursorDefault"
          textAlign="center"
          sx={{
            ...LabelTypographySx,
            mt: '0.5em'
          }}
        >
          {properties.name}
        </Typography>
      }
    </Box>
  );
}
