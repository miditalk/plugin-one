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
    Polynomial,
    Exponential,
    Arctangent,
    Sine,
    Cubic,
    Logarithmic,
    Sigmoid,
    Chebyshev2,
    Chebyshev3,
    Wavefolder,
    Diode,
    TanhVariant,
    Hermite,
    Rectifier,
    Asymmetric,
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
            case SaturationType::Exponential:return exponential(x);
            case SaturationType::Arctangent: return arctangent(x);
            case SaturationType::Sine:       return sine(x);
            case SaturationType::Cubic:      return cubic(x);
            case SaturationType::Logarithmic: return logarithmic(x);
            case SaturationType::Sigmoid:     return sigmoid(x);
            case SaturationType::Chebyshev2:  return chebyshev2(x);
            case SaturationType::Chebyshev3:  return chebyshev3(x);
            case SaturationType::Wavefolder:  return wavefolder(x);
            case SaturationType::Diode:       return diode(x);
            case SaturationType::TanhVariant: return tanhvariant(x);
            case SaturationType::Hermite:     return hermite(x);
            case SaturationType::Rectifier:   return rectifier(x);
            case SaturationType::Asymmetric:  return asymmetric(x);
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
    
    // Exponential
    float exponential(float x) const
    {
        float g = 4.0f * drive + 1.0f;
        return juce::jlimit(-1.0f, 1.0f,
                            (x >= 0.0f ? 1.0f : -1.0f) * (1.0f - std::exp(-std::abs(g * x))));
    }
    
    // Arctangent
    float arctangent(float x) const
    {
        float g = 5.0f * drive + 1.0f;
        return (2.0f / juce::MathConstants<float>::pi) * std::atan(g * x);
    }
    
    // Sine Shaper
    float sine(float x) const
    {
        float g = juce::jmap(drive, 1.0f, 4.0f);
        return std::sin(g * x);
    }
    
    // Cubic Soft Clip
    float cubic(float x) const
    {
        if (x > 1.0f) return 1.0f;
        if (x < -1.0f) return -1.0f;
        return (1.5f * x) - (0.5f * x * x * x);
    }
    
    // ------------- Logarithmic -------------
    float logarithmic(float x) const
    {
        float g = 10.0f * drive + 1.0f;
        return std::log(1.0f + g * std::abs(x)) / std::log(1.0f + g) * (x >= 0 ? 1.0f : -1.0f);
    }
    
    // ------------- Sigmoid (Logistic) -------------
    float sigmoid(float x) const
    {
        float g = 6.0f * drive + 1.0f;
        return (2.0f / (1.0f + std::exp(-g * x))) - 1.0f;
    }
    
    // ------------- Chebyshev 2nd Order -------------
    float chebyshev2(float x) const
    {
        return 2.0f * x * x - 1.0f;
    }
    
    // ------------- Chebyshev 3rd Order -------------
    float chebyshev3(float x) const
    {
        return 4.0f * x * x * x - 3.0f * x;
    }
    
    // ------------- Wavefolder -------------
    float wavefolder(float x) const
    {
        float limit = 1.0f / (drive + 0.001f);
        if (x > limit || x < -limit)
        {
            x = fmod(x - limit, limit * 4.0f);
            if (x < 0) x += limit * 4.0f;
            x = x - limit * 2.0f;
            if (x > limit) x = 2.0f * limit - x;
            else if (x < -limit) x = -2.0f * limit - x;
        }
        return x;
    }
    
    // ------------- Diode Clipper -------------
    float diode(float x) const
    {
        float vt = 0.2f; // thermal voltage 근사
        float g  = 5.0f * drive + 1.0f;
        return (x - vt * std::log(1.0f + std::exp(g * x / vt))) / (1.0f + vt);
    }

    float tanhvariant(float x) const
    {
        return std::tanh(drive * x) / std::tanh(drive);
    }

    float hermite(float x) const
    {
        return x - (x * x * x) / 3.0f;
    }
    
    float rectifier(float x) const
    {
        float ax = std::fabs(x * drive);
        return (1.0f - std::exp(-ax)) * (x >= 0 ? 1.0f : -1.0f);
    }
    
    float asymmetric(float x) const
    {
        return (x >= 0) ? std::tanh(drive * 0.7f * x)
        : std::tanh(drive * 1.3f * x);
    }
    
};
