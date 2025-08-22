import { useTranslation, type Language } from '@/lib/translations';
import { Video } from 'lucide-react';
import { LanguageSelector } from '@/components/ui/language-selector';
import { useState, useEffect } from 'react';

export default function About() {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');
  const { t } = useTranslation(currentLanguage);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage') as Language;
    if (savedLanguage && ['en', 'es', 'fr', 'de', 'pt', 'zh', 'ja', 'ko', 'ar'].includes(savedLanguage)) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  const handleLanguageChange = (language: Language) => {
    setCurrentLanguage(language);
    localStorage.setItem('selectedLanguage', language);
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
              <a href="/" className="text-white hover:text-blue-200 transition-colors">Home</a>
              <LanguageSelector 
                currentLanguage={currentLanguage} 
                onLanguageChange={handleLanguageChange} 
              />
            </div>
          </nav>
        </div>
      </header>

      <div className="bg-white">
        <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">{t('aboutUs')}</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('aboutDesc')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">{t('ourMission')}</h2>
            <p className="text-gray-600 mb-6">
              {t('missionDesc')}
            </p>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">{t('ourValues')}</h3>
            <ul className="space-y-3 text-gray-600">
              <li>• {t('value1')}</li>
              <li>• {t('value2')}</li>
              <li>• {t('value3')}</li>
              <li>• {t('value4')}</li>
            </ul>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">{t('whyChooseUs')}</h2>
            <div className="space-y-4">
              <div className="bg-white shadow-md border border-gray-200 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">{t('reliableService')}</h4>
                <p className="text-gray-600 text-sm">{t('reliableServiceDesc')}</p>
              </div>
              <div className="bg-white shadow-md border border-gray-200 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">{t('fastProcessing')}</h4>
                <p className="text-gray-600 text-sm">{t('fastProcessingDesc')}</p>
              </div>
              <div className="bg-white shadow-md border border-gray-200 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">{t('privacySecure')}</h4>
                <p className="text-gray-600 text-sm">{t('privacySecureDesc')}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">{t('getStarted')}</h2>
          <p className="text-gray-600 mb-8">{t('getStartedDesc')}</p>
          <a 
            href="/" 
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg hover:from-blue-500 hover:to-green-500 transition-all duration-300 font-semibold"
          >
            {t('startDownloading')}
          </a>
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
                <li><a href="/" className="hover:text-blue-400 transition-colors duration-300">TikTok Video Downloader</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors duration-300">Instagram Downloader</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors duration-300">YouTube Downloader</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors duration-300">Twitter Video Downloader</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors duration-300">Snapchat Downloader</a></li>
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
            <p>&copy; 2025 {t('brand')}. All rights reserved. | Not affiliated with TikTok or ByteDance Ltd.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}