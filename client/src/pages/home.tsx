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

const downloadSchema = z.object({
  url: z.string().url("Please enter a valid TikTok URL").refine(
    (url) => url.includes("tiktok.com"),
    "URL must be from TikTok"
  ),
  quality: z.enum(["hd", "sd", "audio"]).default("hd"),
});

type DownloadForm = z.infer<typeof downloadSchema>;

export default function Home() {
  const [downloadProgress, setDownloadProgress] = useState(0);
  const { toast } = useToast();

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
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        toast({
          title: "Success!",
          description: "Video downloaded successfully",
        });
      }
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to download video",
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
        title: "Error",
        description: "Failed to read from clipboard",
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
              <span className="text-2xl font-bold text-cream">TikDownloader</span>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <a href="#features" className="text-cream-dark hover:text-accent-orange transition-colors duration-300">
                Features
              </a>
              <a href="#faq" className="text-cream-dark hover:text-accent-orange transition-colors duration-300">
                FAQ
              </a>
              <a href="#contact" className="text-cream-dark hover:text-accent-orange transition-colors duration-300">
                Contact
              </a>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gradient">
              Download TikTok Videos
            </h1>
            <p className="text-xl md:text-2xl text-cream-dark mb-12 max-w-3xl mx-auto">
              Save your favorite TikTok videos in HD quality without watermarks. Fast, free, and reliable.
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
                                placeholder="Paste TikTok video URL here..."
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
                                <Label htmlFor="hd" className="text-cream-dark cursor-pointer">HD Quality</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="sd" id="sd" className="text-accent-orange border-cream-dark" data-testid="radio-quality-sd" />
                                <Label htmlFor="sd" className="text-cream-dark cursor-pointer">Standard Quality</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="audio" id="audio" className="text-accent-orange border-cream-dark" data-testid="radio-quality-audio" />
                                <Label htmlFor="audio" className="text-cream-dark cursor-pointer">Audio Only</Label>
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
                      {downloadMutation.isPending ? "Processing..." : "Download Video"}
                    </Button>
                  </form>
                </Form>

                {/* Loading State */}
                {downloadMutation.isPending && (
                  <div className="mt-6 text-center animate-pulse-slow">
                    <div className="text-accent-orange mb-2">
                      <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2" />
                      <p className="text-cream-dark">Processing your video...</p>
                    </div>
                  </div>
                )}

                {/* Progress Bar */}
                {downloadProgress > 0 && downloadProgress < 100 && (
                  <div className="mt-6">
                    <Progress value={downloadProgress} className="h-2 bg-coffee" />
                    <p className="text-center text-cream-dark mt-2">
                      Downloading... {downloadProgress}%
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
                  <h3 className="text-xl font-semibold mb-2 text-cream">Lightning Fast</h3>
                  <p className="text-cream-dark">Download videos in seconds with our optimized servers</p>
                </CardContent>
              </Card>
              <Card className="card-gradient rounded-xl p-6 text-center animate-slide-up border-0">
                <CardContent className="p-0">
                  <Shield className="text-accent-orange text-4xl mb-4 mx-auto" />
                  <h3 className="text-xl font-semibold mb-2 text-cream">No Watermarks</h3>
                  <p className="text-cream-dark">Get clean videos without any watermarks or logos</p>
                </CardContent>
              </Card>
              <Card className="card-gradient rounded-xl p-6 text-center animate-slide-up border-0">
                <CardContent className="p-0">
                  <Smartphone className="text-accent-orange text-4xl mb-4 mx-auto" />
                  <h3 className="text-xl font-semibold mb-2 text-cream">All Devices</h3>
                  <p className="text-cream-dark">Works perfectly on desktop, tablet, and mobile</p>
                </CardContent>
              </Card>
            </div>

            {/* App Download */}
            <Card className="card-gradient rounded-xl p-8 mb-20 border-0">
              <CardContent className="p-0">
                <h3 className="text-2xl font-bold mb-4 text-cream">Download Our Mobile App</h3>
                <p className="text-cream-dark mb-6">Get the mobile app for faster downloads and offline access</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    variant="outline"
                    className="bg-black border-gray-700 hover:bg-gray-800 text-white px-6 py-3 rounded-lg transition-colors duration-300"
                    data-testid="button-google-play"
                  >
                    <Play className="mr-3 text-green-400" />
                    <div className="text-left">
                      <div className="text-xs text-gray-400">Get it on</div>
                      <div className="text-sm font-semibold">Google Play</div>
                    </div>
                  </Button>
                  <Button 
                    variant="outline"
                    className="bg-black border-gray-700 hover:bg-gray-800 text-white px-6 py-3 rounded-lg transition-colors duration-300"
                    data-testid="button-app-store"
                  >
                    <div className="mr-3 text-white font-bold">🍎</div>
                    <div className="text-left">
                      <div className="text-xs text-gray-400">Download on the</div>
                      <div className="text-sm font-semibold">App Store</div>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent to-dark-secondary">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-cream">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            <FAQItem
              question="How to download TikTok videos without watermark?"
              answer="Simply paste the TikTok video URL into our input field, select your preferred quality, and click download. Our system automatically removes watermarks from the downloaded video."
            />
            <FAQItem
              question="Is it legal to download TikTok videos?"
              answer="You should only download videos for personal use and respect copyright laws. Always ensure you have permission from the content creator before downloading their videos."
            />
            <FAQItem
              question="What video qualities are supported?"
              answer="We support HD quality (1080p), Standard quality (720p), and audio-only downloads. The available quality depends on the original video uploaded to TikTok."
            />
            <FAQItem
              question="Do I need to install any software?"
              answer="No installation required! Our web-based downloader works directly in your browser. However, we also offer mobile apps for enhanced convenience."
            />
            <FAQItem
              question="Is there a limit to how many videos I can download?"
              answer="Our service is completely free with no download limits. You can download as many TikTok videos as you want, whenever you want."
            />
            <FAQItem
              question="Can I download TikTok videos on my iPhone/Android?"
              answer="Yes! Our website is fully responsive and works on all mobile devices. You can also download our dedicated mobile apps for an even better experience."
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
                <span className="text-xl font-bold text-cream">TikDownloader</span>
              </div>
              <p className="text-cream-dark">Fast, reliable, and free TikTok video downloader. Save your favorite videos in HD quality.</p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-cream">Company</h4>
              <ul className="space-y-2 text-cream-dark">
                <li><a href="#" className="hover:text-accent-orange transition-colors duration-300">About Us</a></li>
                <li><a href="#" className="hover:text-accent-orange transition-colors duration-300">Contact</a></li>
                <li><a href="#" className="hover:text-accent-orange transition-colors duration-300">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-accent-orange transition-colors duration-300">Terms of Service</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-cream">Tools</h4>
              <ul className="space-y-2 text-cream-dark">
                <li><a href="#" className="hover:text-accent-orange transition-colors duration-300">TikTok Video Downloader</a></li>
                <li><a href="#" className="hover:text-accent-orange transition-colors duration-300">Instagram Downloader</a></li>
                <li><a href="#" className="hover:text-accent-orange transition-colors duration-300">YouTube Downloader</a></li>
                <li><a href="#" className="hover:text-accent-orange transition-colors duration-300">Twitter Video Downloader</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-cream">Support</h4>
              <ul className="space-y-2 text-cream-dark">
                <li><a href="#faq" className="hover:text-accent-orange transition-colors duration-300">FAQ</a></li>
                <li><a href="#" className="hover:text-accent-orange transition-colors duration-300">Help Center</a></li>
                <li><a href="#" className="hover:text-accent-orange transition-colors duration-300">Report Bug</a></li>
                <li><a href="#" className="hover:text-accent-orange transition-colors duration-300">Feature Request</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-coffee mt-12 pt-8 text-center text-cream-dark">
            <p>&copy; 2024 TikDownloader. All rights reserved. | Not affiliated with TikTok or ByteDance Ltd.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
