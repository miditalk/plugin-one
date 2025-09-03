/*
  ==============================================================================

    TiltEQ.h
    Created: 3 Sep 2025 11:16:42am
    Author:  JoEunsoo

  ==============================================================================
*/

#pragma once
#include <JuceHeader.h>

// TiltEQ DSP
template <typename SampleType>
class DcOffsetFilter : public juce::dsp::ProcessorBase
{
public:
    DcOffsetFilter() {}

    void prepare(const juce::dsp::ProcessSpec& spec) override
    {
        sampleRate = spec.sampleRate;

        auto coeffs = juce::dsp::IIR::Coefficients<float>::makeHighPass (sampleRate, 20.0f);

        filter.reset();
        filter.state = coeffs;
        filter.prepare(spec);
    }

    void reset() override
    {
        filter.reset();
    }

    void process(const juce::dsp::ProcessContextReplacing<SampleType>& context) override
    {
        filter.process(context);
    }

    void setGain(float db) { tiltDb = db; }

private:
    double sampleRate = 44100.0;
    float tiltDb = 0.0f;

    // ProcessorDuplicator를 사용해 스테레오 대응
    juce::dsp::ProcessorDuplicator<juce::dsp::IIR::Filter<SampleType>,
                                   juce::dsp::IIR::Coefficients<SampleType>> filter;
};
