/*
  ==============================================================================

    Saturation.h
    Created: 2 Sep 2025 12:05:44pm
    Author:  JoEunsoo

  ==============================================================================
*/

#pragma once
#include <JuceHeader.h>
#include <cmath>

enum class SaturationType
{
    Tube,
    Tape,
    Transistor,
    Polynomial
};

class SaturationProcessor : public juce::dsp::ProcessorBase
{
public:
    SaturationProcessor() {}

    // =====================================
    // dsp::ProcessorBase 인터페이스
    // =====================================
    void prepare (const juce::dsp::ProcessSpec& spec) override
    {
        sampleRate = spec.sampleRate;
        reset();
    }

    void reset() override {}

    void process (const juce::dsp::ProcessContextReplacing<float>& context) override
    {
        auto& block = context.getOutputBlock();
        auto numChannels = block.getNumChannels();
        auto numSamples  = block.getNumSamples();

        for (size_t ch = 0; ch < numChannels; ++ch)
        {
            auto* channelData = block.getChannelPointer(ch);

            for (size_t i = 0; i < numSamples; ++i)
                channelData[i] = processSample(channelData[i]);
        }
    }

    // =====================================
    // 파라미터
    // =====================================
    void setType(SaturationType newType) { type = newType; }
    void setDrive(float newDrive) { drive = juce::jlimit(0.0f, 1.0f, newDrive / 100.0f); }

private:
    SaturationType type { SaturationType::Tube };
    float drive { 0.5f };
    double sampleRate { 44100.0 };

    // =====================================
    // 내부 샘플 처리
    // =====================================
    float processSample(float x) const
    {
        switch (type)
        {
            case SaturationType::Tube:       return tube(x);
            case SaturationType::Tape:       return tape(x);
            case SaturationType::Transistor: return transistor(x);
            case SaturationType::Polynomial: return polynomial(x);
        }
        return x;
    }

    // ---------------- Tube ----------------
    float tube(float x) const
    {
        float g = 2.0f * drive + 1.0f;
        return std::tanh(g * x);
    }

    // ---------------- Tape ----------------
    float tape(float x) const
    {
        float g = 2.0f * drive + 1.0f;
        float y = g * x - std::pow(g * x, 3) / 3.0f;
        return juce::jlimit(-1.0f, 1.0f, y);
    }

    // ---------------- Transistor ----------------
    float transistor(float x) const
    {
        float g = 5.0f * drive + 1.0f;
        if (x > 1.0f / g)  return  2.0f / 3.0f;
        if (x < -1.0f / g) return -2.0f / 3.0f;
        return g * x - std::pow(g * x, 3) / 3.0f;
    }

    // ---------------- Polynomial ----------------
    float polynomial(float x) const
    {
        float a1 = 1.0f;
        float a3 = 0.5f * drive;
        float a5 = 0.2f * drive;
        return a1 * x + a3 * std::pow(x, 3) + a5 * std::pow(x, 5);
    }
};
