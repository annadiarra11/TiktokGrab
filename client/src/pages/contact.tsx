import { useTranslation, type Language } from '@/lib/translations';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, MessageCircle, Phone, MapPin, Video } from 'lucide-react';
import { LanguageSelector } from '@/components/ui/language-selector';
import { useState, useEffect } from 'react';

export default function Contact() {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');
  const { t } = useTranslation(currentLanguage);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage') as Language;
    if (savedLanguage && ['en', 'es', 'fr', 'de', 'pt', 'zh', 'ja', 'ko', 'ar', 'it', 'ru', 'hi', 'tr', 'nl', 'sv', 'pl', 'th', 'vi', 'id', 'ms'].includes(savedLanguage)) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  const handleLanguageChange = (language: Language) => {
    setCurrentLanguage(language);
    localStorage.setItem('selectedLanguage', language);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 font-inter">
      {/* Header */}
      <header className="bg-blue-600 py-6 px-4 sm:px-6 lg:px-8 shadow-md">
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Video className="text-white text-2xl" />
              <span className="text-2xl font-bold text-white">{t('brand')}</span>
            </div>
            <div className="flex items-center space-x-6">
              <a href="/" className="text-white hover:text-blue-200 transition-colors">{t('home')}</a>
              <LanguageSelector 
                currentLanguage={currentLanguage} 
                onLanguageChange={handleLanguageChange} 
              />
            </div>
          </nav>
        </div>
      </header>

      <div className="bg-white">
        <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">{t('contactUs')}</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('contactDesc')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">{t('getInTouch')}</h2>
            <div className="space-y-6">
              <Card className="bg-white shadow-md border border-gray-200">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <Mail className="text-blue-600 text-2xl" />
                    <div>
                      <h3 className="font-semibold text-gray-800">{t('email')}</h3>
                      <p className="text-gray-600">support@tikdownloader.com</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-md border border-gray-200">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <MessageCircle className="text-blue-600 text-2xl" />
                    <div>
                      <h3 className="font-semibold text-gray-800">{t('liveChat')}</h3>
                      <p className="text-gray-600">{t('liveChatDesc')}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-md border border-gray-200">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <Phone className="text-blue-600 text-2xl" />
                    <div>
                      <h3 className="font-semibold text-gray-800">{t('phone')}</h3>
                      <p className="text-gray-600">+1 (555) 123-4567</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-md border border-gray-200">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <MapPin className="text-blue-600 text-2xl" />
                    <div>
                      <h3 className="font-semibold text-gray-800">{t('address')}</h3>
                      <p className="text-gray-600">123 Tech Street, Digital City, DC 12345</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div>
            <Card className="bg-white shadow-md border border-gray-200">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">{t('sendMessage')}</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-800 mb-2">
                      {t('name')}
                    </label>
                    <Input 
                      type="text" 
                      required 
                      className="bg-white border-gray-300 text-gray-800"
                      placeholder={t('enterName')}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-800 mb-2">
                      {t('email')}
                    </label>
                    <Input 
                      type="email" 
                      required 
                      className="bg-white border-gray-300 text-gray-800"
                      placeholder={t('enterEmail')}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-800 mb-2">
                      {t('subject')}
                    </label>
                    <Input 
                      type="text" 
                      required 
                      className="bg-white border-gray-300 text-gray-800"
                      placeholder={t('enterSubject')}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-800 mb-2">
                      {t('message')}
                    </label>
                    <Textarea 
                      required 
                      className="bg-white border-gray-300 text-gray-800 min-h-[120px]"
                      placeholder={t('enterMessage')}
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-500 hover:to-green-500 text-white font-semibold"
                  >
                    {t('sendMessage')}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      </div>
      
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