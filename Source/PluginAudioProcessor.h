/*
  ==============================================================================

    PluginAudioProcessor.h
    Created: 31 Aug 2025 10:22:01pm
    Author:  JoEunsoo

  ==============================================================================
*/

#pragma once

#include "NamespaceParameterId.h"
#include "SpectralBars.h"

//==============================================================================
class PluginAudioProcessor  : public AudioProcessor
{
public:
    //==============================================================================
    PluginAudioProcessor (AudioProcessorValueTreeState::ParameterLayout layout);

    //==============================================================================
    void prepareToPlay (double sampleRate, int samplesPerBlock) override;
    void releaseResources() override {}

    bool isBusesLayoutSupported (const BusesLayout& layouts) const override;

    void processBlock (AudioBuffer<float>&, MidiBuffer&) override;
    using AudioProcessor::processBlock;

    //==============================================================================
    const String getName() const override        { return JucePlugin_Name; }

    bool acceptsMidi() const override            { return false; }
    bool producesMidi() const override           { return false; }
    bool isMidiEffect() const override           { return false; }
    double getTailLengthSeconds() const override { return 0.0; }

    //==============================================================================
    int getNumPrograms() override                        { return 1; }
    int getCurrentProgram() override                     { return 0; }
    void setCurrentProgram (int) override                {}
    const String getProgramName (int) override           { return {}; }
    void changeProgramName (int, const String&) override {}

    //==============================================================================
    void getStateInformation (MemoryBlock& destData) override;
    void setStateInformation (const void* data, int sizeInBytes) override;

    struct Parameters
    {
    public:
        explicit Parameters (AudioProcessorValueTreeState::ParameterLayout& layout)
            : cutoffFreqHz (addToLayout<AudioParameterFloat> (layout,
                                                              ID::cutoffFreqHz,
                                                              "Cutoff",
                                                              NormalisableRange<float> { 200.0f, 14000.0f, 1.0f, 0.5f },
                                                              11000.0f,
                                                              AudioParameterFloatAttributes{}.withLabel ("Hz"))),
              mute (addToLayout<AudioParameterBool> (layout, ID::mute, "Mute", false)),
              filterType (addToLayout<AudioParameterChoice> (layout,
                                                             ID::filterType,
                                                             "Filter type",
                                                             StringArray { "Low-pass", "High-pass", "Band-pass" },
                                                             0))
        {
        }

        AudioParameterFloat&  cutoffFreqHz;
        AudioParameterBool&   mute;
        AudioParameterChoice& filterType;

    private:
        template <typename Param>
        static void add (AudioProcessorParameterGroup& group, std::unique_ptr<Param> param)
        {
            group.addChild (std::move (param));
        }

        template <typename Param>
        static void add (AudioProcessorValueTreeState::ParameterLayout& group, std::unique_ptr<Param> param)
        {
            group.add (std::move (param));
        }

        template <typename Param, typename Group, typename... Ts>
        static Param& addToLayout (Group& layout, Ts&&... ts)
        {
            auto param = std::make_unique<Param> (std::forward<Ts> (ts)...);
            auto& ref = *param;
            add (layout, std::move (param));
            return ref;
        }
    };

    Parameters parameters;
    AudioProcessorValueTreeState state;

    std::vector<float> spectrumData = [] { return std::vector<float> (16, 0.0f); }();
    SpinLock spectrumDataLock;

    SpectralBars spectralBars;

    dsp::LadderFilter<float> filter;

private:
    //==============================================================================
    JUCE_DECLARE_NON_COPYABLE_WITH_LEAK_DETECTOR (PluginAudioProcessor)
};

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

    filter.prepare ({ sampleRate, (uint32_t) samplesPerBlock, (uint32_t) channels });
    filter.reset();
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

    filter.setCutoffFrequencyHz (parameters.cutoffFreqHz.get());

    const auto filterMode = [this]
    {
        switch (parameters.filterType.getIndex())
        {
            case 0:
                return dsp::LadderFilter<float>::Mode::LPF12;

            case 1:
                return dsp::LadderFilter<float>::Mode::HPF12;

            default:
                return dsp::LadderFilter<float>::Mode::BPF12;
        }
    }();

    filter.setMode (filterMode);

    auto outBlock = dsp::AudioBlock<float> { buffer }.getSubsetChannelBlock (0, (size_t) getTotalNumOutputChannels());

    if (parameters.mute.get())
        outBlock.clear();

    filter.process (dsp::ProcessContextReplacing<float> (outBlock));

    spectralBars.push (Span { buffer.getReadPointer (0), (size_t) buffer.getNumSamples() });

    {
        const SpinLock::ScopedTryLockType lock (spectrumDataLock);

        if (! lock.isLocked())
            return;

        spectralBars.compute ({ spectrumData.data(), spectrumData.size() });
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
