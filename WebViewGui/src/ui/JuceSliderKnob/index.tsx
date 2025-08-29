'use client';

import { useState, useEffect } from 'react';
import * as Juce from 'juce-framework-frontend';

import Box from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Knob from './Knob';

import controlParameterIndexAnnotation from '@/src/define/controlParameterIndexAnnotation';
import { toFixedDigits } from '@/src/define';

type JuceSliderProps = {
  identifier: string,
  title: string,
}

export default function JuceSlider({
  identifier, title
}: JuceSliderProps) {
  const sliderState = Juce.getSliderState(identifier);

  const [value, setValue] = useState(sliderState.getNormalisedValue());
  const [properties, setProperties] = useState(sliderState.properties);

  const handleChange = (event: Event, newValue: number | number[]) => {
    sliderState.setNormalisedValue(newValue);
    setValue(newValue);
  };

  const mouseDown = () => {
    sliderState.sliderDragStarted();
  };

  const changeCommitted = (event: Event | React.SyntheticEvent<Element, Event>, newValue: number | number[]) => {
    sliderState.setNormalisedValue(newValue);
    sliderState.sliderDragEnded();
  };

  useEffect(() => {
    const valueListenerId = sliderState.valueChangedEvent.addListener(() => {
      setValue(sliderState.getNormalisedValue());
    });
    const propertiesListenerId = sliderState.propertiesChangedEvent.addListener(
      () => setProperties(sliderState.properties)
    );

    return function cleanup() {
      sliderState.valueChangedEvent.removeListener(valueListenerId);
      sliderState.propertiesChangedEvent.removeListener(propertiesListenerId);
    };
  });

  function calculateValue() {
    return sliderState.getScaledValue();
  }

  return (
    <Box
      {...{
        [controlParameterIndexAnnotation]:
          sliderState.properties.parameterIndex,
      }}
    >
      <Knob
        aria-label={title}
        value={value}
        scale={calculateValue}
        onChange={handleChange}
        min={0}
        max={1}
        step={1 / (properties.numSteps - 1)}
        onChangeCommitted={changeCommitted}
        onMouseDown={mouseDown}
      />
      <Typography
        sx={{
          mt: 1.5,
          userSelect: 'none'
        }}
      >
        {properties.name}: {sliderState.getScaledValue().toFixed(toFixedDigits)} {properties.label}
      </Typography>
    </Box>
  );
}
