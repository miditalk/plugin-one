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
    TanhVariant
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
    void setDrive(SampleType value) { drive = juce::jlimit(0.0f, 1.0f, value / 100.0f); }
    void setHarmonics(SampleType value) { harmonics = juce::jlimit(0.0f, 1.0f, value / 100.0f); }
    
    private:
    SaturationType type { SaturationType::TanhVariant };
    SampleType drive { 0.5f };
    SampleType harmonics { 0.5f };
    double sampleRate { 44100.0 };
    
    // =====================================
    // 내부 샘플 처리
    // =====================================
    float processSample(SampleType x) const
    {
        switch (type)
        {
            case SaturationType::Off:       return x;
            case SaturationType::TanhVariant: return tanhvariant(x);
        }
        return x;
    }
    
    float tanhvariant(float x0) const
    {
        
        float x = x0;
        float y = x;
        if (drive > 0.0f) {
            x = x0;
            x *= (1.0f - (drive * 0.1f)); // 입력보정
            x *= 4.0f; // 12 dB 밀어넣기

            y = (std::tanh(drive * x) / std::tanh(drive));
            
            y /= 4.0f; // -12 dB 빼기
        }

        if (harmonics > 0.0f) {
            float harmonicBoost = harmonics * 0.5f; // 0~0.5 정도 추천
            y += harmonicBoost * std::pow(y, 3); // 작은 신호에 약간의 3차 하모닉스 추가
            y *= (1.0f - (harmonics * 0.05f));
        }

        return juce::jlimit(-1.0f, 1.0f, y); // 최종 클리핑
    }
};
