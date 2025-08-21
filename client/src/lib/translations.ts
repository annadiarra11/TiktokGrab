export type Language = 'en' | 'es' | 'fr' | 'de' | 'pt' | 'zh' | 'ja' | 'ko' | 'ar';

export const languages: Record<Language, string> = {
  en: 'English',
  es: 'Español',
  fr: 'Français',
  de: 'Deutsch',
  pt: 'Português',
  zh: '中文',
  ja: '日本語',
  ko: '한국어',
  ar: 'العربية',
};

export type TranslationKey = keyof typeof translations.en;

export const translations = {
  en: {
    // Header
    brand: 'TikDownloader',
    features: 'Features',
    faq: 'FAQ',
    contact: 'Contact',
    
    // Hero section
    title: 'Download TikTok Videos',
    subtitle: 'Save your favorite TikTok videos in HD quality without watermarks. Fast, free, and reliable.',
    urlPlaceholder: 'Paste TikTok video URL here...',
    hdQuality: 'HD Quality',
    standardQuality: 'Standard Quality',
    audioOnly: 'Audio Only',
    downloadButton: 'Download Video',
    processing: 'Processing...',
    processingVideo: 'Processing your video...',
    
    // Features
    lightningFast: 'Lightning Fast',
    lightningFastDesc: 'Download videos in seconds with our optimized servers',
    noWatermarks: 'No Watermarks',
    noWatermarksDesc: 'Get clean videos without any watermarks or logos',
    allDevices: 'All Devices',
    allDevicesDesc: 'Works perfectly on desktop, tablet, and mobile',
    
    // Mobile app section
    mobileAppTitle: 'Download Our Mobile App',
    mobileAppDesc: 'Get the mobile app for faster downloads and offline access',
    googlePlay: 'Google Play',
    appStore: 'App Store',
    getItOn: 'Get it on',
    downloadOn: 'Download on the',
    
    // SEO Content Section
    seoTitle: 'TikTok Video Downloader - Free Online Tool',
    seoSubtitle: 'Professional TikTok Video Download Service',
    whyChooseUs: 'Why Choose Our TikTok Downloader?',
    
    // Main features for SEO
    unlimitedDownloads: 'Unlimited Free Downloads',
    unlimitedDownloadsDesc: 'Download as many TikTok videos as you want without any restrictions. Our free service has no daily limits or premium subscriptions required.',
    
    allFormatsSupported: 'All Video Formats Supported',
    allFormatsSupportedDesc: 'Download TikTok videos in MP4, save TikTok audio as MP3, and get content in HD, Full HD (1080p), or standard quality based on the original upload.',
    
    noSoftwareRequired: 'No Software Installation Required',
    noSoftwareRequiredDesc: 'Our web-based TikTok downloader works directly in your browser. No need to download apps or install extensions on your device.',
    
    crossPlatformCompatibility: 'Works on All Devices',
    crossPlatformCompatibilityDesc: 'Compatible with Windows, Mac, Linux, Android, and iOS. Download TikTok videos on desktop, tablet, or mobile phone with ease.',
    
    fastProcessing: 'Lightning Fast Processing',
    fastProcessingDesc: 'Our optimized servers process and convert TikTok videos in seconds. Experience the fastest TikTok video download service available online.',
    
    privacySecure: 'Privacy & Security First',
    privacySecureDesc: 'We dont store your downloaded videos or personal information. All TikTok video downloads are processed securely and deleted automatically.',
    
    // How it works section
    howItWorks: 'How to Download TikTok Videos',
    howItWorksDesc: 'Follow these simple steps to download any TikTok video without watermark:',
    step1Title: 'Copy TikTok Video URL',
    step1Desc: 'Open TikTok app or website, find the video you want to download, and copy its link.',
    step2Title: 'Paste URL in Our Downloader',
    step2Desc: 'Paste the TikTok video URL into our download input field above.',
    step3Title: 'Choose Quality & Download',
    step3Desc: 'Select your preferred video quality (HD, SD, or Audio only) and click download.',
    
    // Advanced features
    advancedFeatures: 'Advanced TikTok Download Features',
    batchDownload: 'Bulk Download Support',
    batchDownloadDesc: 'Download multiple TikTok videos at once by pasting multiple URLs.',
    audioExtraction: 'Audio Extraction',
    audioExtractionDesc: 'Extract high-quality audio from TikTok videos and save as MP3 files.',
    thumbnailDownload: 'Thumbnail Download',
    thumbnailDownloadDesc: 'Download TikTok video thumbnails and preview images in high resolution.',
    
    // About page
    aboutUs: 'About Us',
    aboutDesc: 'TikDownloader is the leading free online TikTok video downloader trusted by millions of users worldwide.',
    ourMission: 'Our Mission',
    missionDesc: 'We believe everyone should have easy access to download and save their favorite TikTok content. Our mission is to provide a fast, secure, and user-friendly service that works on all devices.',
    ourValues: 'Our Values',
    value1: 'Free and unlimited downloads for everyone',
    value2: 'Privacy and security first approach',
    value3: 'No software installation required',
    value4: 'Support for all devices and platforms',
    reliableService: 'Reliable Service',
    reliableServiceDesc: '99.9% uptime with servers optimized for fast video processing.',
    getStarted: 'Ready to Get Started?',
    getStartedDesc: 'Join millions of users who trust TikDownloader for their video downloading needs.',
    startDownloading: 'Start Downloading Now',
    
    // Contact page
    contactUs: 'Contact Us',
    contactDesc: 'Have questions or need support? We\'re here to help you with any issues or feedback.',
    getInTouch: 'Get in Touch',
    email: 'Email',
    liveChat: 'Live Chat',
    liveChatDesc: 'Available 24/7 for instant support',
    phone: 'Phone',
    address: 'Address',
    sendMessage: 'Send us a Message',
    name: 'Name',
    enterName: 'Enter your name',
    enterEmail: 'Enter your email',
    subject: 'Subject',
    enterSubject: 'Enter subject',
    message: 'Message',
    enterMessage: 'Enter your message',
    
    // Privacy Policy
    privacyPolicyDesc: 'Your privacy is important to us. This policy explains how we collect, use, and protect your information.',
    informationWeCollect: 'Information We Collect',
    informationWeCollectDesc: 'We collect minimal information necessary to provide our services:',
    info1: 'URLs you submit for video downloading',
    info2: 'Basic usage analytics to improve our service',
    info3: 'Technical information like IP address and browser type',
    info4: 'Cookies for website functionality and preferences',
    howWeUseInfo: 'How We Use Your Information',
    howWeUseInfoDesc: 'We use collected information to:',
    use1: 'Process your video download requests',
    use2: 'Improve our service quality and performance',
    use3: 'Analyze usage patterns for better user experience',
    use4: 'Ensure security and prevent abuse',
    dataProtection: 'Data Protection',
    dataProtectionDesc: 'We implement strong security measures:',
    protection1: 'SSL encryption for all data transmission',
    protection2: 'No permanent storage of your downloaded videos',
    protection3: 'Regular security audits and updates',
    cookies: 'Cookies',
    cookiesDesc: 'We use cookies to enhance your browsing experience and remember your preferences. You can disable cookies in your browser settings.',
    thirdParty: 'Third-Party Services',
    thirdPartyDesc: 'We may use third-party services for analytics and advertising. These services have their own privacy policies.',
    yourRights: 'Your Rights',
    yourRightsDesc: 'You have the right to:',
    right1: 'Access your personal data',
    right2: 'Correct inaccurate information',
    right3: 'Delete your data (right to be forgotten)',
    right4: 'Opt out of data collection',
    contactPrivacy: 'Contact Us',
    contactPrivacyDesc: 'For privacy-related questions, contact us at:',
    lastUpdated: 'Last Updated',
    
    // Terms of Service
    termsOfServiceDesc: 'Please read these terms carefully before using our service. By using TikDownloader, you agree to these terms.',
    acceptanceOfTerms: 'Acceptance of Terms',
    acceptanceOfTermsDesc: 'By accessing and using TikDownloader, you accept and agree to be bound by these Terms of Service.',
    serviceDescription: 'Service Description',
    serviceDescriptionDesc: 'TikDownloader provides the following services:',
    service1: 'Free TikTok video downloading without watermarks',
    service2: 'Multiple quality options (HD, SD, Audio)',
    service3: 'Cross-platform compatibility',
    service4: 'No registration or software installation required',
    userResponsibilities: 'User Responsibilities',
    userResponsibilitiesDesc: 'Users are responsible for:',
    responsibility1: 'Respecting copyright and intellectual property rights',
    responsibility2: 'Using downloaded content for personal use only',
    responsibility3: 'Not violating any applicable laws',
    responsibility4: 'Not overloading our servers with excessive requests',
    prohibitedUses: 'Prohibited Uses',
    prohibitedUsesDesc: 'The following uses are strictly prohibited:',
    prohibited1: 'Commercial redistribution of downloaded content',
    prohibited2: 'Downloading copyrighted content without permission',
    prohibited3: 'Using automated tools to bulk download',
    prohibited4: 'Attempting to reverse engineer our service',
    intellectualProperty: 'Intellectual Property',
    intellectualPropertyDesc: 'Users must respect the intellectual property rights of content creators and TikTok. Downloaded content should be used for personal purposes only.',
    disclaimer: 'Disclaimer',
    disclaimerDesc: 'TikDownloader is provided "as is" without warranties. We are not responsible for the content downloaded through our service.',
    limitationOfLiability: 'Limitation of Liability',
    limitationOfLiabilityDesc: 'TikDownloader shall not be liable for any direct, indirect, or consequential damages arising from the use of our service.',
    modifications: 'Modifications',
    modificationsDesc: 'We reserve the right to modify these terms at any time. Continued use constitutes acceptance of modified terms.',
    
    // FAQ Page
    faqPageDesc: 'Find answers to the most commonly asked questions about TikDownloader.',
    faqQ7: 'Is there a limit on video downloads?',
    faqA7: 'No, our service is completely free with unlimited downloads. You can download as many TikTok videos as you want.',
    faqQ8: 'Do you store downloaded videos?',
    faqA8: 'No, we do not store any downloaded videos on our servers. All processing is done temporarily and files are automatically deleted.',
    faqQ9: 'Can I download private TikTok videos?',
    faqA9: 'No, you can only download publicly available TikTok videos. Private videos cannot be accessed or downloaded.',
    faqQ10: 'What video qualities are available?',
    faqA10: 'We support HD (1080p), Standard (720p), and audio-only downloads depending on the original video quality.',
    stillHaveQuestions: 'Still Have Questions?',
    stillHaveQuestionsDesc: 'Can\'t find what you\'re looking for? Contact our support team for personalized help.',
    
    // Navigation
    otherDownloaders: 'Other Downloaders',
    paste: 'Paste',
    downloadVideo: 'Download Video',
    downloadAudio: 'Download Audio',
    downloadOtherVideos: 'Download other videos',
    
    // FAQ
    faqTitle: 'Frequently Asked Questions',
    faqQ1: 'How to download TikTok videos without watermark?',
    faqA1: 'Simply paste the TikTok video URL into our input field, select your preferred quality, and click download. Our system automatically removes watermarks from the downloaded video.',
    faqQ2: 'Is it legal to download TikTok videos?',
    faqA2: 'You should only download videos for personal use and respect copyright laws. Always ensure you have permission from the content creator before downloading their videos.',
    faqQ3: 'What video qualities are supported?',
    faqA3: 'We support HD quality (1080p), Standard quality (720p), and audio-only downloads. The available quality depends on the original video uploaded to TikTok.',
    faqQ4: 'Do I need to install any software?',
    faqA4: 'No installation required! Our web-based downloader works directly in your browser. However, we also offer mobile apps for enhanced convenience.',
    faqQ5: 'Is there a limit to how many videos I can download?',
    faqA5: 'Our service is completely free with no download limits. You can download as many TikTok videos as you want, whenever you want.',
    faqQ6: 'Can I download TikTok videos on my iPhone/Android?',
    faqA6: 'Yes! Our website is fully responsive and works on all mobile devices. You can also download our dedicated mobile apps for an even better experience.',
    
    // Footer
    company: 'Company',
    footerDesc: 'Fast, reliable, and free TikTok video downloader. Save your favorite videos in HD quality.',
    legal: 'Legal',
    tools: 'Tools',
    termsOfService: 'Terms of Service',
    privacyPolicy: 'Privacy Policy',
    cookiePolicy: 'Cookie Policy',
    dmca: 'DMCA',
    
    // Toast messages
    successTitle: 'Success!',
    successDesc: 'Video downloaded successfully',
    errorTitle: 'Error',
    downloadError: 'Failed to download video',
    clipboardError: 'Failed to read from clipboard',
    invalidUrl: 'Please enter a valid TikTok URL',
    urlMustBeTiktok: 'URL must be from TikTok',
    
    // Status messages
    downloadProgress: 'Downloading...',
    checkingStatus: 'Checking status...',
    videoReady: 'Video is ready for download!',
    processingFailed: 'Processing failed. Please try again.',
  },
  es: {
    // Header
    brand: 'TikDownloader',
    features: 'Características',
    faq: 'Preguntas Frecuentes',
    contact: 'Contacto',
    
    // Hero section
    title: 'Descargar Videos de TikTok',
    subtitle: 'Guarda tus videos favoritos de TikTok en calidad HD sin marcas de agua. Rápido, gratuito y confiable.',
    urlPlaceholder: 'Pega la URL del video de TikTok aquí...',
    hdQuality: 'Calidad HD',
    standardQuality: 'Calidad Estándar',
    audioOnly: 'Solo Audio',
    downloadButton: 'Descargar Video',
    processing: 'Procesando...',
    processingVideo: 'Procesando tu video...',
    
    // Features
    lightningFast: 'Súper Rápido',
    lightningFastDesc: 'Descarga videos en segundos con nuestros servidores optimizados',
    noWatermarks: 'Sin Marcas de Agua',
    noWatermarksDesc: 'Obtén videos limpios sin marcas de agua o logos',
    allDevices: 'Todos los Dispositivos',
    allDevicesDesc: 'Funciona perfectamente en computadora, tablet y móvil',
    
    // Mobile app section
    mobileAppTitle: 'Descarga Nuestra App Móvil',
    mobileAppDesc: 'Obtén la aplicación móvil para descargas más rápidas y acceso sin conexión',
    googlePlay: 'Google Play',
    appStore: 'App Store',
    getItOn: 'Disponible en',
    downloadOn: 'Descargar en',
    
    // SEO Content Section
    seoTitle: 'Descargador de Videos TikTok - Herramienta Online Gratuita',
    seoSubtitle: 'Servicio Profesional de Descarga de Videos TikTok',
    whyChooseUs: '¿Por Qué Elegir Nuestro Descargador TikTok?',
    
    // Main features for SEO
    unlimitedDownloads: 'Descargas Gratuitas Ilimitadas',
    unlimitedDownloadsDesc: 'Descarga tantos videos de TikTok como quieras sin restricciones. Nuestro servicio gratuito no tiene límites diarios ni suscripciones premium requeridas.',
    
    allFormatsSupported: 'Todos los Formatos de Video Compatibles',
    allFormatsSupportedDesc: 'Descarga videos TikTok en MP4, guarda audio TikTok como MP3, y obtén contenido en HD, Full HD (1080p), o calidad estándar basado en la subida original.',
    
    noSoftwareRequired: 'No Requiere Instalación de Software',
    noSoftwareRequiredDesc: 'Nuestro descargador TikTok basado en web funciona directamente en tu navegador. No necesitas descargar apps o instalar extensiones en tu dispositivo.',
    
    crossPlatformCompatibility: 'Funciona en Todos los Dispositivos',
    crossPlatformCompatibilityDesc: 'Compatible con Windows, Mac, Linux, Android, e iOS. Descarga videos TikTok en escritorio, tablet, o teléfono móvil con facilidad.',
    
    fastProcessing: 'Procesamiento Súper Rápido',
    fastProcessingDesc: 'Nuestros servidores optimizados procesan y convierten videos TikTok en segundos. Experimenta el servicio de descarga TikTok más rápido disponible online.',
    
    privacySecure: 'Privacidad y Seguridad Primero',
    privacySecureDesc: 'No almacenamos tus videos descargados o información personal. Todas las descargas TikTok se procesan de forma segura y se eliminan automáticamente.',
    
    // How it works section
    howItWorks: 'Cómo Descargar Videos TikTok',
    howItWorksDesc: 'Sigue estos simples pasos para descargar cualquier video TikTok sin marca de agua:',
    step1Title: 'Copia la URL del Video TikTok',
    step1Desc: 'Abre la app o sitio web TikTok, encuentra el video que quieres descargar, y copia su enlace.',
    step2Title: 'Pega la URL en Nuestro Descargador',
    step2Desc: 'Pega la URL del video TikTok en nuestro campo de descarga arriba.',
    step3Title: 'Elige Calidad y Descarga',
    step3Desc: 'Selecciona tu calidad preferida (HD, SD, o Solo Audio) y haz clic en descargar.',
    
    // Advanced features
    advancedFeatures: 'Características Avanzadas de Descarga TikTok',
    batchDownload: 'Soporte de Descarga Masiva',
    batchDownloadDesc: 'Descarga múltiples videos TikTok a la vez pegando múltiples URLs.',
    audioExtraction: 'Extracción de Audio',
    audioExtractionDesc: 'Extrae audio de alta calidad de videos TikTok y guarda como archivos MP3.',
    thumbnailDownload: 'Descarga de Miniaturas',
    thumbnailDownloadDesc: 'Descarga miniaturas de videos TikTok e imágenes de vista previa en alta resolución.',
    
    // FAQ
    faqTitle: 'Preguntas Frecuentes',
    faqQ1: '¿Cómo descargar videos de TikTok sin marca de agua?',
    faqA1: 'Simplemente pega la URL del video de TikTok en nuestro campo de entrada, selecciona tu calidad preferida y haz clic en descargar. Nuestro sistema elimina automáticamente las marcas de agua del video descargado.',
    faqQ2: '¿Es legal descargar videos de TikTok?',
    faqA2: 'Solo debes descargar videos para uso personal y respetar las leyes de derechos de autor. Siempre asegúrate de tener permiso del creador del contenido antes de descargar sus videos.',
    faqQ3: '¿Qué calidades de video son compatibles?',
    faqA3: 'Soportamos calidad HD (1080p), calidad Estándar (720p) y descargas solo de audio. La calidad disponible depende del video original subido a TikTok.',
    faqQ4: '¿Necesito instalar algún software?',
    faqA4: '¡No se requiere instalación! Nuestro descargador basado en web funciona directamente en tu navegador. Sin embargo, también ofrecemos aplicaciones móviles para mayor comodidad.',
    faqQ5: '¿Hay un límite de cuántos videos puedo descargar?',
    faqA5: 'Nuestro servicio es completamente gratuito sin límites de descarga. Puedes descargar tantos videos de TikTok como quieras, cuando quieras.',
    faqQ6: '¿Puedo descargar videos de TikTok en mi iPhone/Android?',
    faqA6: '¡Sí! Nuestro sitio web es completamente adaptable y funciona en todos los dispositivos móviles. También puedes descargar nuestras aplicaciones móviles dedicadas para una experiencia aún mejor.',
    
    // Footer
    company: 'Empresa',
    footerDesc: 'Descargador de videos de TikTok rápido, confiable y gratuito. Guarda tus videos favoritos en calidad HD.',
    legal: 'Legal',
    tools: 'Herramientas',
    termsOfService: 'Términos de Servicio',
    privacyPolicy: 'Política de Privacidad',
    cookiePolicy: 'Política de Cookies',
    dmca: 'DMCA',
    
    // Toast messages
    successTitle: '¡Éxito!',
    successDesc: 'Video descargado exitosamente',
    errorTitle: 'Error',
    downloadError: 'Falló la descarga del video',
    clipboardError: 'Falló la lectura del portapapeles',
    invalidUrl: 'Por favor ingresa una URL válida de TikTok',
    urlMustBeTiktok: 'La URL debe ser de TikTok',
    
    // Status messages
    downloadProgress: 'Descargando...',
    checkingStatus: 'Verificando estado...',
    videoReady: '¡El video está listo para descargar!',
    processingFailed: 'Procesamiento falló. Por favor intenta de nuevo.',
  },
  fr: {
    // Header
    brand: 'TikDownloader',
    features: 'Fonctionnalités',
    faq: 'FAQ',
    contact: 'Contact',
    
    // Hero section
    title: 'Télécharger des Vidéos TikTok',
    subtitle: 'Sauvegardez vos vidéos TikTok préférées en qualité HD sans filigrane. Rapide, gratuit et fiable.',
    urlPlaceholder: 'Collez l\'URL de la vidéo TikTok ici...',
    hdQuality: 'Qualité HD',
    standardQuality: 'Qualité Standard',
    audioOnly: 'Audio Seulement',
    downloadButton: 'Télécharger la Vidéo',
    processing: 'Traitement...',
    processingVideo: 'Traitement de votre vidéo...',
    
    // Features
    lightningFast: 'Ultra Rapide',
    lightningFastDesc: 'Téléchargez des vidéos en quelques secondes avec nos serveurs optimisés',
    noWatermarks: 'Sans Filigrane',
    noWatermarksDesc: 'Obtenez des vidéos propres sans filigrane ni logos',
    allDevices: 'Tous les Appareils',
    allDevicesDesc: 'Fonctionne parfaitement sur ordinateur, tablette et mobile',
    
    // Mobile app section
    mobileAppTitle: 'Téléchargez Notre App Mobile',
    mobileAppDesc: 'Obtenez l\'application mobile pour des téléchargements plus rapides et un accès hors ligne',
    googlePlay: 'Google Play',
    appStore: 'App Store',
    getItOn: 'Disponible sur',
    downloadOn: 'Télécharger sur',
    
    // SEO Content Section
    seoTitle: 'Téléchargeur de Vidéos TikTok - Outil Gratuit en Ligne',
    seoSubtitle: 'Service Professionnel de Téléchargement Vidéo TikTok',
    whyChooseUs: 'Pourquoi Choisir Notre Téléchargeur TikTok ?',
    unlimitedDownloads: 'Téléchargements Gratuits Illimités',
    unlimitedDownloadsDesc: 'Téléchargez autant de vidéos TikTok que vous voulez sans restrictions.',
    allFormatsSupported: 'Tous les Formats Vidéo Supportés',
    allFormatsSupportedDesc: 'Téléchargez des vidéos TikTok en MP4, sauvegardez l\'audio TikTok en MP3.',
    noSoftwareRequired: 'Aucune Installation de Logiciel Requise',
    noSoftwareRequiredDesc: 'Notre téléchargeur TikTok basé sur le web fonctionne directement dans votre navigateur.',
    crossPlatformCompatibility: 'Fonctionne sur Tous les Appareils',
    crossPlatformCompatibilityDesc: 'Compatible avec Windows, Mac, Linux, Android, et iOS.',
    fastProcessing: 'Traitement Ultra Rapide',
    fastProcessingDesc: 'Nos serveurs optimisés traitent et convertissent les vidéos TikTok en quelques secondes.',
    privacySecure: 'Confidentialité et Sécurité d\'Abord',
    privacySecureDesc: 'Nous ne stockons pas vos vidéos téléchargées ou informations personnelles.',
    howItWorks: 'Comment Télécharger des Vidéos TikTok',
    howItWorksDesc: 'Suivez ces étapes simples pour télécharger n\'importe quelle vidéo TikTok sans filigrane :',
    step1Title: 'Copiez l\'URL de la Vidéo TikTok',
    step1Desc: 'Ouvrez l\'app ou le site TikTok, trouvez la vidéo à télécharger, et copiez son lien.',
    step2Title: 'Collez l\'URL dans Notre Téléchargeur',
    step2Desc: 'Collez l\'URL de la vidéo TikTok dans notre champ de téléchargement ci-dessus.',
    step3Title: 'Choisissez la Qualité et Téléchargez',
    step3Desc: 'Sélectionnez votre qualité préférée et cliquez sur télécharger.',
    advancedFeatures: 'Fonctionnalités Avancées de Téléchargement TikTok',
    batchDownload: 'Support de Téléchargement en Lot',
    batchDownloadDesc: 'Téléchargez plusieurs vidéos TikTok à la fois.',
    audioExtraction: 'Extraction Audio',
    audioExtractionDesc: 'Extrayez l\'audio de haute qualité des vidéos TikTok.',
    thumbnailDownload: 'Téléchargement de Vignettes',
    thumbnailDownloadDesc: 'Téléchargez les vignettes et images d\'aperçu des vidéos TikTok.',
    
    // FAQ
    faqTitle: 'Questions Fréquemment Posées',
    faqQ1: 'Comment télécharger des vidéos TikTok sans filigrane ?',
    faqA1: 'Collez simplement l\'URL de la vidéo TikTok dans notre champ de saisie, sélectionnez votre qualité préférée et cliquez sur télécharger. Notre système supprime automatiquement les filigranes de la vidéo téléchargée.',
    faqQ2: 'Est-il légal de télécharger des vidéos TikTok ?',
    faqA2: 'Vous ne devez télécharger des vidéos que pour un usage personnel et respecter les lois sur le droit d\'auteur. Assurez-vous toujours d\'avoir la permission du créateur de contenu avant de télécharger ses vidéos.',
    faqQ3: 'Quelles qualités vidéo sont prises en charge ?',
    faqA3: 'Nous prenons en charge la qualité HD (1080p), la qualité Standard (720p) et les téléchargements audio uniquement. La qualité disponible dépend de la vidéo originale téléchargée sur TikTok.',
    faqQ4: 'Dois-je installer un logiciel ?',
    faqA4: 'Aucune installation requise ! Notre téléchargeur basé sur le web fonctionne directement dans votre navigateur. Cependant, nous proposons également des applications mobiles pour plus de commodité.',
    faqQ5: 'Y a-t-il une limite au nombre de vidéos que je peux télécharger ?',
    faqA5: 'Notre service est entièrement gratuit sans limite de téléchargement. Vous pouvez télécharger autant de vidéos TikTok que vous le souhaitez, quand vous le souhaitez.',
    faqQ6: 'Puis-je télécharger des vidéos TikTok sur mon iPhone/Android ?',
    faqA6: 'Oui ! Notre site web est entièrement responsive et fonctionne sur tous les appareils mobiles. Vous pouvez également télécharger nos applications mobiles dédiées pour une expérience encore meilleure.',
    
    // Footer
    company: 'Entreprise',
    footerDesc: 'Téléchargeur de vidéos TikTok rapide, fiable et gratuit. Sauvegardez vos vidéos préférées en qualité HD.',
    legal: 'Légal',
    tools: 'Outils',
    termsOfService: 'Conditions de Service',
    privacyPolicy: 'Politique de Confidentialité',
    cookiePolicy: 'Politique des Cookies',
    dmca: 'DMCA',
    
    // Toast messages
    successTitle: 'Succès !',
    successDesc: 'Vidéo téléchargée avec succès',
    errorTitle: 'Erreur',
    downloadError: 'Échec du téléchargement de la vidéo',
    clipboardError: 'Échec de la lecture du presse-papiers',
    invalidUrl: 'Veuillez entrer une URL TikTok valide',
    urlMustBeTiktok: 'L\'URL doit être de TikTok',
    
    // Status messages
    downloadProgress: 'Téléchargement...',
    checkingStatus: 'Vérification du statut...',
    videoReady: 'La vidéo est prête pour le téléchargement !',
    processingFailed: 'Le traitement a échoué. Veuillez réessayer.',
  },
  de: {
    // Header
    brand: 'TikDownloader',
    features: 'Funktionen',
    faq: 'FAQ',
    contact: 'Kontakt',
    
    // Hero section
    title: 'TikTok Videos Herunterladen',
    subtitle: 'Speichere deine Lieblings-TikTok-Videos in HD-Qualität ohne Wasserzeichen. Schnell, kostenlos und zuverlässig.',
    urlPlaceholder: 'TikTok Video-URL hier einfügen...',
    hdQuality: 'HD-Qualität',
    standardQuality: 'Standard-Qualität',
    audioOnly: 'Nur Audio',
    downloadButton: 'Video Herunterladen',
    processing: 'Verarbeitung...',
    processingVideo: 'Verarbeite dein Video...',
    
    // Features
    lightningFast: 'Blitzschnell',
    lightningFastDesc: 'Lade Videos in Sekunden mit unseren optimierten Servern herunter',
    noWatermarks: 'Keine Wasserzeichen',
    noWatermarksDesc: 'Erhalte saubere Videos ohne Wasserzeichen oder Logos',
    allDevices: 'Alle Geräte',
    allDevicesDesc: 'Funktioniert perfekt auf Desktop, Tablet und Mobilgerät',
    
    // Mobile app section
    mobileAppTitle: 'Lade Unsere Mobile App Herunter',
    mobileAppDesc: 'Hol dir die mobile App für schnellere Downloads und Offline-Zugriff',
    googlePlay: 'Google Play',
    appStore: 'App Store',
    getItOn: 'Erhältlich bei',
    downloadOn: 'Herunterladen im',
    
    // FAQ
    faqTitle: 'Häufig Gestellte Fragen',
    faqQ1: 'Wie lade ich TikTok-Videos ohne Wasserzeichen herunter?',
    faqA1: 'Füge einfach die TikTok-Video-URL in unser Eingabefeld ein, wähle deine bevorzugte Qualität und klicke auf Herunterladen. Unser System entfernt automatisch Wasserzeichen vom heruntergeladenen Video.',
    faqQ2: 'Ist es legal, TikTok-Videos herunterzuladen?',
    faqA2: 'Du solltest Videos nur für den persönlichen Gebrauch herunterladen und die Urheberrechtsgesetze respektieren. Stelle immer sicher, dass du die Erlaubnis des Content-Erstellers hast, bevor du seine Videos herunterlädst.',
    faqQ3: 'Welche Videoqualitäten werden unterstützt?',
    faqA3: 'Wir unterstützen HD-Qualität (1080p), Standard-Qualität (720p) und reine Audio-Downloads. Die verfügbare Qualität hängt vom ursprünglich auf TikTok hochgeladenen Video ab.',
    faqQ4: 'Muss ich eine Software installieren?',
    faqA4: 'Keine Installation erforderlich! Unser webbasierter Downloader funktioniert direkt in deinem Browser. Wir bieten jedoch auch mobile Apps für mehr Komfort.',
    faqQ5: 'Gibt es ein Limit für die Anzahl der Videos, die ich herunterladen kann?',
    faqA5: 'Unser Service ist völlig kostenlos ohne Download-Limits. Du kannst so viele TikTok-Videos herunterladen, wie du möchtest, wann immer du möchtest.',
    faqQ6: 'Kann ich TikTok-Videos auf meinem iPhone/Android herunterladen?',
    faqA6: 'Ja! Unsere Website ist vollständig responsiv und funktioniert auf allen mobilen Geräten. Du kannst auch unsere dedizierten mobilen Apps für eine noch bessere Erfahrung herunterladen.',
    
    // Footer
    company: 'Unternehmen',
    footerDesc: 'Schneller, zuverlässiger und kostenloser TikTok-Video-Downloader. Speichere deine Lieblingsvideos in HD-Qualität.',
    legal: 'Rechtliches',
    tools: 'Tools',
    termsOfService: 'Nutzungsbedingungen',
    privacyPolicy: 'Datenschutzrichtlinie',
    cookiePolicy: 'Cookie-Richtlinie',
    dmca: 'DMCA',
    
    // Toast messages
    successTitle: 'Erfolg!',
    successDesc: 'Video erfolgreich heruntergeladen',
    errorTitle: 'Fehler',
    downloadError: 'Video-Download fehlgeschlagen',
    clipboardError: 'Lesen der Zwischenablage fehlgeschlagen',
    invalidUrl: 'Bitte gib eine gültige TikTok-URL ein',
    urlMustBeTiktok: 'URL muss von TikTok stammen',
    
    // Status messages
    downloadProgress: 'Herunterladen...',
    checkingStatus: 'Status überprüfen...',
    videoReady: 'Video ist bereit zum Download!',
    processingFailed: 'Verarbeitung fehlgeschlagen. Bitte versuche es erneut.',
  },
  pt: {
    // Header
    brand: 'TikDownloader',
    features: 'Recursos',
    faq: 'FAQ',
    contact: 'Contato',
    
    // Hero section
    title: 'Baixar Vídeos do TikTok',
    subtitle: 'Salve seus vídeos favoritos do TikTok em qualidade HD sem marca d\'água. Rápido, gratuito e confiável.',
    urlPlaceholder: 'Cole a URL do vídeo do TikTok aqui...',
    hdQuality: 'Qualidade HD',
    standardQuality: 'Qualidade Padrão',
    audioOnly: 'Apenas Áudio',
    downloadButton: 'Baixar Vídeo',
    processing: 'Processando...',
    processingVideo: 'Processando seu vídeo...',
    
    // Features
    lightningFast: 'Super Rápido',
    lightningFastDesc: 'Baixe vídeos em segundos com nossos servidores otimizados',
    noWatermarks: 'Sem Marca d\'Água',
    noWatermarksDesc: 'Obtenha vídeos limpos sem marcas d\'água ou logos',
    allDevices: 'Todos os Dispositivos',
    allDevicesDesc: 'Funciona perfeitamente em desktop, tablet e celular',
    
    // Mobile app section
    mobileAppTitle: 'Baixe Nosso App Mobile',
    mobileAppDesc: 'Obtenha o aplicativo móvel para downloads mais rápidos e acesso offline',
    googlePlay: 'Google Play',
    appStore: 'App Store',
    getItOn: 'Disponível no',
    downloadOn: 'Baixar na',
    
    // FAQ
    faqTitle: 'Perguntas Frequentes',
    faqQ1: 'Como baixar vídeos do TikTok sem marca d\'água?',
    faqA1: 'Simplesmente cole a URL do vídeo do TikTok no nosso campo de entrada, selecione sua qualidade preferida e clique em baixar. Nosso sistema remove automaticamente as marcas d\'água do vídeo baixado.',
    faqQ2: 'É legal baixar vídeos do TikTok?',
    faqA2: 'Você deve baixar vídeos apenas para uso pessoal e respeitar as leis de direitos autorais. Sempre certifique-se de ter permissão do criador de conteúdo antes de baixar seus vídeos.',
    faqQ3: 'Quais qualidades de vídeo são suportadas?',
    faqA3: 'Suportamos qualidade HD (1080p), qualidade Padrão (720p) e downloads apenas de áudio. A qualidade disponível depende do vídeo original enviado ao TikTok.',
    faqQ4: 'Preciso instalar algum software?',
    faqA4: 'Nenhuma instalação necessária! Nosso downloader baseado na web funciona diretamente no seu navegador. No entanto, também oferecemos aplicativos móveis para maior conveniência.',
    faqQ5: 'Há um limite para quantos vídeos posso baixar?',
    faqA5: 'Nosso serviço é completamente gratuito sem limites de download. Você pode baixar quantos vídeos do TikTok quiser, quando quiser.',
    faqQ6: 'Posso baixar vídeos do TikTok no meu iPhone/Android?',
    faqA6: 'Sim! Nosso site é totalmente responsivo e funciona em todos os dispositivos móveis. Você também pode baixar nossos aplicativos móveis dedicados para uma experiência ainda melhor.',
    
    // Footer
    company: 'Empresa',
    footerDesc: 'Downloader de vídeos do TikTok rápido, confiável e gratuito. Salve seus vídeos favoritos em qualidade HD.',
    legal: 'Legal',
    tools: 'Ferramentas',
    termsOfService: 'Termos de Serviço',
    privacyPolicy: 'Política de Privacidade',
    cookiePolicy: 'Política de Cookies',
    dmca: 'DMCA',
    
    // Toast messages
    successTitle: 'Sucesso!',
    successDesc: 'Vídeo baixado com sucesso',
    errorTitle: 'Erro',
    downloadError: 'Falha ao baixar vídeo',
    clipboardError: 'Falha ao ler da área de transferência',
    invalidUrl: 'Por favor, insira uma URL válida do TikTok',
    urlMustBeTiktok: 'A URL deve ser do TikTok',
    
    // Status messages
    downloadProgress: 'Baixando...',
    checkingStatus: 'Verificando status...',
    videoReady: 'Vídeo pronto para download!',
    processingFailed: 'Processamento falhou. Tente novamente.',
  },
  zh: {
    // Header
    brand: 'TikDownloader',
    features: '功能',
    faq: '常见问题',
    contact: '联系我们',
    
    // Hero section
    title: '下载TikTok视频',
    subtitle: '以高清质量保存您最喜爱的TikTok视频，无水印。快速、免费、可靠。',
    urlPlaceholder: '在此粘贴TikTok视频链接...',
    hdQuality: '高清质量',
    standardQuality: '标清质量',
    audioOnly: '仅音频',
    downloadButton: '下载视频',
    processing: '处理中...',
    processingVideo: '正在处理您的视频...',
    
    // Features
    lightningFast: '闪电般快速',
    lightningFastDesc: '使用我们优化的服务器在几秒钟内下载视频',
    noWatermarks: '无水印',
    noWatermarksDesc: '获得干净的视频，无水印或标志',
    allDevices: '全设备支持',
    allDevicesDesc: '在桌面、平板电脑和手机上完美运行',
    
    // Mobile app section
    mobileAppTitle: '下载我们的手机应用',
    mobileAppDesc: '获取手机应用以获得更快的下载和离线访问',
    googlePlay: 'Google Play',
    appStore: 'App Store',
    getItOn: '下载于',
    downloadOn: '下载于',
    
    // FAQ
    faqTitle: '常见问题',
    faqQ1: '如何下载无水印的TikTok视频？',
    faqA1: '只需将TikTok视频链接粘贴到我们的输入框中，选择您偏好的质量，然后点击下载。我们的系统会自动从下载的视频中删除水印。',
    faqQ2: '下载TikTok视频合法吗？',
    faqA2: '您应该仅将视频用于个人用途并遵守版权法。在下载视频之前，请始终确保您已获得内容创作者的许可。',
    faqQ3: '支持哪些视频质量？',
    faqA3: '我们支持高清质量(1080p)、标清质量(720p)和仅音频下载。可用质量取决于上传到TikTok的原始视频。',
    faqQ4: '我需要安装任何软件吗？',
    faqA4: '无需安装！我们基于网页的下载器直接在您的浏览器中工作。不过，我们也提供手机应用以增强便利性。',
    faqQ5: '我可以下载多少个视频有限制吗？',
    faqA5: '我们的服务完全免费，没有下载限制。您可以随时下载任意数量的TikTok视频。',
    faqQ6: '我可以在iPhone/Android上下载TikTok视频吗？',
    faqA6: '是的！我们的网站完全响应式，可在所有移动设备上运行。您还可以下载我们专门的移动应用以获得更好的体验。',
    
    // Footer
    company: '公司',
    footerDesc: '快速、可靠、免费的TikTok视频下载器。以高清质量保存您最喜爱的视频。',
    legal: '法律',
    tools: '工具',
    termsOfService: '服务条款',
    privacyPolicy: '隐私政策',
    cookiePolicy: 'Cookie政策',
    dmca: 'DMCA',
    
    // Toast messages
    successTitle: '成功！',
    successDesc: '视频下载成功',
    errorTitle: '错误',
    downloadError: '视频下载失败',
    clipboardError: '读取剪贴板失败',
    invalidUrl: '请输入有效的TikTok链接',
    urlMustBeTiktok: '链接必须来自TikTok',
    
    // Status messages
    downloadProgress: '下载中...',
    checkingStatus: '检查状态...',
    videoReady: '视频已准备好下载！',
    processingFailed: '处理失败。请重试。',
  },
  ja: {
    // Header
    brand: 'TikDownloader',
    features: '機能',
    faq: 'よくある質問',
    contact: 'お問い合わせ',
    
    // Hero section
    title: 'TikTok動画をダウンロード',
    subtitle: 'お気に入りのTikTok動画をウォーターマークなしのHD品質で保存。高速、無料、信頼性。',
    urlPlaceholder: 'TikTok動画のURLをここに貼り付け...',
    hdQuality: 'HD品質',
    standardQuality: '標準品質',
    audioOnly: '音声のみ',
    downloadButton: '動画をダウンロード',
    processing: '処理中...',
    processingVideo: '動画を処理中...',
    
    // Features
    lightningFast: '超高速',
    lightningFastDesc: '最適化されたサーバーで数秒で動画をダウンロード',
    noWatermarks: 'ウォーターマークなし',
    noWatermarksDesc: 'ウォーターマークやロゴのないクリーンな動画を取得',
    allDevices: '全デバイス対応',
    allDevicesDesc: 'デスクトップ、タブレット、モバイルで完璧に動作',
    
    // Mobile app section
    mobileAppTitle: 'モバイルアプリをダウンロード',
    mobileAppDesc: 'より高速なダウンロードとオフラインアクセスのためにモバイルアプリを入手',
    googlePlay: 'Google Play',
    appStore: 'App Store',
    getItOn: '入手先',
    downloadOn: 'ダウンロード',
    
    // FAQ
    faqTitle: 'よくある質問',
    faqQ1: 'ウォーターマークなしでTikTok動画をダウンロードするには？',
    faqA1: 'TikTok動画のURLを入力フィールドに貼り付け、お好みの品質を選択してダウンロードをクリックするだけです。システムが自動的にダウンロードした動画からウォーターマークを削除します。',
    faqQ2: 'TikTok動画のダウンロードは合法ですか？',
    faqA2: '個人使用のみで動画をダウンロードし、著作権法を尊重してください。コンテンツクリエイターの動画をダウンロードする前に、必ず許可を得てください。',
    faqQ3: 'どの動画品質がサポートされていますか？',
    faqA3: 'HD品質(1080p)、標準品質(720p)、音声のみダウンロードをサポートしています。利用可能な品質は、TikTokにアップロードされた元の動画によります。',
    faqQ4: 'ソフトウェアをインストールする必要がありますか？',
    faqA4: 'インストール不要！Webベースのダウンローダーがブラウザで直接動作します。ただし、より便利にご利用いただけるモバイルアプリも提供しています。',
    faqQ5: 'ダウンロードできる動画数に制限はありますか？',
    faqA5: '当サービスは完全無料でダウンロード制限はありません。いつでも好きなだけTikTok動画をダウンロードできます。',
    faqQ6: 'iPhone/AndroidでTikTok動画をダウンロードできますか？',
    faqA6: 'はい！当サイトは完全にレスポンシブで、すべてのモバイルデバイスで動作します。さらに良い体験のために専用モバイルアプリもダウンロードできます。',
    
    // Footer
    company: '会社',
    footerDesc: '高速、信頼性、無料のTikTok動画ダウンローダー。お気に入りの動画をHD品質で保存。',
    legal: '法的事項',
    tools: 'ツール',
    termsOfService: '利用規約',
    privacyPolicy: 'プライバシーポリシー',
    cookiePolicy: 'Cookieポリシー',
    dmca: 'DMCA',
    
    // Toast messages
    successTitle: '成功！',
    successDesc: '動画が正常にダウンロードされました',
    errorTitle: 'エラー',
    downloadError: '動画のダウンロードに失敗しました',
    clipboardError: 'クリップボードの読み取りに失敗しました',
    invalidUrl: '有効なTikTok URLを入力してください',
    urlMustBeTiktok: 'URLはTikTokのものである必要があります',
    
    // Status messages
    downloadProgress: 'ダウンロード中...',
    checkingStatus: 'ステータス確認中...',
    videoReady: '動画のダウンロード準備完了！',
    processingFailed: '処理に失敗しました。再試行してください。',
  },
  ko: {
    // Header
    brand: 'TikDownloader',
    features: '기능',
    faq: '자주 묻는 질문',
    contact: '문의',
    
    // Hero section
    title: 'TikTok 동영상 다운로드',
    subtitle: '좋아하는 TikTok 동영상을 워터마크 없이 HD 화질로 저장하세요. 빠르고, 무료이며, 안정적입니다.',
    urlPlaceholder: 'TikTok 동영상 URL을 여기에 붙여넣으세요...',
    hdQuality: 'HD 화질',
    standardQuality: '표준 화질',
    audioOnly: '오디오만',
    downloadButton: '동영상 다운로드',
    processing: '처리 중...',
    processingVideo: '동영상을 처리하고 있습니다...',
    
    // Features
    lightningFast: '번개처럼 빠름',
    lightningFastDesc: '최적화된 서버로 몇 초 만에 동영상을 다운로드하세요',
    noWatermarks: '워터마크 없음',
    noWatermarksDesc: '워터마크나 로고가 없는 깨끗한 동영상을 얻으세요',
    allDevices: '모든 기기',
    allDevicesDesc: '데스크톱, 태블릿, 모바일에서 완벽하게 작동합니다',
    
    // Mobile app section
    mobileAppTitle: '모바일 앱 다운로드',
    mobileAppDesc: '더 빠른 다운로드와 오프라인 액세스를 위해 모바일 앱을 받으세요',
    googlePlay: 'Google Play',
    appStore: 'App Store',
    getItOn: '다운로드:',
    downloadOn: '다운로드:',
    
    // FAQ
    faqTitle: '자주 묻는 질문',
    faqQ1: '워터마크 없이 TikTok 동영상을 다운로드하는 방법은?',
    faqA1: 'TikTok 동영상 URL을 입력 필드에 붙여넣고, 원하는 화질을 선택한 후 다운로드를 클릭하세요. 시스템이 자동으로 다운로드된 동영상에서 워터마크를 제거합니다.',
    faqQ2: 'TikTok 동영상 다운로드는 합법적인가요?',
    faqA2: '개인적인 용도로만 동영상을 다운로드하고 저작권법을 준수해야 합니다. 콘텐츠 제작자의 동영상을 다운로드하기 전에 항상 허가를 받으세요.',
    faqQ3: '어떤 동영상 화질이 지원되나요?',
    faqA3: 'HD 화질(1080p), 표준 화질(720p), 오디오 전용 다운로드를 지원합니다. 사용 가능한 화질은 TikTok에 업로드된 원본 동영상에 따라 다릅니다.',
    faqQ4: '소프트웨어를 설치해야 하나요?',
    faqA4: '설치 필요 없음! 웹 기반 다운로더가 브라우저에서 직접 작동합니다. 하지만 더 편리한 사용을 위해 모바일 앱도 제공합니다.',
    faqQ5: '다운로드할 수 있는 동영상 수에 제한이 있나요?',
    faqA5: '우리 서비스는 완전 무료이며 다운로드 제한이 없습니다. 언제든지 원하는 만큼 TikTok 동영상을 다운로드할 수 있습니다.',
    faqQ6: 'iPhone/Android에서 TikTok 동영상을 다운로드할 수 있나요?',
    faqA6: '네! 우리 웹사이트는 완전히 반응형이며 모든 모바일 기기에서 작동합니다. 더 나은 경험을 위해 전용 모바일 앱도 다운로드할 수 있습니다.',
    
    // Footer
    company: '회사',
    footerDesc: '빠르고, 안정적이며, 무료인 TikTok 동영상 다운로더. 좋아하는 동영상을 HD 화질로 저장하세요.',
    legal: '법적',
    tools: '도구',
    termsOfService: '서비스 약관',
    privacyPolicy: '개인정보 보호정책',
    cookiePolicy: '쿠키 정책',
    dmca: 'DMCA',
    
    // Toast messages
    successTitle: '성공!',
    successDesc: '동영상이 성공적으로 다운로드되었습니다',
    errorTitle: '오류',
    downloadError: '동영상 다운로드에 실패했습니다',
    clipboardError: '클립보드 읽기에 실패했습니다',
    invalidUrl: '유효한 TikTok URL을 입력하세요',
    urlMustBeTiktok: 'URL은 TikTok에서 가져온 것이어야 합니다',
    
    // Status messages
    downloadProgress: '다운로드 중...',
    checkingStatus: '상태 확인 중...',
    videoReady: '동영상 다운로드 준비 완료!',
    processingFailed: '처리에 실패했습니다. 다시 시도해 주세요.',
  },
  ar: {
    // Header
    brand: 'TikDownloader',
    features: 'الميزات',
    faq: 'الأسئلة الشائعة',
    contact: 'اتصل بنا',
    
    // Hero section
    title: 'تحميل فيديوهات TikTok',
    subtitle: 'احفظ فيديوهات TikTok المفضلة لديك بجودة عالية الوضوح بدون علامات مائية. سريع ومجاني وموثوق.',
    urlPlaceholder: 'الصق رابط فيديو TikTok هنا...',
    hdQuality: 'جودة عالية',
    standardQuality: 'جودة عادية',
    audioOnly: 'صوت فقط',
    downloadButton: 'تحميل الفيديو',
    processing: 'جاري المعالجة...',
    processingVideo: 'جاري معالجة الفيديو الخاص بك...',
    
    // Features
    lightningFast: 'سريع البرق',
    lightningFastDesc: 'حمّل الفيديوهات في ثوانٍ مع خوادمنا المحسّنة',
    noWatermarks: 'بدون علامات مائية',
    noWatermarksDesc: 'احصل على فيديوهات نظيفة بدون علامات مائية أو شعارات',
    allDevices: 'جميع الأجهزة',
    allDevicesDesc: 'يعمل بشكل مثالي على سطح المكتب والجهاز اللوحي والجوال',
    
    // Mobile app section
    mobileAppTitle: 'حمّل تطبيقنا للجوال',
    mobileAppDesc: 'احصل على التطبيق للجوال لتحميل أسرع والوصول بدون إنترنت',
    googlePlay: 'Google Play',
    appStore: 'App Store',
    getItOn: 'متوفر على',
    downloadOn: 'حمّل من',
    
    // FAQ
    faqTitle: 'الأسئلة الشائعة',
    faqQ1: 'كيفية تحميل فيديوهات TikTok بدون علامة مائية؟',
    faqA1: 'ببساطة الصق رابط فيديو TikTok في حقل الإدخال، اختر الجودة المفضلة لديك، وانقر على تحميل. نظامنا يزيل العلامات المائية تلقائياً من الفيديو المحمّل.',
    faqQ2: 'هل من القانوني تحميل فيديوهات TikTok؟',
    faqA2: 'يجب عليك تحميل الفيديوهات للاستخدام الشخصي فقط واحترام قوانين حقوق الطبع والنشر. تأكد دائماً من الحصول على إذن من منشئ المحتوى قبل تحميل فيديوهاته.',
    faqQ3: 'ما هي جودات الفيديو المدعومة؟',
    faqA3: 'ندعم الجودة العالية (1080p)، الجودة العادية (720p)، وتحميل الصوت فقط. الجودة المتاحة تعتمد على الفيديو الأصلي المرفوع على TikTok.',
    faqQ4: 'هل أحتاج لتثبيت أي برنامج؟',
    faqA4: 'لا حاجة للتثبيت! منزّلنا المبني على الويب يعمل مباشرة في متصفحك. ولكن نوفر أيضاً تطبيقات الجوال لمزيد من الراحة.',
    faqQ5: 'هل يوجد حد لعدد الفيديوهات التي يمكنني تحميلها؟',
    faqA5: 'خدمتنا مجانية تماماً بدون حدود تحميل. يمكنك تحميل أي عدد من فيديوهات TikTok تريده، متى تريد.',
    faqQ6: 'هل يمكنني تحميل فيديوهات TikTok على iPhone/Android؟',
    faqA6: 'نعم! موقعنا متجاوب بالكامل ويعمل على جميع الأجهزة المحمولة. يمكنك أيضاً تحميل تطبيقاتنا المخصصة للجوال للحصول على تجربة أفضل.',
    
    // Footer
    company: 'الشركة',
    footerDesc: 'منزّل فيديوهات TikTok سريع وموثوق ومجاني. احفظ فيديوهاتك المفضلة بجودة عالية.',
    legal: 'قانوني',
    tools: 'الأدوات',
    termsOfService: 'شروط الخدمة',
    privacyPolicy: 'سياسة الخصوصية',
    cookiePolicy: 'سياسة الكوكيز',
    dmca: 'DMCA',
    
    // Toast messages
    successTitle: 'نجح!',
    successDesc: 'تم تحميل الفيديو بنجاح',
    errorTitle: 'خطأ',
    downloadError: 'فشل في تحميل الفيديو',
    clipboardError: 'فشل في قراءة الحافظة',
    invalidUrl: 'الرجاء إدخال رابط TikTok صحيح',
    urlMustBeTiktok: 'يجب أن يكون الرابط من TikTok',
    
    // Status messages
    downloadProgress: 'جاري التحميل...',
    checkingStatus: 'جاري فحص الحالة...',
    videoReady: 'الفيديو جاهز للتحميل!',
    processingFailed: 'فشلت المعالجة. الرجاء المحاولة مرة أخرى.',
  },
};

export function useTranslation(language: Language = 'en') {
  const t = (key: TranslationKey): string => {
    const translation = translations[language];
    const englishTranslation = translations.en;
    
    // Try the selected language first, then fallback to English, then the key itself
    return (translation && translation[key as keyof typeof translation]) || 
           (englishTranslation && englishTranslation[key as keyof typeof englishTranslation]) || 
           key;
  };

  return { t };
}