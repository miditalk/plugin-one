#pragma once

#include "DemoUtilities.h"
#include "PluginAudioProcessor.h"
#include "PluginAudioProcessorEditor.h"

class PluginAudioProcessorWrapper  : public PluginAudioProcessor
{
public:
    PluginAudioProcessorWrapper()  : PluginAudioProcessor ({})
    {}

    bool hasEditor() const override               { return true; }
    AudioProcessorEditor* createEditor() override { return new WebViewPluginAudioProcessorEditor (*this); }
};
