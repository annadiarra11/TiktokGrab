import { useTranslation } from '@/lib/translations';
import { Card, CardContent } from '@/components/ui/card';
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen?: boolean;
  onToggle?: () => void;
}

function FAQItem({ question, answer, isOpen = false, onToggle }: FAQItemProps) {
  return (
    <Card className="card-gradient border-0">
      <CardContent className="p-0">
        <button 
          className="w-full text-left p-6 focus:outline-none"
          onClick={onToggle}
        >
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-cream pr-4">{question}</h3>
            {isOpen ? (
              <ChevronUp className="text-accent-orange text-xl flex-shrink-0" />
            ) : (
              <ChevronDown className="text-accent-orange text-xl flex-shrink-0" />
            )}
          </div>
        </button>
        {isOpen && (
          <div className="px-6 pb-6">
            <p className="text-cream-dark leading-relaxed">{answer}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default function FAQ() {
  const { t } = useTranslation();
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
    <div className="min-h-screen bg-dark-primary">
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-cream mb-6">{t('faqTitle')}</h1>
          <p className="text-xl text-cream-dark max-w-3xl mx-auto">
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
          <div className="bg-gradient-to-r from-coffee/20 to-dark-secondary/50 p-8 rounded-lg">
            <h2 className="text-2xl font-bold text-cream mb-4">{t('stillHaveQuestions')}</h2>
            <p className="text-cream-dark mb-6">{t('stillHaveQuestionsDesc')}</p>
            <a 
              href="/contact" 
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-accent-orange to-yellow-500 text-white rounded-lg hover:from-accent-orange/90 hover:to-yellow-500/90 transition-all duration-300 font-semibold"
            >
              {t('contactUs')}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}