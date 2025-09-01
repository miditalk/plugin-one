/*
 ==============================================================================
 
 PluginAudioProcessorEditor.h
 Created: 31 Aug 2025 10:18:34pm
 Author:  JoEunsoo
 
 ==============================================================================
 */

#pragma once

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
    
    void timerCallback() override
    {
        static constexpr size_t numFramesBuffered = 5;
        
        SpinLock::ScopedLockType lock { processorRef.spectrumDataLock };
        
        Array<var> frame;
        
        for (size_t i = 1; i < processorRef.spectrumData.size(); ++i)
            frame.add (processorRef.spectrumData[i]);
        
        spectrumDataFrames.push_back (std::move (frame));
        
        while (spectrumDataFrames.size() > numFramesBuffered)
            spectrumDataFrames.pop_front();
        
        static int64 callbackCounter = 0;
        
        if (   spectrumDataFrames.size() == numFramesBuffered
            && callbackCounter++ % (int64) numFramesBuffered)
        {
            webComponent.emitEventIfBrowserIsVisible ("spectrumData", var{});
        }
    }
    
    private:
    PluginAudioProcessor& processorRef;
    
    WebSliderRelay       inputGainSliderRelay    { "inputGainSlider" };
    WebSliderRelay       cutoffSliderRelay    { "cutoffSlider" };
    WebComboBoxRelay     filterTypeComboRelay { "filterTypeCombo" };
    WebSliderRelay       outputGainSliderRelay    { "outputGainSlider" };
    
    WebControlParameterIndexReceiver controlParameterIndexReceiver;
    
    SinglePageBrowser webComponent { WebBrowserComponent::Options{}
            .withBackend (WebBrowserComponent::Options::Backend::webview2)
            .withWinWebView2Options (WebBrowserComponent::Options::WinWebView2{}
                                     .withUserDataFolder (File::getSpecialLocation (File::SpecialLocationType::tempDirectory)))
            .withNativeIntegrationEnabled()
            .withOptionsFrom (inputGainSliderRelay)
            .withOptionsFrom (cutoffSliderRelay)
            .withOptionsFrom (filterTypeComboRelay)
            .withOptionsFrom (outputGainSliderRelay)
            .withOptionsFrom (controlParameterIndexReceiver)
            .withResourceProvider ([this] (const auto& url)
                                   {
                return getResource (url);
            },
                                   URL { localDevServerAddress }.getOrigin()) };
    
    WebSliderParameterAttachment       cutoffAttachment;
    WebComboBoxParameterAttachment     filterTypeAttachment;
    WebSliderParameterAttachment       inputGainAttachment;
    WebSliderParameterAttachment       outputGainAttachment;
    
    std::deque<Array<var>> spectrumDataFrames;
    
    JUCE_DECLARE_NON_COPYABLE_WITH_LEAK_DETECTOR (WebViewPluginAudioProcessorEditor)
};

static ZipFile* getZipFile()
{
#if ! true
    static auto stream = createAssetInputStream ("webviewplugin-gui_1.0.0.zip", AssertAssetExists::no);
    
    if (stream == nullptr)
        return nullptr;
    
    static ZipFile f { stream.get(), false };
    return &f;
#else
    const auto resourceDir = File::getSpecialLocation (File::currentExecutableFile)
        .getParentDirectory().getParentDirectory().getChildFile ("Resources");
    const auto resourceFile = resourceDir.getChildFile ("gui.zip");
    
    static auto stream = resourceFile.createInputStream();
    
    if (stream == nullptr)
        return nullptr;
    
    static ZipFile f { stream.get(), false };
    return &f;
#endif
}

static const char* getMimeForExtension (const String& extension)
{
    static const std::unordered_map<String, const char*> mimeMap =
    {
        { { "htm"   },  "text/html"                },
        { { "html"  },  "text/html"                },
        { { "txt"   },  "text/plain"               },
        { { "jpg"   },  "image/jpeg"               },
        { { "jpeg"  },  "image/jpeg"               },
        { { "svg"   },  "image/svg+xml"            },
        { { "ico"   },  "image/vnd.microsoft.icon" },
        { { "json"  },  "application/json"         },
        { { "png"   },  "image/png"                },
        { { "css"   },  "text/css"                 },
        { { "map"   },  "application/json"         },
        { { "js"    },  "text/javascript"          },
        { { "woff2" },  "font/woff2"               }
    };
    
    if (const auto it = mimeMap.find (extension.toLowerCase()); it != mimeMap.end())
        return it->second;
    
    jassertfalse;
    return "";
}

