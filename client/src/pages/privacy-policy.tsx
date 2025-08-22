import { useTranslation, type Language } from '@/lib/translations';
import { Video } from 'lucide-react';
import { LanguageSelector } from '@/components/ui/language-selector';
import { useState, useEffect } from 'react';

export default function PrivacyPolicy() {
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
            <a href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity" data-testid="link-home-logo">
              <Video className="text-white text-2xl" />
              <span className="text-2xl font-bold text-white">{t('brand')}</span>
            </a>
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
          <h1 className="text-4xl font-bold text-gray-800 mb-6">{t('privacyPolicy')}</h1>
          <p className="text-xl text-gray-600">
            {t('privacyPolicyDesc')}
          </p>
        </div>

        <div className="max-w-none">
          <div className="bg-gray-50 border border-gray-200 p-6 rounded-lg mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('informationWeCollect')}</h2>
            <p className="text-gray-700 mb-4">{t('informationWeCollectDesc')}</p>
            <ul className="space-y-2 text-gray-700">
              <li>• {t('info1')}</li>
              <li>• {t('info2')}</li>
              <li>• {t('info3')}</li>
              <li>• {t('info4')}</li>
            </ul>
          </div>

          <div className="bg-gray-50 border border-gray-200 p-6 rounded-lg mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('howWeUseInfo')}</h2>
            <p className="text-gray-700 mb-4">{t('howWeUseInfoDesc')}</p>
            <ul className="space-y-2 text-gray-700">
              <li>• {t('use1')}</li>
              <li>• {t('use2')}</li>
              <li>• {t('use3')}</li>
              <li>• {t('use4')}</li>
            </ul>
          </div>

          <div className="bg-gray-50 border border-gray-200 p-6 rounded-lg mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('dataProtection')}</h2>
            <p className="text-gray-700 mb-4">{t('dataProtectionDesc')}</p>
            <ul className="space-y-2 text-gray-700">
              <li>• {t('protection1')}</li>
              <li>• {t('protection2')}</li>
              <li>• {t('protection3')}</li>
            </ul>
          </div>

          <div className="bg-gray-50 border border-gray-200 p-6 rounded-lg mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('cookies')}</h2>
            <p className="text-gray-700">{t('cookiesDesc')}</p>
          </div>

          <div className="bg-gray-50 border border-gray-200 p-6 rounded-lg mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('thirdParty')}</h2>
            <p className="text-gray-700">{t('thirdPartyDesc')}</p>
          </div>

          <div className="bg-gray-50 border border-gray-200 p-6 rounded-lg mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('yourRights')}</h2>
            <p className="text-gray-700 mb-4">{t('yourRightsDesc')}</p>
            <ul className="space-y-2 text-gray-700">
              <li>• {t('right1')}</li>
              <li>• {t('right2')}</li>
              <li>• {t('right3')}</li>
              <li>• {t('right4')}</li>
            </ul>
          </div>

          <div className="bg-gray-50 border border-gray-200 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('contactPrivacy')}</h2>
            <p className="text-gray-700">
              {t('contactPrivacyDesc')} <a href="/contact" className="text-blue-600 hover:underline">support@tikdownloader.com</a>
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-600">
            {t('lastUpdated')}: December 21, 2024
          </p>
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