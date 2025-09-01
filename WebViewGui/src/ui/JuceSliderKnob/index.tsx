'use client';

import { useState, useEffect } from 'react';
import * as Juce from 'juce-framework-frontend';

import Box from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Knob from './Knob';

import controlParameterIndexAnnotation from '@/src/define/controlParameterIndexAnnotation';
import { toFixedDigits, valueTouchViewTimer } from '@/src/define';

type JuceSliderProps = {
  identifier: string,
  title: string,
  subDigit?: number
}

export default function JuceSlider({
  identifier, title, subDigit=toFixedDigits
}: JuceSliderProps) {
  const sliderState = Juce.getSliderState(identifier);

  const defaultTimer = valueTouchViewTimer;
  const [view, setView] = useState<'name' | 'value'>('name');
  const [timer, setTimer] = useState(0);
  const [value, setValue] = useState<number>(sliderState.getNormalisedValue());
  const [properties, setProperties] = useState(sliderState.properties);

  const handleChange = (event: Event, newValue: number | number[]) => {
    if (typeof newValue === 'number') {
      sliderState.setNormalisedValue(newValue);
      setValue(newValue);
    }
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
  useEffect(() => {
    setView('value');
    if (timer !== defaultTimer) {
      setTimer(defaultTimer);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[value]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      if (timer <= 0) {
        setView('name');
      } else setTimer(timer - 100);
    }, 100);

    return () => {
      clearTimeout(timerId);
    };
  },[timer]);

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
        textAlign="center"
        sx={{
          mt: 1.5,
          userSelect: 'none'
        }}
      >
        &nbsp;
        {view === 'name' && properties.name}
        {view === 'value' && `${sliderState.getScaledValue().toFixed(subDigit)} ${properties.label}`}
        &nbsp;
      </Typography>
    </Box>
  );
}
