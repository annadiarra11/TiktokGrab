import { useState, useEffect } from "react";
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
import { useTranslation, type Language } from "@/lib/translations";

const createDownloadSchema = (t: any) => z.object({
  url: z.string().url(t('invalidUrl')).refine(
    (url) => url.includes("tiktok.com"),
    t('urlMustBeTiktok')
  ),
  quality: z.enum(["hd", "sd", "audio"]).default("hd"),
});

type DownloadForm = {
  url: string;
  quality: "hd" | "sd" | "audio";
};

export default function Home() {
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');
  const { toast } = useToast();
  const { t } = useTranslation(currentLanguage);

  // Load language from localStorage on component mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage') as Language;
    if (savedLanguage && ['en', 'es', 'fr', 'de', 'pt', 'zh', 'ja', 'ko', 'ar'].includes(savedLanguage)) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  // Save language to localStorage when it changes
  const handleLanguageChange = (language: Language) => {
    setCurrentLanguage(language);
    localStorage.setItem('selectedLanguage', language);
  };

  const downloadSchema = createDownloadSchema(t);

  const form = useForm<DownloadForm>({
    resolver: zodResolver(downloadSchema),
    defaultValues: {
      url: "",
      quality: "hd",
    },
  });

  const downloadMutation = useMutation({
    mutationFn: async (data: DownloadForm) => {
      const response = await apiRequest("POST", "/api/download", data);
      return response.json();
    },
    onSuccess: (data) => {
      if (data.downloadUrl) {
        // Create download link
        const link = document.createElement('a');
        link.href = data.downloadUrl;
        link.download = data.filename || 'tiktok-video';
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        toast({
          title: t('successTitle'),
          description: t('successDesc'),
        });
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

  return (
    <div className="min-h-screen gradient-bg font-inter">
      {/* Header */}
      <header className="py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Video className="text-accent-orange text-2xl" />
              <span className="text-2xl font-bold text-cream">{t('brand')}</span>
            </div>
            <div className="flex items-center space-x-6">
              <div className="hidden md:flex items-center space-x-6">
                <a href="#features" className="text-cream-dark hover:text-accent-orange transition-colors duration-300">
                  {t('features')}
                </a>
                <a href="#faq" className="text-cream-dark hover:text-accent-orange transition-colors duration-300">
                  {t('faq')}
                </a>
                <a href="#contact" className="text-cream-dark hover:text-accent-orange transition-colors duration-300">
                  {t('contact')}
                </a>
              </div>
              <LanguageSelector 
                currentLanguage={currentLanguage} 
                onLanguageChange={handleLanguageChange} 
              />
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gradient">
              {t('title')}
            </h1>
            <p className="text-xl md:text-2xl text-cream-dark mb-12 max-w-3xl mx-auto">
              {t('subtitle')}
            </p>

            {/* Download Form */}
            <Card className="card-gradient rounded-2xl p-8 mb-12 animate-slide-up border-0">
              <CardContent className="p-0">
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
                                className="input-gradient w-full px-6 py-4 h-auto rounded-xl text-cream placeholder-cream-dark bg-transparent border-0 focus:ring-2 focus:ring-accent-orange transition-all duration-300"
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
                        onClick={handlePasteFromClipboard}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-cream-dark hover:text-accent-orange hover:bg-transparent transition-colors duration-300 p-2"
                        data-testid="button-paste-clipboard"
                      >
                        <Clipboard className="h-5 w-5" />
                      </Button>
                    </div>
                    
                    {/* Quality Selection */}
                    <FormField
                      control={form.control}
                      name="quality"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-wrap gap-6 justify-center"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="hd" id="hd" className="text-accent-orange border-cream-dark" data-testid="radio-quality-hd" />
                                <Label htmlFor="hd" className="text-cream-dark cursor-pointer">{t('hdQuality')}</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="sd" id="sd" className="text-accent-orange border-cream-dark" data-testid="radio-quality-sd" />
                                <Label htmlFor="sd" className="text-cream-dark cursor-pointer">{t('standardQuality')}</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="audio" id="audio" className="text-accent-orange border-cream-dark" data-testid="radio-quality-audio" />
                                <Label htmlFor="audio" className="text-cream-dark cursor-pointer">{t('audioOnly')}</Label>
                              </div>
                            </RadioGroup>
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      disabled={downloadMutation.isPending}
                      className="btn-gradient w-full py-4 px-8 rounded-xl text-white font-semibold text-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105 border-0"
                      data-testid="button-download-video"
                    >
                      {downloadMutation.isPending ? (
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      ) : (
                        <Download className="mr-2 h-5 w-5" />
                      )}
                      {downloadMutation.isPending ? t('processing') : t('downloadButton')}
                    </Button>
                  </form>
                </Form>

                {/* Loading State */}
                {downloadMutation.isPending && (
                  <div className="mt-6 text-center animate-pulse-slow">
                    <div className="text-accent-orange mb-2">
                      <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2" />
                      <p className="text-cream-dark">{t('processingVideo')}</p>
                    </div>
                  </div>
                )}

                {/* Progress Bar */}
                {downloadProgress > 0 && downloadProgress < 100 && (
                  <div className="mt-6">
                    <Progress value={downloadProgress} className="h-2 bg-coffee" />
                    <p className="text-center text-cream-dark mt-2">
                      {t('downloadProgress')} {downloadProgress}%
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Features Grid */}
            <div id="features" className="grid md:grid-cols-3 gap-6 mb-20">
              <Card className="card-gradient rounded-xl p-6 text-center animate-slide-up border-0">
                <CardContent className="p-0">
                  <Zap className="text-accent-orange text-4xl mb-4 mx-auto" />
                  <h3 className="text-xl font-semibold mb-2 text-cream">{t('lightningFast')}</h3>
                  <p className="text-cream-dark">{t('lightningFastDesc')}</p>
                </CardContent>
              </Card>
              <Card className="card-gradient rounded-xl p-6 text-center animate-slide-up border-0">
                <CardContent className="p-0">
                  <Shield className="text-accent-orange text-4xl mb-4 mx-auto" />
                  <h3 className="text-xl font-semibold mb-2 text-cream">{t('noWatermarks')}</h3>
                  <p className="text-cream-dark">{t('noWatermarksDesc')}</p>
                </CardContent>
              </Card>
              <Card className="card-gradient rounded-xl p-6 text-center animate-slide-up border-0">
                <CardContent className="p-0">
                  <Smartphone className="text-accent-orange text-4xl mb-4 mx-auto" />
                  <h3 className="text-xl font-semibold mb-2 text-cream">{t('allDevices')}</h3>
                  <p className="text-cream-dark">{t('allDevicesDesc')}</p>
                </CardContent>
              </Card>
            </div>

            {/* App Download */}
            <Card className="card-gradient rounded-xl p-8 mb-20 border-0">
              <CardContent className="p-0">
                <h3 className="text-2xl font-bold mb-4 text-cream">{t('mobileAppTitle')}</h3>
                <p className="text-cream-dark mb-6">{t('mobileAppDesc')}</p>
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
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
                {t('seoTitle')}
              </h2>
              <p className="text-xl text-cream-dark max-w-4xl mx-auto">
                {t('seoSubtitle')}
              </p>
            </div>

            {/* Why Choose Us */}
            <div className="mb-16">
              <h3 className="text-3xl font-bold text-center mb-12 text-cream">
                {t('whyChooseUs')}
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <Card className="card-gradient rounded-xl p-6 border-0">
                  <CardContent className="p-0">
                    <Download className="text-accent-orange text-3xl mb-4" />
                    <h4 className="text-lg font-semibold mb-3 text-cream">{t('unlimitedDownloads')}</h4>
                    <p className="text-cream-dark text-sm">{t('unlimitedDownloadsDesc')}</p>
                  </CardContent>
                </Card>
                
                <Card className="card-gradient rounded-xl p-6 border-0">
                  <CardContent className="p-0">
                    <Video className="text-accent-orange text-3xl mb-4" />
                    <h4 className="text-lg font-semibold mb-3 text-cream">{t('allFormatsSupported')}</h4>
                    <p className="text-cream-dark text-sm">{t('allFormatsSupportedDesc')}</p>
                  </CardContent>
                </Card>
                
                <Card className="card-gradient rounded-xl p-6 border-0">
                  <CardContent className="p-0">
                    <Zap className="text-accent-orange text-3xl mb-4" />
                    <h4 className="text-lg font-semibold mb-3 text-cream">{t('fastProcessing')}</h4>
                    <p className="text-cream-dark text-sm">{t('fastProcessingDesc')}</p>
                  </CardContent>
                </Card>
                
                <Card className="card-gradient rounded-xl p-6 border-0">
                  <CardContent className="p-0">
                    <Shield className="text-accent-orange text-3xl mb-4" />
                    <h4 className="text-lg font-semibold mb-3 text-cream">{t('privacySecure')}</h4>
                    <p className="text-cream-dark text-sm">{t('privacySecureDesc')}</p>
                  </CardContent>
                </Card>
                
                <Card className="card-gradient rounded-xl p-6 border-0">
                  <CardContent className="p-0">
                    <Smartphone className="text-accent-orange text-3xl mb-4" />
                    <h4 className="text-lg font-semibold mb-3 text-cream">{t('crossPlatformCompatibility')}</h4>
                    <p className="text-cream-dark text-sm">{t('crossPlatformCompatibilityDesc')}</p>
                  </CardContent>
                </Card>
                
                <Card className="card-gradient rounded-xl p-6 border-0">
                  <CardContent className="p-0">
                    <Loader2 className="text-accent-orange text-3xl mb-4" />
                    <h4 className="text-lg font-semibold mb-3 text-cream">{t('noSoftwareRequired')}</h4>
                    <p className="text-cream-dark text-sm">{t('noSoftwareRequiredDesc')}</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* How It Works */}
            <div className="mb-16">
              <h3 className="text-3xl font-bold text-center mb-6 text-cream">
                {t('howItWorks')}
              </h3>
              <p className="text-center text-cream-dark mb-12 max-w-3xl mx-auto">
                {t('howItWorksDesc')}
              </p>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="bg-gradient-to-r from-accent-orange to-yellow-500 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-lg">1</span>
                  </div>
                  <h4 className="text-lg font-semibold mb-3 text-cream">{t('step1Title')}</h4>
                  <p className="text-cream-dark">{t('step1Desc')}</p>
                </div>
                
                <div className="text-center">
                  <div className="bg-gradient-to-r from-accent-orange to-yellow-500 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-lg">2</span>
                  </div>
                  <h4 className="text-lg font-semibold mb-3 text-cream">{t('step2Title')}</h4>
                  <p className="text-cream-dark">{t('step2Desc')}</p>
                </div>
                
                <div className="text-center">
                  <div className="bg-gradient-to-r from-accent-orange to-yellow-500 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-lg">3</span>
                  </div>
                  <h4 className="text-lg font-semibold mb-3 text-cream">{t('step3Title')}</h4>
                  <p className="text-cream-dark">{t('step3Desc')}</p>
                </div>
              </div>
            </div>

            {/* Advanced Features */}
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-8 text-cream">
                {t('advancedFeatures')}
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="card-gradient rounded-xl p-6 border-0">
                  <CardContent className="p-0 text-center">
                    <h4 className="text-lg font-semibold mb-2 text-cream">{t('batchDownload')}</h4>
                    <p className="text-cream-dark text-sm">{t('batchDownloadDesc')}</p>
                  </CardContent>
                </Card>
                
                <Card className="card-gradient rounded-xl p-6 border-0">
                  <CardContent className="p-0 text-center">
                    <h4 className="text-lg font-semibold mb-2 text-cream">{t('audioExtraction')}</h4>
                    <p className="text-cream-dark text-sm">{t('audioExtractionDesc')}</p>
                  </CardContent>
                </Card>
                
                <Card className="card-gradient rounded-xl p-6 border-0">
                  <CardContent className="p-0 text-center">
                    <h4 className="text-lg font-semibold mb-2 text-cream">{t('thumbnailDownload')}</h4>
                    <p className="text-cream-dark text-sm">{t('thumbnailDownloadDesc')}</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent to-dark-secondary">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-cream">{t('faqTitle')}</h2>
          
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
      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-dark-primary">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Video className="text-accent-orange text-xl" />
                <span className="text-xl font-bold text-cream">{t('brand')}</span>
              </div>
              <p className="text-cream-dark">{t('footerDesc')}</p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-cream">{t('company')}</h4>
              <ul className="space-y-2 text-cream-dark">
                <li><a href="#" className="hover:text-accent-orange transition-colors duration-300">About Us</a></li>
                <li><a href="#contact" className="hover:text-accent-orange transition-colors duration-300">{t('contact')}</a></li>
                <li><a href="#" className="hover:text-accent-orange transition-colors duration-300">{t('privacyPolicy')}</a></li>
                <li><a href="#" className="hover:text-accent-orange transition-colors duration-300">{t('termsOfService')}</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-cream">{t('tools')}</h4>
              <ul className="space-y-2 text-cream-dark">
                <li><a href="#" className="hover:text-accent-orange transition-colors duration-300">TikTok Video Downloader</a></li>
                <li><a href="#" className="hover:text-accent-orange transition-colors duration-300">Instagram Downloader</a></li>
                <li><a href="#" className="hover:text-accent-orange transition-colors duration-300">YouTube Downloader</a></li>
                <li><a href="#" className="hover:text-accent-orange transition-colors duration-300">Twitter Video Downloader</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-cream">{t('legal')}</h4>
              <ul className="space-y-2 text-cream-dark">
                <li><a href="#faq" className="hover:text-accent-orange transition-colors duration-300">{t('faq')}</a></li>
                <li><a href="#" className="hover:text-accent-orange transition-colors duration-300">{t('termsOfService')}</a></li>
                <li><a href="#" className="hover:text-accent-orange transition-colors duration-300">{t('privacyPolicy')}</a></li>
                <li><a href="#" className="hover:text-accent-orange transition-colors duration-300">{t('dmca')}</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-coffee mt-12 pt-8 text-center text-cream-dark">
            <p>&copy; 2024 {t('brand')}. All rights reserved. | Not affiliated with TikTok or ByteDance Ltd.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
