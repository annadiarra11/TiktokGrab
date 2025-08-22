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
          <h1 className="text-4xl font-bold text-gray-800 mb-6">{t('privacyPolicy')}</h1>
          <p className="text-xl text-gray-600">
            {t('privacyPolicyDesc')}
          </p>
        </div>

        <div className="prose prose-invert max-w-none">
          <div className="bg-gradient-to-r from-coffee/20 to-dark-secondary/50 p-6 rounded-lg mb-8">
            <h2 className="text-2xl font-bold text-cream mb-4">{t('informationWeCollect')}</h2>
            <p className="text-cream-dark mb-4">{t('informationWeCollectDesc')}</p>
            <ul className="space-y-2 text-cream-dark">
              <li>• {t('info1')}</li>
              <li>• {t('info2')}</li>
              <li>• {t('info3')}</li>
              <li>• {t('info4')}</li>
            </ul>
          </div>

          <div className="bg-gradient-to-r from-coffee/20 to-dark-secondary/50 p-6 rounded-lg mb-8">
            <h2 className="text-2xl font-bold text-cream mb-4">{t('howWeUseInfo')}</h2>
            <p className="text-cream-dark mb-4">{t('howWeUseInfoDesc')}</p>
            <ul className="space-y-2 text-cream-dark">
              <li>• {t('use1')}</li>
              <li>• {t('use2')}</li>
              <li>• {t('use3')}</li>
              <li>• {t('use4')}</li>
            </ul>
          </div>

          <div className="bg-gradient-to-r from-coffee/20 to-dark-secondary/50 p-6 rounded-lg mb-8">
            <h2 className="text-2xl font-bold text-cream mb-4">{t('dataProtection')}</h2>
            <p className="text-cream-dark mb-4">{t('dataProtectionDesc')}</p>
            <ul className="space-y-2 text-cream-dark">
              <li>• {t('protection1')}</li>
              <li>• {t('protection2')}</li>
              <li>• {t('protection3')}</li>
            </ul>
          </div>

          <div className="bg-gradient-to-r from-coffee/20 to-dark-secondary/50 p-6 rounded-lg mb-8">
            <h2 className="text-2xl font-bold text-cream mb-4">{t('cookies')}</h2>
            <p className="text-cream-dark">{t('cookiesDesc')}</p>
          </div>

          <div className="bg-gradient-to-r from-coffee/20 to-dark-secondary/50 p-6 rounded-lg mb-8">
            <h2 className="text-2xl font-bold text-cream mb-4">{t('thirdParty')}</h2>
            <p className="text-cream-dark">{t('thirdPartyDesc')}</p>
          </div>

          <div className="bg-gradient-to-r from-coffee/20 to-dark-secondary/50 p-6 rounded-lg mb-8">
            <h2 className="text-2xl font-bold text-cream mb-4">{t('yourRights')}</h2>
            <p className="text-cream-dark mb-4">{t('yourRightsDesc')}</p>
            <ul className="space-y-2 text-cream-dark">
              <li>• {t('right1')}</li>
              <li>• {t('right2')}</li>
              <li>• {t('right3')}</li>
              <li>• {t('right4')}</li>
            </ul>
          </div>

          <div className="bg-gradient-to-r from-coffee/20 to-dark-secondary/50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-cream mb-4">{t('contactPrivacy')}</h2>
            <p className="text-cream-dark">
              {t('contactPrivacyDesc')} <a href="/contact" className="text-accent-orange hover:underline">support@tikdownloader.com</a>
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-cream-dark">
            {t('lastUpdated')}: December 21, 2024
          </p>
        </div>
      </div>
    </div>
  );
}