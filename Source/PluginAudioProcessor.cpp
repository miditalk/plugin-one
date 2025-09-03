/*
  ==============================================================================

    PluginAudioProcessor.cpp
    Created: 3 Sep 2025 11:01:38am
    Author:  JoEunsoo

  ==============================================================================
*/

#include <JuceHeader.h>
#include "PluginAudioProcessor.h"

//==============================================================================
PluginAudioProcessor::PluginAudioProcessor (AudioProcessorValueTreeState::ParameterLayout layout)
: AudioProcessor (BusesProperties()
#if ! JucePlugin_IsMidiEffect
#if ! JucePlugin_IsSynth
                  .withInput  ("Input",  juce::AudioChannelSet::stereo(), true)
#endif
                  .withOutput ("Output", juce::AudioChannelSet::stereo(), true)
#endif
                  ),
parameters (layout),
state (*this, nullptr, "STATE", std::move (layout))
{
}

//==============================================================================
void PluginAudioProcessor::prepareToPlay (double sampleRate, int samplesPerBlock)
{
    const auto channels = std::max (getTotalNumInputChannels(), getTotalNumOutputChannels());
    
    if (channels == 0)
        return;
    
    const juce::dsp::ProcessSpec spec =
        { sampleRate, (uint32_t) samplesPerBlock, (uint32_t) channels };

    sampleRate = spec.sampleRate;

    saturation.prepare (spec);
    saturation.reset();

    tiltEQ.prepare(spec);

    inputGain.setGainDecibels(0.0f);
    inputGain.reset();
    outputGain.setGainDecibels(0.0f);
    outputGain.reset();
}

bool PluginAudioProcessor::isBusesLayoutSupported (const BusesLayout& layouts) const
{
    if (layouts.getMainOutputChannelSet() != juce::AudioChannelSet::mono()
        && layouts.getMainOutputChannelSet() != juce::AudioChannelSet::stereo())
        return false;
    
    if (layouts.getMainOutputChannelSet() != layouts.getMainInputChannelSet())
        return false;
    
    return true;
}

void PluginAudioProcessor::processBlock (juce::AudioBuffer<float>& buffer,
                                         juce::MidiBuffer&)
{
    juce::ScopedNoDenormals noDenormals;
    
    const auto totalNumInputChannels  = getTotalNumInputChannels();
    const auto totalNumOutputChannels = getTotalNumOutputChannels();
    
    for (auto i = totalNumInputChannels; i < totalNumOutputChannels; ++i)
        buffer.clear (i, 0, buffer.getNumSamples());
    
    inputGain.setGainDecibels(parameters.inputGain.get());
    outputGain.setGainDecibels(parameters.outputGain.get());
    
    saturation.setDrive(parameters.saturationDrive.get());
    const auto SaturationMode = [this]
    {
        switch (parameters.saturationType.getIndex())
        {
            case 0:
                return SaturationType::Tube;
            case 1:
                return SaturationType::Tape;
            case 2:
                return SaturationType::Transistor;
            case 3:
                return SaturationType::Polynomial;
            case 4:
                return SaturationType::Exponential;
            case 5:
                return SaturationType::Arctangent;
            case 6:
                return SaturationType::Sine;
            case 7:
                return SaturationType::Cubic;
                
            default:
                return SaturationType::Tape;
        }
    }();
    
    saturation.setType(SaturationMode);

    tiltEQ.setTilt(parameters.tilt.get());

    auto outBlock = dsp::AudioBlock<float> { buffer }.getSubsetChannelBlock (0, (size_t) getTotalNumOutputChannels());
    
    if (!parameters.bypass.get()) {
        inputGain.process(dsp::ProcessContextReplacing<float> (outBlock));
        
        saturation.process(dsp::ProcessContextReplacing<float> (outBlock));

        tiltEQ.process(dsp::ProcessContextReplacing<float> (outBlock));

        outputGain.process(dsp::ProcessContextReplacing<float> (outBlock));
    }

}

//==============================================================================
void PluginAudioProcessor::getStateInformation (juce::MemoryBlock& destData)
{
    juce::ignoreUnused (destData);
}

void PluginAudioProcessor::setStateInformation (const void* data, int sizeInBytes)
{
    juce::ignoreUnused (data, sizeInBytes);
}
