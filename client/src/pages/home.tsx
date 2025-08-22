import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { 
  Video, 
  Download, 
  Zap, 
  Shield, 
  Smartphone, 
  Play,
  Clipboard,
  Loader2,
  ChevronDown
} from "lucide-react";
import { FAQItem } from "@/components/ui/faq-item";
import { LanguageSelector } from "@/components/ui/language-selector";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { useTranslation, type Language } from "@/lib/translations";
import { useLanguage } from "@/contexts/LanguageContext";

const createDownloadSchema = (t: any) => z.object({
  url: z.string().url(t('invalidUrl')).refine(
    (url) => url.includes("tiktok.com"),
    t('urlMustBeTiktok')
  ),
});

type DownloadForm = {
  url: string;
};

export default function Home() {
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [showDownloadOptions, setShowDownloadOptions] = useState(false);
  const [videoData, setVideoData] = useState<any>(null);
  const [showDelayedOptions, setShowDelayedOptions] = useState(false);
  const [downloadType, setDownloadType] = useState<'video' | 'audio'>('video');
  const { toast } = useToast();
  const { currentLanguage, setLanguage } = useLanguage();
  const { t } = useTranslation(currentLanguage);

  const downloadSchema = createDownloadSchema(t);

  const form = useForm<DownloadForm>({
    resolver: zodResolver(downloadSchema),
    defaultValues: {
      url: "",
    },
  });

  const downloadMutation = useMutation({
    mutationFn: async (data: DownloadForm) => {
      const response = await apiRequest("POST", "/api/download", data);
      return response.json();
    },
    onSuccess: (data) => {
      if (data.success) {
        setVideoData({
          ...data,
          thumbnail: data.thumbnail || 'https://via.placeholder.com/300x200?text=TikTok+Video',
          title: data.title || 'TikTok Video'
        });
        setShowDownloadOptions(true);
        // Immediately show the final download options (skip intermediate screen)
        setShowDelayedOptions(true);
      } else {
        throw new Error(data.error || t('downloadError'));
      }
    },
    onError: (error) => {
      toast({
        title: t('errorTitle'),
        description: error.message || t('downloadError'),
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: DownloadForm) => {
    downloadMutation.mutate(data);
  };
  
  const handleDownloadWithType = (type: 'video' | 'audio') => {
    setDownloadType(type);
    const formData = form.getValues();
    downloadMutation.mutate(formData);
  };

  const handlePasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        form.setValue("url", text);
      }
    } catch (error) {
      toast({
        title: t('errorTitle'),
        description: t('clipboardError'),
        variant: "destructive",
      });
    }
  };

  const handleClearInput = () => {
    form.setValue("url", "");
  };

  const handleDownload = async (type: 'video' | 'audio') => {
    try {
      if (!videoData || !videoData.requestId) {
        toast({
          title: t('errorTitle'),
          description: 'No video data available',
          variant: "destructive",
        });
        return;
      }

      // Get the actual download URL from the server
      const response = await fetch(`/api/download/${videoData.requestId}/${type}`);
      
      if (response.ok) {
        const blob = await response.blob();
        const downloadUrl = window.URL.createObjectURL(blob);
        
        // Create download link with actual file
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = `tiktok-${type}-${Date.now()}.${type === 'video' ? 'mp4' : 'mp3'}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Clean up the blob URL
        window.URL.revokeObjectURL(downloadUrl);
        
        toast({
          title: t('successTitle'),
          description: `${type === 'video' ? 'Video' : 'Audio'} download started`,
        });
      } else {
        throw new Error(`Download failed: ${response.status}`);
      }
    } catch (error) {
      toast({
        title: t('errorTitle'),
        description: `Failed to download ${type}. Please try again.`,
        variant: "destructive",
      });
    }
  };

  const handleDownloadOtherVideos = () => {
    setShowDownloadOptions(false);
    setShowDelayedOptions(false);
    setVideoData(null);
    setDownloadType('video');
    form.reset();
    // Return to main state without refreshing - same transition as initial download
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 font-inter">
      {/* Header */}
      <header className="bg-blue-600 py-6 px-4 sm:px-6 lg:px-8 shadow-md">
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center justify-between">
            <a href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity" data-testid="link-home-logo">
              <Video className="text-white text-2xl" />
              <span className="text-2xl font-bold text-white">{t('brand')}</span>
            </a>
            <div className="flex items-center space-x-6">
              <LanguageSelector 
                currentLanguage={currentLanguage} 
                onLanguageChange={setLanguage} 
              />
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              {t('title')}
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto">
              {t('subtitle')}
            </p>

            {/* Download Form */}
            <Card className="bg-white shadow-lg rounded-2xl p-8 mb-16 animate-slide-up border border-gray-200">
              <CardContent className="p-0">
                {!showDownloadOptions ? (
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="relative">
                        <FormField
                          control={form.control}
                          name="url"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder={t('urlPlaceholder')}
                                  className="w-full px-6 py-4 h-auto rounded-xl text-gray-800 placeholder-gray-500 bg-white border-2 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 pr-20"
                                  data-testid="input-tiktok-url"
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={form.watch("url") ? handleClearInput : handlePasteFromClipboard}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-600 hover:text-blue-800 hover:bg-transparent transition-colors duration-300 px-3 py-1 text-sm"
                          data-testid="button-paste-clipboard"
                        >
                          <Clipboard className="h-4 w-4 mr-1" />
                          {form.watch("url") ? t('clear') : t('paste')}
                        </Button>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3">
                        <Button
                          type="button"
                          disabled={downloadMutation.isPending}
                          onClick={() => handleDownloadWithType('video')}
                          className="bg-blue-600 hover:bg-blue-700 text-white py-4 px-8 rounded-xl font-semibold text-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105 border-0 flex-1"
                          data-testid="button-download-video"
                        >
                          {downloadMutation.isPending && downloadType === 'video' ? (
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          ) : (
                            <Download className="mr-2 h-5 w-5" />
                          )}
                          {downloadMutation.isPending && downloadType === 'video' ? t('processing') : t('downloadVideo')}
                        </Button>
                        <Button
                          type="button"
                          disabled={downloadMutation.isPending}
                          onClick={() => handleDownloadWithType('audio')}
                          className="bg-green-600 hover:bg-green-700 text-white py-4 px-8 rounded-xl font-semibold text-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105 border-0 flex-1"
                          data-testid="button-download-audio"
                        >
                          {downloadMutation.isPending && downloadType === 'audio' ? (
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          ) : (
                            <Download className="mr-2 h-5 w-5" />
                          )}
                          {downloadMutation.isPending && downloadType === 'audio' ? t('processing') : t('downloadAudio')}
                        </Button>
                      </div>
                    </form>
                  </Form>
                ) : (
                  <div className="text-center">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                      {/* Video Thumbnail */}
                      <div className="w-48 h-32 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg overflow-hidden shadow-md">
                        {videoData?.thumbnail ? (
                          <img 
                            src={videoData.thumbnail} 
                            alt="TikTok Video Thumbnail" 
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              // Fallback to play icon if thumbnail fails to load
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              const parent = target.parentElement;
                              if (parent) {
                                parent.innerHTML = '<div class="w-full h-full flex items-center justify-center"><svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><polygon points="9,18 15,12 9,6"></polygon></svg></div>';
                              }
                            }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Play className="w-12 h-12 text-white" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 text-center md:text-left">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">
                          {videoData?.title || t('videoReady')}
                        </h3>
                        {/* Show final download options directly */}
                        <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                          <Button 
                            onClick={() => handleDownload(downloadType)}
                            className={`${downloadType === 'video' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-green-600 hover:bg-green-700'} text-white px-6 py-3 rounded-lg font-semibold`}
                            data-testid={`button-download-${downloadType}-final`}
                          >
                            <Download className="mr-2 h-4 w-4" />
                            {downloadType === 'video' ? t('downloadVideo') : t('downloadAudio')}
                          </Button>
                          <Button 
                            onClick={() => handleDownloadOtherVideos()}
                            className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold"
                            data-testid="button-download-other-videos"
                          >
                            {downloadType === 'video' ? t('downloadOtherVideos') : t('downloadOtherAudios')}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Loading State */}
                {downloadMutation.isPending && (
                  <div className="mt-6 text-center animate-pulse-slow">
                    <div className="text-blue-600 mb-2">
                      <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2" />
                      <p className="text-gray-600">{t('processingVideo')}</p>
                    </div>
                  </div>
                )}

                {/* Progress Bar */}
                {downloadProgress > 0 && downloadProgress < 100 && (
                  <div className="mt-6">
                    <Progress value={downloadProgress} className="h-2 bg-gray-200" />
                    <p className="text-center text-gray-600 mt-2">
                      {t('downloadProgress')} {downloadProgress}%
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Features Grid */}
            <div id="features" className="grid md:grid-cols-3 gap-6 mb-16">
              <Card className="bg-white shadow-md rounded-xl p-6 text-center animate-slide-up border border-gray-200">
                <CardContent className="p-0">
                  <Zap className="text-blue-600 text-4xl mb-4 mx-auto" />
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">{t('lightningFast')}</h3>
                  <p className="text-gray-600">{t('lightningFastDesc')}</p>
                </CardContent>
              </Card>
              <Card className="bg-white shadow-md rounded-xl p-6 text-center animate-slide-up border border-gray-200">
                <CardContent className="p-0">
                  <Shield className="text-green-600 text-4xl mb-4 mx-auto" />
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">{t('noWatermarks')}</h3>
                  <p className="text-gray-600">{t('noWatermarksDesc')}</p>
                </CardContent>
              </Card>
              <Card className="bg-white shadow-md rounded-xl p-6 text-center animate-slide-up border border-gray-200">
                <CardContent className="p-0">
                  <Smartphone className="text-purple-600 text-4xl mb-4 mx-auto" />
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">{t('allDevices')}</h3>
                  <p className="text-gray-600">{t('allDevicesDesc')}</p>
                </CardContent>
              </Card>
            </div>

            {/* App Download */}
            <Card className="bg-white shadow-md rounded-xl p-8 mb-16 border border-gray-200">
              <CardContent className="p-0">
                <h3 className="text-2xl font-bold mb-4 text-gray-800">{t('mobileAppTitle')}</h3>
                <p className="text-gray-600 mb-6">{t('mobileAppDesc')}</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    variant="outline"
                    className="bg-black border-gray-700 hover:bg-gray-800 text-white px-6 py-3 rounded-lg transition-colors duration-300"
                    data-testid="button-google-play"
                  >
                    <Play className="mr-3 text-green-400" />
                    <div className="text-left">
                      <div className="text-xs text-gray-400">{t('getItOn')}</div>
                      <div className="text-sm font-semibold">{t('googlePlay')}</div>
                    </div>
                  </Button>
                  <Button 
                    variant="outline"
                    className="bg-black border-gray-700 hover:bg-gray-800 text-white px-6 py-3 rounded-lg transition-colors duration-300"
                    data-testid="button-app-store"
                  >
                    <div className="mr-3 text-white font-bold">🍎</div>
                    <div className="text-left">
                      <div className="text-xs text-gray-400">{t('downloadOn')}</div>
                      <div className="text-sm font-semibold">{t('appStore')}</div>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* SEO Content Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                {t('seoTitle')}
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                {t('seoSubtitle')}
              </p>
            </div>

            {/* Why Choose Us */}
            <div className="mb-16">
              <h3 className="text-3xl font-bold text-center mb-12 text-gray-800">
                {t('whyChooseUs')}
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <Card className="bg-white shadow-md rounded-xl p-6 border border-gray-200">
                  <CardContent className="p-0">
                    <Download className="text-blue-600 text-3xl mb-4" />
                    <h4 className="text-lg font-semibold mb-3 text-gray-800">{t('unlimitedDownloads')}</h4>
                    <p className="text-gray-600 text-sm">{t('unlimitedDownloadsDesc')}</p>
                  </CardContent>
                </Card>
                
                <Card className="card-gradient rounded-xl p-6 border-0">
                  <CardContent className="p-0">
                    <Video className="text-blue-600 text-3xl mb-4" />
                    <h4 className="text-lg font-semibold mb-3 text-gray-800">{t('allFormatsSupported')}</h4>
                    <p className="text-gray-600 text-sm">{t('allFormatsSupportedDesc')}</p>
                  </CardContent>
                </Card>
                
                <Card className="card-gradient rounded-xl p-6 border-0">
                  <CardContent className="p-0">
                    <Zap className="text-blue-600 text-3xl mb-4" />
                    <h4 className="text-lg font-semibold mb-3 text-gray-800">{t('fastProcessing')}</h4>
                    <p className="text-gray-600 text-sm">{t('fastProcessingDesc')}</p>
                  </CardContent>
                </Card>
                
                <Card className="card-gradient rounded-xl p-6 border-0">
                  <CardContent className="p-0">
                    <Shield className="text-blue-600 text-3xl mb-4" />
                    <h4 className="text-lg font-semibold mb-3 text-gray-800">{t('privacySecure')}</h4>
                    <p className="text-gray-600 text-sm">{t('privacySecureDesc')}</p>
                  </CardContent>
                </Card>
                
                <Card className="card-gradient rounded-xl p-6 border-0">
                  <CardContent className="p-0">
                    <Smartphone className="text-blue-600 text-3xl mb-4" />
                    <h4 className="text-lg font-semibold mb-3 text-gray-800">{t('crossPlatformCompatibility')}</h4>
                    <p className="text-gray-600 text-sm">{t('crossPlatformCompatibilityDesc')}</p>
                  </CardContent>
                </Card>
                
                <Card className="card-gradient rounded-xl p-6 border-0">
                  <CardContent className="p-0">
                    <Loader2 className="text-blue-600 text-3xl mb-4" />
                    <h4 className="text-lg font-semibold mb-3 text-gray-800">{t('noSoftwareRequired')}</h4>
                    <p className="text-gray-600 text-sm">{t('noSoftwareRequiredDesc')}</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* How It Works */}
            <div className="mb-16">
              <h3 className="text-3xl font-bold text-center mb-6 text-gray-800">
                {t('howItWorks')}
              </h3>
              <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
                {t('howItWorksDesc')}
              </p>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="bg-gradient-to-r from-accent-orange to-yellow-500 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-lg">1</span>
                  </div>
                  <h4 className="text-lg font-semibold mb-3 text-gray-800">{t('step1Title')}</h4>
                  <p className="text-gray-600">{t('step1Desc')}</p>
                </div>
                
                <div className="text-center">
                  <div className="bg-gradient-to-r from-accent-orange to-yellow-500 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-lg">2</span>
                  </div>
                  <h4 className="text-lg font-semibold mb-3 text-gray-800">{t('step2Title')}</h4>
                  <p className="text-gray-600">{t('step2Desc')}</p>
                </div>
                
                <div className="text-center">
                  <div className="bg-gradient-to-r from-accent-orange to-yellow-500 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-lg">3</span>
                  </div>
                  <h4 className="text-lg font-semibold mb-3 text-gray-800">{t('step3Title')}</h4>
                  <p className="text-gray-600">{t('step3Desc')}</p>
                </div>
              </div>
            </div>

            {/* Advanced Features */}
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-8 text-gray-800">
                {t('advancedFeatures')}
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="bg-white shadow-md rounded-xl p-6 border border-gray-200">
                  <CardContent className="p-0 text-center">
                    <h4 className="text-lg font-semibold mb-2 text-gray-800">{t('batchDownload')}</h4>
                    <p className="text-gray-600 text-sm">{t('batchDownloadDesc')}</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-white shadow-md rounded-xl p-6 border border-gray-200">
                  <CardContent className="p-0 text-center">
                    <h4 className="text-lg font-semibold mb-2 text-gray-800">{t('audioExtraction')}</h4>
                    <p className="text-gray-600 text-sm">{t('audioExtractionDesc')}</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-white shadow-md rounded-xl p-6 border border-gray-200">
                  <CardContent className="p-0 text-center">
                    <h4 className="text-lg font-semibold mb-2 text-gray-800">{t('thumbnailDownload')}</h4>
                    <p className="text-gray-600 text-sm">{t('thumbnailDownloadDesc')}</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FAQ Section */}
      <section id="faq" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">{t('faqTitle')}</h2>
          
          <div className="space-y-4">
            <FAQItem
              question={t('faqQ1')}
              answer={t('faqA1')}
            />
            <FAQItem
              question={t('faqQ2')}
              answer={t('faqA2')}
            />
            <FAQItem
              question={t('faqQ3')}
              answer={t('faqA3')}
            />
            <FAQItem
              question={t('faqQ4')}
              answer={t('faqA4')}
            />
            <FAQItem
              question={t('faqQ5')}
              answer={t('faqA5')}
            />
            <FAQItem
              question={t('faqQ6')}
              answer={t('faqA6')}
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Video className="text-white text-xl" />
                <span className="text-xl font-bold text-white">{t('brand')}</span>
              </div>
              <p className="text-gray-300">{t('footerDesc')}</p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-white">{t('company')}</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="/about" className="hover:text-blue-400 transition-colors duration-300">{t('aboutUs')}</a></li>
                <li><a href="/contact" className="hover:text-blue-400 transition-colors duration-300">{t('contact')}</a></li>
                <li><a href="/privacy-policy" className="hover:text-blue-400 transition-colors duration-300">{t('privacyPolicy')}</a></li>
                <li><a href="/terms-of-service" className="hover:text-blue-400 transition-colors duration-300">{t('termsOfService')}</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-white">{t('tools')}</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="/" className="hover:text-blue-400 transition-colors duration-300">{t('tikTokVideoDownloader')}</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors duration-300">{t('instagramDownloader')}</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors duration-300">{t('youTubeDownloader')}</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors duration-300">{t('twitterVideoDownloader')}</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors duration-300">{t('snapchatDownloader')}</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-white">{t('legal')}</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="/faq" className="hover:text-blue-400 transition-colors duration-300">{t('faq')}</a></li>
                <li><a href="/terms-of-service" className="hover:text-blue-400 transition-colors duration-300">{t('termsOfService')}</a></li>
                <li><a href="/privacy-policy" className="hover:text-blue-400 transition-colors duration-300">{t('privacyPolicy')}</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-300">
            <p>&copy; 2025 {t('brand')}. {t('allRightsReserved')} | {t('notAffiliatedDisclaimer')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
