import { useTranslation, type Language } from '@/lib/translations';
import { Card, CardContent } from '@/components/ui/card';
import { useState } from 'react';
import { ChevronDown, ChevronUp, Video } from 'lucide-react';
import { LanguageSelector } from '@/components/ui/language-selector';
import { useLanguage } from '@/contexts/LanguageContext';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen?: boolean;
  onToggle?: () => void;
}

function FAQItem({ question, answer, isOpen = false, onToggle }: FAQItemProps) {
  return (
    <Card className="bg-white shadow-md rounded-xl overflow-hidden border border-gray-200">
      <CardContent className="p-0">
        <button 
          className="w-full text-left p-6 focus:outline-none bg-black hover:bg-gray-800 transition-colors duration-300 text-white"
          onClick={onToggle}
        >
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-white pr-4">{question}</h3>
            {isOpen ? (
              <ChevronUp className="text-gray-300 text-xl flex-shrink-0" />
            ) : (
              <ChevronDown className="text-gray-300 text-xl flex-shrink-0" />
            )}
          </div>
        </button>
        {isOpen && (
          <div className="px-6 pb-6 bg-white">
            <p className="text-gray-700 leading-relaxed">{answer}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default function FAQ() {
  const { currentLanguage, setLanguage } = useLanguage();
  const { t } = useTranslation(currentLanguage);
  const [openItems, setOpenItems] = useState<number[]>([0]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const faqItems = [
    { question: t('faqQ1'), answer: t('faqA1') },
    { question: t('faqQ2'), answer: t('faqA2') },
    { question: t('faqQ3'), answer: t('faqA3') },
    { question: t('faqQ4'), answer: t('faqA4') },
    { question: t('faqQ5'), answer: t('faqA5') },
    { question: t('faqQ6'), answer: t('faqA6') },
    { question: t('faqQ7'), answer: t('faqA7') },
    { question: t('faqQ8'), answer: t('faqA8') },
    { question: t('faqQ9'), answer: t('faqA9') },
    { question: t('faqQ10'), answer: t('faqA10') }
  ];

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
                onLanguageChange={setLanguage} 
              />
            </div>
          </nav>
        </div>
      </header>

      <div className="bg-white">
        <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">{t('faqTitle')}</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('faqPageDesc')}
          </p>
        </div>

        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <FAQItem
              key={index}
              question={item.question}
              answer={item.answer}
              isOpen={openItems.includes(index)}
              onToggle={() => toggleItem(index)}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="bg-white shadow-md border border-gray-200 p-8 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('stillHaveQuestions')}</h2>
            <p className="text-gray-600 mb-6">{t('stillHaveQuestionsDesc')}</p>
            <a 
              href="/contact" 
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg hover:from-blue-500 hover:to-green-500 transition-all duration-300 font-semibold"
            >
              {t('contactUs')}
            </a>
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