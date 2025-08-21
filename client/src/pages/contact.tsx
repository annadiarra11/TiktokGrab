import { useTranslation } from '@/lib/translations';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, MessageCircle, Phone, MapPin } from 'lucide-react';

export default function Contact() {
  const { t } = useTranslation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className="min-h-screen bg-dark-primary">
      <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-cream mb-6">{t('contactUs')}</h1>
          <p className="text-xl text-cream-dark max-w-3xl mx-auto">
            {t('contactDesc')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-cream mb-6">{t('getInTouch')}</h2>
            <div className="space-y-6">
              <Card className="card-gradient border-0">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <Mail className="text-accent-orange text-2xl" />
                    <div>
                      <h3 className="font-semibold text-cream">{t('email')}</h3>
                      <p className="text-cream-dark">support@tikdownloader.com</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-gradient border-0">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <MessageCircle className="text-accent-orange text-2xl" />
                    <div>
                      <h3 className="font-semibold text-cream">{t('liveChat')}</h3>
                      <p className="text-cream-dark">{t('liveChatDesc')}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-gradient border-0">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <Phone className="text-accent-orange text-2xl" />
                    <div>
                      <h3 className="font-semibold text-cream">{t('phone')}</h3>
                      <p className="text-cream-dark">+1 (555) 123-4567</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-gradient border-0">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <MapPin className="text-accent-orange text-2xl" />
                    <div>
                      <h3 className="font-semibold text-cream">{t('address')}</h3>
                      <p className="text-cream-dark">123 Tech Street, Digital City, DC 12345</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div>
            <Card className="card-gradient border-0">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-cream mb-6">{t('sendMessage')}</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-cream mb-2">
                      {t('name')}
                    </label>
                    <Input 
                      type="text" 
                      required 
                      className="bg-dark-secondary/50 border-coffee text-cream"
                      placeholder={t('enterName')}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-cream mb-2">
                      {t('email')}
                    </label>
                    <Input 
                      type="email" 
                      required 
                      className="bg-dark-secondary/50 border-coffee text-cream"
                      placeholder={t('enterEmail')}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-cream mb-2">
                      {t('subject')}
                    </label>
                    <Input 
                      type="text" 
                      required 
                      className="bg-dark-secondary/50 border-coffee text-cream"
                      placeholder={t('enterSubject')}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-cream mb-2">
                      {t('message')}
                    </label>
                    <Textarea 
                      required 
                      className="bg-dark-secondary/50 border-coffee text-cream min-h-[120px]"
                      placeholder={t('enterMessage')}
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-accent-orange to-yellow-500 hover:from-accent-orange/90 hover:to-yellow-500/90 text-white font-semibold"
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
  );
}