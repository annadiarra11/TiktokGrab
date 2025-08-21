import { useTranslation } from '@/lib/translations';

export default function About() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-dark-primary">
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-cream mb-6">{t('aboutUs')}</h1>
          <p className="text-xl text-cream-dark max-w-3xl mx-auto">
            {t('aboutDesc')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-cream mb-6">{t('ourMission')}</h2>
            <p className="text-cream-dark mb-6">
              {t('missionDesc')}
            </p>
            <h3 className="text-xl font-semibold text-cream mb-4">{t('ourValues')}</h3>
            <ul className="space-y-3 text-cream-dark">
              <li>• {t('value1')}</li>
              <li>• {t('value2')}</li>
              <li>• {t('value3')}</li>
              <li>• {t('value4')}</li>
            </ul>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold text-cream mb-6">{t('whyChooseUs')}</h2>
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-coffee/20 to-dark-secondary/50 p-4 rounded-lg">
                <h4 className="font-semibold text-cream mb-2">{t('reliableService')}</h4>
                <p className="text-cream-dark text-sm">{t('reliableServiceDesc')}</p>
              </div>
              <div className="bg-gradient-to-r from-coffee/20 to-dark-secondary/50 p-4 rounded-lg">
                <h4 className="font-semibold text-cream mb-2">{t('fastProcessing')}</h4>
                <p className="text-cream-dark text-sm">{t('fastProcessingDesc')}</p>
              </div>
              <div className="bg-gradient-to-r from-coffee/20 to-dark-secondary/50 p-4 rounded-lg">
                <h4 className="font-semibold text-cream mb-2">{t('privacySecure')}</h4>
                <p className="text-cream-dark text-sm">{t('privacySecureDesc')}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold text-cream mb-6">{t('getStarted')}</h2>
          <p className="text-cream-dark mb-8">{t('getStartedDesc')}</p>
          <a 
            href="/" 
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-accent-orange to-yellow-500 text-white rounded-lg hover:from-accent-orange/90 hover:to-yellow-500/90 transition-all duration-300 font-semibold"
          >
            {t('startDownloading')}
          </a>
        </div>
      </div>
    </div>
  );
}