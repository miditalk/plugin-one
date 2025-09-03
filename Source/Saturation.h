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
    TanhVariant,
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
            case SaturationType::TanhVariant: return tanhvariant(x);
        }
        return x;
    }
    
    float tube(SampleType x0) const
    {
        float x = x0; // 입력 보정
        float g = 2.0f * drive + 1.0f;
        return std::tanh(g * x);
    }
    
    float tape(SampleType x0) const
    {
        float x = x0; // 입력 보정
        float g = 2.0f * drive + 1.0f;
        float y = g * x - std::pow(g * x, 3) / 3.0f;
        return juce::jlimit(-1.0f, 1.0f, y);
    }
    
    float transistor(SampleType x0) const
    {
        float x = x0; // 입력 보정
        float g = 5.0f * drive + 1.0f;
        if (x > 1.0f / g)  return  2.0f / 3.0f;
        if (x < -1.0f / g) return -2.0f / 3.0f;
        return g * x - std::pow(g * x, 3) / 3.0f;
    }
    
    float tanhvariant(float x0) const
    {
        if (drive <= 0.0f) {
            return x0;
        }
        float x = x0;
        // float x = x0 * (1.0f + (drive * 1.0f)); // 입력 보정
        return (std::tanh(drive * x) / std::tanh(drive));
    }
    
};
