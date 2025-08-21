import { useTranslation } from '@/lib/translations';

export default function TermsOfService() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-dark-primary">
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-cream mb-6">{t('termsOfService')}</h1>
          <p className="text-xl text-cream-dark">
            {t('termsOfServiceDesc')}
          </p>
        </div>

        <div className="prose prose-invert max-w-none">
          <div className="bg-gradient-to-r from-coffee/20 to-dark-secondary/50 p-6 rounded-lg mb-8">
            <h2 className="text-2xl font-bold text-cream mb-4">{t('acceptanceOfTerms')}</h2>
            <p className="text-cream-dark">{t('acceptanceOfTermsDesc')}</p>
          </div>

          <div className="bg-gradient-to-r from-coffee/20 to-dark-secondary/50 p-6 rounded-lg mb-8">
            <h2 className="text-2xl font-bold text-cream mb-4">{t('serviceDescription')}</h2>
            <p className="text-cream-dark mb-4">{t('serviceDescriptionDesc')}</p>
            <ul className="space-y-2 text-cream-dark">
              <li>• {t('service1')}</li>
              <li>• {t('service2')}</li>
              <li>• {t('service3')}</li>
              <li>• {t('service4')}</li>
            </ul>
          </div>

          <div className="bg-gradient-to-r from-coffee/20 to-dark-secondary/50 p-6 rounded-lg mb-8">
            <h2 className="text-2xl font-bold text-cream mb-4">{t('userResponsibilities')}</h2>
            <p className="text-cream-dark mb-4">{t('userResponsibilitiesDesc')}</p>
            <ul className="space-y-2 text-cream-dark">
              <li>• {t('responsibility1')}</li>
              <li>• {t('responsibility2')}</li>
              <li>• {t('responsibility3')}</li>
              <li>• {t('responsibility4')}</li>
            </ul>
          </div>

          <div className="bg-gradient-to-r from-coffee/20 to-dark-secondary/50 p-6 rounded-lg mb-8">
            <h2 className="text-2xl font-bold text-cream mb-4">{t('prohibitedUses')}</h2>
            <p className="text-cream-dark mb-4">{t('prohibitedUsesDesc')}</p>
            <ul className="space-y-2 text-cream-dark">
              <li>• {t('prohibited1')}</li>
              <li>• {t('prohibited2')}</li>
              <li>• {t('prohibited3')}</li>
              <li>• {t('prohibited4')}</li>
            </ul>
          </div>

          <div className="bg-gradient-to-r from-coffee/20 to-dark-secondary/50 p-6 rounded-lg mb-8">
            <h2 className="text-2xl font-bold text-cream mb-4">{t('intellectualProperty')}</h2>
            <p className="text-cream-dark">{t('intellectualPropertyDesc')}</p>
          </div>

          <div className="bg-gradient-to-r from-coffee/20 to-dark-secondary/50 p-6 rounded-lg mb-8">
            <h2 className="text-2xl font-bold text-cream mb-4">{t('disclaimer')}</h2>
            <p className="text-cream-dark">{t('disclaimerDesc')}</p>
          </div>

          <div className="bg-gradient-to-r from-coffee/20 to-dark-secondary/50 p-6 rounded-lg mb-8">
            <h2 className="text-2xl font-bold text-cream mb-4">{t('limitationOfLiability')}</h2>
            <p className="text-cream-dark">{t('limitationOfLiabilityDesc')}</p>
          </div>

          <div className="bg-gradient-to-r from-coffee/20 to-dark-secondary/50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-cream mb-4">{t('modifications')}</h2>
            <p className="text-cream-dark">{t('modificationsDesc')}</p>
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