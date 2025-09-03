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
    Off,
    Tube,
    Tape,
    Transistor,
    Exponential,
    Arctangent,
    Sine, //
    Logarithmic,
    Sigmoid, //
    TanhVariant, //
    Second, //
    Third //
};

template <typename SampleType>
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
    
    void process (const juce::dsp::ProcessContextReplacing<SampleType>& context) override
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
    void setDrive(SampleType newDrive) { drive = juce::jlimit(0.0f, 1.0f, newDrive / 100.0f); }
    
    private:
    SaturationType type { SaturationType::Tube };
    SampleType drive { 0.5f };
    double sampleRate { 44100.0 };
    
    // =====================================
    // 내부 샘플 처리
    // =====================================
    float processSample(SampleType x) const
    {
        switch (type)
        {
            case SaturationType::Off:       return x;
            case SaturationType::Tube:       return tube(x);
            case SaturationType::Tape:       return tape(x);
            case SaturationType::Transistor: return transistor(x);
            case SaturationType::Exponential:return exponential(x);
            case SaturationType::Arctangent: return arctangent(x);
            case SaturationType::Sine:       return sine(x);
            case SaturationType::Logarithmic: return logarithmic(x);
            case SaturationType::Sigmoid:     return sigmoid(x);
            case SaturationType::TanhVariant: return tanhvariant(x);
            case SaturationType::Second: return second(x);
            case SaturationType::Third: return third(x);
        }
        return x;
    }
    
    float tube(SampleType x) const
    {
        float g = 2.0f * drive + 1.0f;
        return std::tanh(g * x);
    }
    
    float tape(SampleType x) const
    {
        float g = 2.0f * drive + 1.0f;
        float y = g * x - std::pow(g * x, 3) / 3.0f;
        return juce::jlimit(-1.0f, 1.0f, y);
    }
    
    float transistor(SampleType x) const
    {
        float g = 5.0f * drive + 1.0f;
        if (x > 1.0f / g)  return  2.0f / 3.0f;
        if (x < -1.0f / g) return -2.0f / 3.0f;
        return g * x - std::pow(g * x, 3) / 3.0f;
    }
    
    float exponential(SampleType x) const
    {
        float g = 4.0f * drive + 1.0f;
        return juce::jlimit(-1.0f, 1.0f,
                            (x >= 0.0f ? 1.0f : -1.0f) * (1.0f - std::exp(-std::abs(g * x))));
    }
    
    float arctangent(SampleType x) const
    {
        float g = 5.0f * drive + 1.0f;
        return (2.0f / juce::MathConstants<float>::pi) * std::atan(g * x);
    }
    
    float sine(SampleType x) const
    {
        float g = juce::jmap(drive, 1.0f, 4.0f);
        return std::sin(g * x);
    }
    
    float logarithmic(SampleType x) const
    {
        float g = 10.0f * drive + 1.0f;
        return std::log(1.0f + g * std::abs(x)) / std::log(1.0f + g) * (x >= 0 ? 1.0f : -1.0f);
    }
    
    float sigmoid(SampleType x) const
    {
        float g = 6.0f * drive + 1.0f;
        return (2.0f / (1.0f + std::exp(-g * x))) - 1.0f;
    }
    
    float tanhvariant(float x) const
    {
        if (drive <= 0.0f) {
            return x;
        }
        return std::tanh(drive * x) / std::tanh(drive);
    }
    
    float second(SampleType x) const
    {
        return x + drive * x * x;
        /*
         SampleType signX = (x >= 0.0f) ? 1.0f : -1.0f;
         return x + drive * x * x * signX;
         */
    }
    
    float third(SampleType x) const
    {
        return x - drive * x * x * x;
    }
};
