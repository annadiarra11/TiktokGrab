import { useTranslation, type Language } from '@/lib/translations';
import { Video } from 'lucide-react';
import { LanguageSelector } from '@/components/ui/language-selector';
import { useState, useEffect } from 'react';

export default function TermsOfService() {
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
        <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">{t('termsOfService')}</h1>
          <p className="text-xl text-gray-600">
            {t('termsOfServiceDesc')}
          </p>
        </div>

        <div className="max-w-none">
          <div className="bg-gray-50 border border-gray-200 p-6 rounded-lg mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('acceptanceOfTerms')}</h2>
            <p className="text-gray-700">{t('acceptanceOfTermsDesc')}</p>
          </div>

          <div className="bg-gray-50 border border-gray-200 p-6 rounded-lg mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('serviceDescription')}</h2>
            <p className="text-gray-700 mb-4">{t('serviceDescriptionDesc')}</p>
            <ul className="space-y-2 text-gray-700">
              <li>• {t('service1')}</li>
              <li>• {t('service2')}</li>
              <li>• {t('service3')}</li>
              <li>• {t('service4')}</li>
            </ul>
          </div>

          <div className="bg-gray-50 border border-gray-200 p-6 rounded-lg mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('userResponsibilities')}</h2>
            <p className="text-gray-700 mb-4">{t('userResponsibilitiesDesc')}</p>
            <ul className="space-y-2 text-gray-700">
              <li>• {t('responsibility1')}</li>
              <li>• {t('responsibility2')}</li>
              <li>• {t('responsibility3')}</li>
              <li>• {t('responsibility4')}</li>
            </ul>
          </div>

          <div className="bg-gray-50 border border-gray-200 p-6 rounded-lg mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('prohibitedUses')}</h2>
            <p className="text-gray-700 mb-4">{t('prohibitedUsesDesc')}</p>
            <ul className="space-y-2 text-gray-700">
              <li>• {t('prohibited1')}</li>
              <li>• {t('prohibited2')}</li>
              <li>• {t('prohibited3')}</li>
              <li>• {t('prohibited4')}</li>
            </ul>
          </div>

          <div className="bg-gray-50 border border-gray-200 p-6 rounded-lg mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('intellectualProperty')}</h2>
            <p className="text-gray-700">{t('intellectualPropertyDesc')}</p>
          </div>

          <div className="bg-gray-50 border border-gray-200 p-6 rounded-lg mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('disclaimer')}</h2>
            <p className="text-gray-700">{t('disclaimerDesc')}</p>
          </div>

          <div className="bg-gray-50 border border-gray-200 p-6 rounded-lg mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('limitationOfLiability')}</h2>
            <p className="text-gray-700">{t('limitationOfLiabilityDesc')}</p>
          </div>

          <div className="bg-gray-50 border border-gray-200 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('modifications')}</h2>
            <p className="text-gray-700">{t('modificationsDesc')}</p>
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