static String getExtension (String filename)
{
    return filename.fromLastOccurrenceOf (".", false, false);
}

static auto streamToVector (InputStream& stream)
{
    std::vector<std::byte> result ((size_t) stream.getTotalLength());
    stream.setPosition (0);
    [[maybe_unused]] const auto bytesRead = stream.read (result.data(), result.size());
    jassert (bytesRead == (ssize_t) result.size());
    return result;
}

std::optional<WebBrowserComponent::Resource> WebViewPluginAudioProcessorEditor::getResource (const String& url)
{
    const auto urlToRetrive = url == "/" ? String { "index.html" }
    : url.fromFirstOccurrenceOf ("/", false, false);
    
    if (auto* archive = getZipFile())
    {
        if (auto* entry = archive->getEntry (urlToRetrive))
        {
            auto stream = rawToUniquePtr (archive->createStreamForEntry (*entry));
            auto v = streamToVector (*stream);
            auto mime = getMimeForExtension (getExtension (entry->filename).toLowerCase());
            return WebBrowserComponent::Resource { std::move (v),
                std::move (mime) };
        }
    }
    
    if (urlToRetrive == "index.html")
    {
        auto fallbackIndexHtml = createAssetInputStream ("webviewplugin-gui-fallback.html");
        return WebBrowserComponent::Resource { streamToVector (*fallbackIndexHtml),
            String { "text/html" } };
    }
    
    if (urlToRetrive == "data.txt")
    {
        WebBrowserComponent::Resource resource;
        static constexpr char testData[] = "testdata";
        MemoryInputStream stream { testData, numElementsInArray (testData) - 1, false };
        return WebBrowserComponent::Resource { streamToVector (stream), String { "text/html" } };
    }
    
    if (urlToRetrive == "spectrumData.json")
    {
        Array<var> frames;
        
        for (const auto& frame : spectrumDataFrames)
            frames.add (frame);
        
        DynamicObject::Ptr d (new DynamicObject());
        d->setProperty ("timeResolutionMs", getTimerInterval());
        d->setProperty ("frames", std::move (frames));
        
        const auto s = JSON::toString (d.get());
        MemoryInputStream stream { s.getCharPointer(), s.getNumBytesAsUTF8(), false };
        return WebBrowserComponent::Resource { streamToVector (stream), String { "application/json" } };
    }
    
    return std::nullopt;
}

#if JUCE_ANDROID
// The localhost is available on this address to the emulator
const String localDevServerAddress = "http://10.0.2.2:3000/";
#else
const String localDevServerAddress = "http://localhost:3000/";
#endif

bool SinglePageBrowser::pageAboutToLoad (const String& newURL)
{
    return newURL == localDevServerAddress || newURL == getResourceProviderRoot();
}

//==============================================================================
WebViewPluginAudioProcessorEditor::WebViewPluginAudioProcessorEditor (PluginAudioProcessor& p)
: AudioProcessorEditor (&p), processorRef (p),
cutoffAttachment (*processorRef.state.getParameter (ID::cutoffFreqHz.getParamID()),
                  cutoffSliderRelay,
                  processorRef.state.undoManager),
filterTypeAttachment (*processorRef.state.getParameter (ID::filterType.getParamID()),
                      filterTypeComboRelay,
                      processorRef.state.undoManager),
inputGainAttachment (*processorRef.state.getParameter (ID::inputGain.getParamID()),
                     inputGainSliderRelay,
                     processorRef.state.undoManager),
outputGainAttachment (*processorRef.state.getParameter (ID::outputGain.getParamID()),
                      outputGainSliderRelay,
                      processorRef.state.undoManager)
{
    addAndMakeVisible (webComponent);
    
    webComponent.goToURL (localDevServerAddress);
    // webComponent.goToURL (WebBrowserComponent::getResourceProviderRoot());
    
    setSize (500, 300);
    
    startTimerHz (20);
}

//==============================================================================
void WebViewPluginAudioProcessorEditor::paint (Graphics& g)
{
    // (Our component is opaque, so we must completely fill the background with a solid colour)
    g.fillAll (getLookAndFeel().findColour (ResizableWindow::backgroundColourId));
}

void WebViewPluginAudioProcessorEditor::resized()
{
    webComponent.setBounds (getLocalBounds());
}
