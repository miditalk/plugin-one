/*
 ==============================================================================
 
 PluginAudioProcessorEditor.h
 Created: 31 Aug 2025 10:18:34pm
 Author:  JoEunsoo
 
 ==============================================================================
 */

#pragma once

#include <JuceHeader.h>
#include "DemoUtilities.h"
#include "PluginAudioProcessor.h"

extern const String localDevServerAddress;

std::optional<WebBrowserComponent::Resource> getResource (const String& url);

//==============================================================================
struct SinglePageBrowser : WebBrowserComponent
{
    using WebBrowserComponent::WebBrowserComponent;
    
    // Prevent page loads from navigating away from our single page web app
    bool pageAboutToLoad (const String& newURL) override;
};

//==============================================================================
class WebViewPluginAudioProcessorEditor  : public AudioProcessorEditor, private Timer
{
    public:
    explicit WebViewPluginAudioProcessorEditor (PluginAudioProcessor&);
    
    std::optional<WebBrowserComponent::Resource> getResource (const String& url);
    
    //==============================================================================
    void paint (Graphics&) override;
    void resized() override;
    
    int getControlParameterIndex (Component&) override
    {
        return controlParameterIndexReceiver.getControlParameterIndex();
    }
    
    void timerCallback() override {
    }
    
    private:
    PluginAudioProcessor& processorRef;
    
    WebToggleButtonRelay bypassToggleRelay      { "bypassToggle" };
    WebSliderRelay       saturationDriveSliderRelay    { "saturationDriveSlider" };
    WebComboBoxRelay     saturationTypeComboRelay { "saturationTypeCombo" };
    WebSliderRelay       emphasisSliderRelay    { "emphasisSlider" };
    WebSliderRelay       tiltSliderRelay    { "tiltSlider" };
    WebSliderRelay       inputGainSliderRelay    { "inputGainSlider" };
    WebSliderRelay       outputGainSliderRelay    { "outputGainSlider" };
    
    WebControlParameterIndexReceiver controlParameterIndexReceiver;
    
    SinglePageBrowser webComponent { WebBrowserComponent::Options{}
            .withBackend (WebBrowserComponent::Options::Backend::webview2)
            .withWinWebView2Options (WebBrowserComponent::Options::WinWebView2{}
                                     .withUserDataFolder (File::getSpecialLocation (File::SpecialLocationType::tempDirectory)))
            .withNativeIntegrationEnabled()
            .withOptionsFrom (bypassToggleRelay)
            .withOptionsFrom (saturationDriveSliderRelay)
            .withOptionsFrom (saturationTypeComboRelay)
            .withOptionsFrom (emphasisSliderRelay)
            .withOptionsFrom (tiltSliderRelay)
            .withOptionsFrom (inputGainSliderRelay)
            .withOptionsFrom (outputGainSliderRelay)
            .withOptionsFrom (controlParameterIndexReceiver)
            .withNativeFunction ("visitWebsite", [](auto& var, auto complete) {
                const URL newUrl = URL (var[0].toString());
                if (newUrl.isWellFormed())
                    newUrl.launchInDefaultBrowser();
                complete ("done");
            })
            .withResourceProvider ([this] (const auto& url) {
                return getResource (url);
            },
                                   URL { localDevServerAddress }.getOrigin()) };
    
    WebToggleButtonParameterAttachment bypassAttachment;
    WebSliderParameterAttachment       saturationDriveAttachment;
    WebComboBoxParameterAttachment     saturationTypeAttachment;
    WebSliderParameterAttachment       emphasisAttachment;
    WebSliderParameterAttachment       tiltAttachment;
    WebSliderParameterAttachment       inputGainAttachment;
    WebSliderParameterAttachment       outputGainAttachment;
    
    JUCE_DECLARE_NON_COPYABLE_WITH_LEAK_DETECTOR (WebViewPluginAudioProcessorEditor)
};
