export type Language = 'tr' | 'en' | 'de' | 'es';

export interface Translations {
  common: {
    appName: string;
    tagline: string;
    save: string;
    cancel: string;
    delete: string;
    edit: string;
    add: string;
    close: string;
    loading: string;
    search: string;
    filter: string;
    all: string;
    actions: string;
    demoData: string;
    high: string;
    medium: string;
    low: string;
    opportunity: string;
    leadScore: string;
    websiteScore: string;
    digitalPresence: string;
    estValue: string;
    copied: string;
    copy: string;
    send: string;
    regenerate: string;
    markAsSent: string;
    alreadySent: string;
    stage: string;
    notes: string;
    status: string;
    online: string;
    manage: string;
    clearFilters: string;
  };
  nav: {
    dashboard: string;
    leads: string;
    discovery: string;
    pipeline: string;
    settings: string;
    aiStrategist: string;
    addLead: string;
    findLeadsPlaceholder: string;
    editIcp: string;
  };
  dashboard: {
    title: string;
    subtitle: string;
    discoverLeads: string;
    askAi: string;
    totalLeads: string;
    contacted: string;
    replies: string;
    meetings: string;
    customers: string;
    pipelineValue: string;
    remindersTitle: string;
    remindersSubtitle: string;
    remindersDue: string;
    viewAllPipeline: string;
    conversionVelocity: string;
    conversionSubtitle: string;
    conversionRate: string;
    avgDealValue: string;
    askAiConversion: string;
    recentLeadsTitle: string;
    recentLeadsSubtitle: string;
    viewAllLeads: string;
    outreachBtn: string;
    stages: {
      discovered: string;
      contacted: string;
      replies: string;
      meetings: string;
      won: string;
    };
  };
  leads: {
    title: string;
    subtitle: string;
    addNew: string;
    searchPlaceholder: string;
    allIndustries: string;
    allStages: string;
    allOpportunities: string;
    sortScore: string;
    sortRating: string;
    sortValue: string;
    sortNewest: string;
    noLeads: string;
    noLeadsDesc: string;
    hasWhatsapp: string;
    noWhatsapp: string;
    hasEmail: string;
    noEmail: string;
    outreach: string;
    audit: string;
  };
  leadDetail: {
    tabs: {
      profile: string;
      audit: string;
      outreach: string;
      tasks: string;
      history: string;
    };
    contactChannels: string;
    website: string;
    email: string;
    phone: string;
    whatsappSupport: string;
    observations: string;
    inspectAudit: string;
    generateOutreach: string;
    auditPromptTitle: string;
    auditPromptDesc: string;
    startAuditBtn: string;
    auditing: string;
    auditDate: string;
    reaudit: string;
    mobileUx: string;
    pageSpeed: string;
    seoHealth: string;
    recommendedOffer: string;
    strengths: string;
    weaknesses: string;
    missedOpp: string;
    generatePitchFromAudit: string;
    channel: string;
    tone: string;
    language: string;
    serviceToPitch: string;
    callToAction: string;
    writingPitch: string;
    generateMessageBtn: string;
    readyToSend: string;
    emailSubject: string;
    messageBody: string;
    copyClipboard: string;
    markSentAdvance: string;
    scheduleReminder: string;
    reminderPlaceholder: string;
    addReminderBtn: string;
    scheduledTasks: string;
    noTasks: string;
    auditHistory: string;
    noHistory: string;
  };
  discovery: {
    title: string;
    subtitle: string;
    bannerTitle: string;
    bannerDesc: string;
    criteriaTitle: string;
    resetExample: string;
    country: string;
    city: string;
    industry: string;
    minRating: string;
    websiteQuality: string;
    minScore: string;
    hasWhatsapp: string;
    hasEmail: string;
    hasSocial: string;
    findBtn: string;
    searching: string;
    resultsTitle: string;
    resultsSubtitle: string;
    noResults: string;
    noResultsDesc: string;
    saveLead: string;
    saveAndAudit: string;
    inCrm: string;
    qualities: {
      all: string;
      weak: string;
      average: string;
      good: string;
    };
  };
  pipeline: {
    title: string;
    subtitle: string;
    activePipeline: string;
    dropHere: string;
    prev: string;
    next: string;
    outreach: string;
    stages: {
      NEW: string;
      QUALIFIED: string;
      CONTACTED: string;
      REPLIED: string;
      MEETING: string;
      PROPOSAL: string;
      WON: string;
      LOST: string;
    };
  };
  settings: {
    title: string;
    subtitle: string;
    tabs: {
      profile: string;
      billing: string;
      integrations: string;
      export: string;
    };
    editSetup: string;
    targetIndustries: string;
    servicesOffered: string;
    preferredLanguage: string;
    monthlyTarget: string;
    icp: string;
    signedInAs: string;
    rlsActive: string;
    subscriptionTier: string;
    subDesc: string;
    changeTier: string;
    leadsUsed: string;
    renewsIn: string;
    integrationsTitle: string;
    integrationsSubtitle: string;
    smtpTitle: string;
    smtpDesc: string;
    waTitle: string;
    waDesc: string;
    googleTitle: string;
    googleDesc: string;
    connect: string;
    connected: string;
    exportTitle: string;
    exportSubtitle: string;
    exportCardTitle: string;
    exportCardDesc: string;
    exportBtn: string;
  };
  aiAssistant: {
    title: string;
    liveCrmSync: string;
    subtitle: string;
    welcomeMsg: (agencyName: string) => string;
    placeholder: string;
    askBtn: string;
    auditing: string;
    quickPrompts: string[];
  };
  billingModal: {
    title: string;
    subtitle: string;
    currentPlan: string;
    leadsUsed: string;
    auditsCompleted: string;
    mostPopular: string;
    active: string;
    updating: string;
    switchTo: (name: string) => string;
    current: string;
    footerNote: string;
    cancelAnytime: string;
  };
  onboardingModal: {
    titleEdit: string;
    titleWelcome: string;
    subtitle: string;
    businessName: string;
    businessType: string;
    homeCountry: string;
    outreachLang: string;
    targetIndustries: string;
    servicesOffered: string;
    icpLabel: string;
    icpHelp: string;
    monthlyTarget: string;
    leadsPerMonth: string;
    syncNote: string;
    saveBtn: string;
  };
  addLeadModal: {
    title: string;
    subtitle: string;
    companyName: string;
    industry: string;
    city: string;
    website: string;
    email: string;
    phone: string;
    rating: string;
    reviews: string;
    dealValue: string;
    hasWhatsapp: string;
    notes: string;
    runAuditImmediately: string;
    cancel: string;
    saveProspect: string;
    saving: string;
  };
}

export const translations: Record<Language, Translations> = {
  tr: {
    common: {
      appName: 'LeadPilot',
      tagline: 'Yapay Zeka B2B Aday Üretimi & CRM',
      save: 'Kaydet',
      cancel: 'İptal',
      delete: 'Sil',
      edit: 'Düzenle',
      add: 'Ekle',
      close: 'Kapat',
      loading: 'Yükleniyor...',
      search: 'Ara...',
      filter: 'Filtrele',
      all: 'Tümü',
      actions: 'İşlemler',
      demoData: 'DEMO VERİ',
      high: 'YÜKSEK',
      medium: 'ORTA',
      low: 'DÜŞÜK',
      opportunity: 'FIRSAT',
      leadScore: 'Aday Skoru',
      websiteScore: 'Web Sitesi Skoru',
      digitalPresence: 'Dijital Varlık',
      estValue: 'Tahmini Değer',
      copied: 'Kopyalandı!',
      copy: 'Kopyala',
      send: 'Gönder',
      regenerate: 'Yeniden Üret',
      markAsSent: 'Gönderildi Olarak İşaretle',
      alreadySent: 'Daha Önce Gönderildi',
      stage: 'Aşama',
      notes: 'Notlar',
      status: 'Durum',
      online: 'ÇEVRİMİÇİ',
      manage: 'Yönet',
      clearFilters: 'Filtreleri Sıfırla',
    },
    nav: {
      dashboard: 'Kontrol Paneli',
      leads: 'Aday Havuzu',
      discovery: 'Aday Bul',
      pipeline: 'Satış Hunisi',
      settings: 'Ayarlar',
      aiStrategist: 'AI Stratejist',
      addLead: 'Aday Ekle',
      findLeadsPlaceholder: 'Şirket, şehir veya sektör ara...',
      editIcp: 'ICP Düzenle',
    },
    dashboard: {
      title: 'Satış & Aday İstihbarat Paneli',
      subtitle: 'sektörlerindeki işletmelere yönelik yapay zeka destekli müşteri kazanımı.',
      discoverLeads: 'Yeni Aday Keşfet',
      askAi: 'AI Satış Asistanı',
      totalLeads: 'TOPLAM ADAY',
      contacted: 'İLETİŞİME GEÇİLEN',
      replies: 'ALINAN YANIT',
      meetings: 'TOPLANTILAR',
      customers: 'KAZANILAN MÜŞTERİ',
      pipelineValue: 'HUNİ DEĞERİ',
      remindersTitle: 'Takip & Hatırlatıcılar',
      remindersSubtitle: 'Bugün iletişim kurulması gereken öncelikli potansiyel müşteriler.',
      remindersDue: 'Günü Gelen',
      viewAllPipeline: 'Tüm Görevleri Satış Hunisinde Gör',
      conversionVelocity: 'Satış Dönüşüm Hızı',
      conversionSubtitle: 'İlk keşiften imzalanan sözleşmeye kadar adayların dönüşüm performansı.',
      conversionRate: 'Dönüşüm Oranı',
      avgDealValue: 'Ortalama Sözleşme Değeri',
      askAiConversion: 'Yapay zekaya dönüşümleri sorma',
      recentLeadsTitle: 'Yüksek Fırsatlı Son Adaylar',
      recentLeadsSubtitle: 'Yapay zeka web sitesi denetim skoruna göre en yüksek satın alma potansiyeline sahip firmalar.',
      viewAllLeads: 'Tüm Adayları İncele',
      outreachBtn: 'İletişim Kur',
      stages: {
        discovered: '1. Keşfedilen Adaylar',
        contacted: '2. Yapay Zeka ile İletişim',
        replies: '3. Olumlu Yanıtlar',
        meetings: '4. Strateji Toplantısı',
        won: '5. Kazanılan Müşteriler',
      },
    },
    leads: {
      title: 'Aday İstihbarat CRM',
      subtitle: 'hedef sektörlerinizde takip edilen doğrulanmış B2B adaylar',
      addNew: '+ Yeni Aday Ekle',
      searchPlaceholder: 'Firma adı, sektör, şehir veya denetim anahtar kelimeleriyle arayın...',
      allIndustries: 'Tüm Sektörler',
      allStages: 'Tüm Aşamalar',
      allOpportunities: 'Tüm Fırsat Düzeyleri',
      sortScore: 'Sırala: Aday Skoru',
      sortRating: 'Sırala: Google Puanı',
      sortValue: 'Sırala: Anlaşma Değeri',
      sortNewest: 'Sırala: En Yeni',
      noLeads: 'Filtrelere uygun aday bulunamadı',
      noLeadsDesc: 'Arama kelimenizi veya filtrelerinizi değiştirin ya da doğrudan yeni aday kaydedin.',
      hasWhatsapp: 'WhatsApp Var',
      noWhatsapp: 'WhatsApp Yok',
      hasEmail: 'E-posta Var',
      noEmail: 'E-posta Yok',
      outreach: 'İletişim Kur',
      audit: 'AI Denetimi',
    },
    leadDetail: {
      tabs: {
        profile: 'Genel Bakış & İletişim',
        audit: 'AI Web Sitesi Denetimi',
        outreach: 'Kişiselleştirilmiş Mesaj',
        tasks: 'Takip & Hatırlatıcılar',
        history: 'Aktivite Geçmişi',
      },
      contactChannels: 'İletişim & Dijital Kanallar',
      website: 'Web Sitesi',
      email: 'E-posta',
      phone: 'Telefon Numarası',
      whatsappSupport: 'WhatsApp Desteği',
      observations: 'Önemli Denetim Notları & Fırsat Alanları',
      inspectAudit: 'Yapay Zeka Web Denetimini İncele',
      generateOutreach: 'Kişisel AI Satış Mesajı Üret',
      auditPromptTitle: 'Yapay Zeka Web Sitesi & Dönüşüm Denetimi Başlat',
      auditPromptDesc: 'Gemini yapay zeka motoru firmanın mobil uyumluluğunu, sayfa hızını, WhatsApp eksikliğini ve satabileceğiniz yüksek gelirli hizmetleri inceler.',
      startAuditBtn: 'Hemen AI Denetimi Yap',
      auditing: 'Web sitesi verileri ve dönüşüm kaçakları analiz ediliyor...',
      auditDate: 'tarihinde denetlendi',
      reaudit: 'Yeniden Denetle',
      mobileUx: 'Mobil Deneyim',
      pageSpeed: 'Sayfa Hızı',
      seoHealth: 'SEO Sağlığı',
      recommendedOffer: 'Satılması Önerilen Yüksek Katma Değerli Hizmet',
      strengths: 'Güçlü Yönler (İltifat Olarak Kullan)',
      weaknesses: 'Dönüşüm Kaçakları & Zayıf Noktalar',
      missedOpp: 'Kaçırılan Ciro & Müşteri Fırsatları',
      generatePitchFromAudit: 'Bu Denetime Dayalı Kişisel Mesaj Oluştur',
      channel: 'Gönderim Kanalı',
      tone: 'Mesaj Tonu',
      language: 'Mesaj Dili',
      serviceToPitch: 'Pazarlanacak Hizmet',
      callToAction: 'Eylem Çağrısı (CTA)',
      writingPitch: 'Kişiselleştirilmiş satış mesajı hazırlanıyor...',
      generateMessageBtn: 'Satış Mesajı Oluştur',
      readyToSend: 'GÖNDERİME HAZIR',
      emailSubject: 'E-posta Konu Başlığı',
      messageBody: 'Mesaj Metni',
      copyClipboard: 'Panoya Kopyala',
      markSentAdvance: 'Gönderildi Olarak İşaretle & İlerlet',
      scheduleReminder: 'Sonraki Temas / Hatırlatıcı Planla',
      reminderPlaceholder: 'Örn: Gönderilen WhatsApp video teklifinin izlenip izlenmediğini sor...',
      addReminderBtn: 'Hatırlatıcı Ekle',
      scheduledTasks: 'Planlanan Görevler',
      noTasks: 'Bu aday için henüz planlanmış takip bulunmuyor.',
      auditHistory: 'Denetim & Satış Geçmişi',
      noHistory: 'Henüz aktivite kaydı bulunmuyor.',
    },
    discovery: {
      title: 'Yüksek Niyetli B2B Adaylar Keşfet',
      subtitle: 'Google puanı yüksek ancak web sitesi zayıf veya WhatsApp otomasyonu olmayan işletmeleri bulun.',
      bannerTitle: 'Harici Veri Sağlayıcı Katmanı Aktif',
      bannerDesc: 'Aşağıdaki tüm veriler DEMO VERİ olarak etiketlenmiştir. Sistem canlı Google Places API, Outscraper veya Hunter bağlantılarına tamamen hazırdır.',
      criteriaTitle: 'Aday Arama Kriterleri',
      resetExample: 'Örnek Aramayı Yükle',
      country: 'Ülke',
      city: 'Şehir / Bölge',
      industry: 'Hedef Sektör',
      minRating: 'Min. Google Puanı',
      websiteQuality: 'Web Sitesi Kalitesi',
      minScore: 'Min. Aday Skoru',
      hasWhatsapp: 'WhatsApp Olsun',
      hasEmail: 'E-posta Olsun',
      hasSocial: 'Sosyal Medya Olsun',
      findBtn: 'Nitelikli Adayları Bul',
      searching: 'Veri sağlayıcı taranıyor...',
      resultsTitle: 'Keşfedilen Firma Adayları',
      resultsSubtitle: 'Satın alma potansiyeline ve aday skoruna göre sıralandı',
      noResults: 'Bu kriterlerle eşleşen aday bulunamadı',
      noResultsDesc: 'Şehir veya puan filtrenizi genişleterek tekrar deneyin.',
      saveLead: 'CRM\'e Kaydet',
      saveAndAudit: 'Kaydet & AI Analizi Yap',
      inCrm: 'CRM\'de Mevcut',
      qualities: {
        all: 'Tüm Kaliteler',
        weak: 'Zayıf / Eski (Büyük Fırsat)',
        average: 'Orta / Yenilenmeli',
        good: 'İyi / Optimize Edilebilir',
      },
    },
    pipeline: {
      title: 'Satış Hunisi (Kanban)',
      subtitle: 'Adayları ilk denetimden sözleşme aşamasına kadar sürükleyin ve ilerletin.',
      activePipeline: 'Aktif Huni:',
      dropHere: 'Adayları bu aşamaya taşıyın',
      prev: 'Geri',
      next: 'İleri',
      outreach: 'İletişim',
      stages: {
        NEW: 'Yeni Adaylar',
        QUALIFIED: 'Nitelikli',
        CONTACTED: 'İletişime Geçildi',
        REPLIED: 'Yanıt Alındı',
        MEETING: 'Toplantı',
        PROPOSAL: 'Teklif Aşaması',
        WON: 'Kazanılan Anlaşma',
        LOST: 'Kaybedildi',
      },
    },
    settings: {
      title: 'Ayarlar & Çalışma Alanı',
      subtitle: 'Ajans profilinizi, ideal müşteri profilinizi (ICP), abonelikleri ve entegrasyonları yönetin.',
      tabs: {
        profile: 'Ajans & ICP Profili',
        billing: 'Plan & Faturalandırma',
        integrations: 'İletişim Entegrasyonları',
        export: 'Veri Dışa Aktar',
      },
      editSetup: 'Ajans Bilgilerini Düzenle',
      targetIndustries: 'Hedef Sektörler',
      servicesOffered: 'Sunulan Hizmetler',
      preferredLanguage: 'Tercih Edilen Dil',
      monthlyTarget: 'Aylık Aday Hedefi',
      icp: 'İdeal Müşteri Profili (ICP)',
      signedInAs: 'Oturum açan kullanıcı:',
      rlsActive: 'Çok kiracılı (RLS) veri güvenliği aktif',
      subscriptionTier: 'Abonelik Paketi',
      subDesc: 'Stripe ve RevenueCat altyapısına hazır SaaS abonelik modeli.',
      changeTier: 'Paketi Değiştir',
      leadsUsed: 'Aday Kullanıldı',
      renewsIn: 'Dönem yenilenmesine 24 gün kaldı. Yapay zeka web denetim kotası:',
      integrationsTitle: 'İletişim & Gönderim Entegrasyonları',
      integrationsSubtitle: 'Tek tıkla otomatik erişim sağlamak için kanallarınızı bağlayın.',
      smtpTitle: 'Özel E-posta / SMTP',
      smtpDesc: 'Özel alan adınız üzerinden kişiselleştirilmiş soğuk e-postalar gönderin.',
      waTitle: 'WhatsApp Business Cloud API',
      waDesc: 'Anlık WhatsApp mesajları ve AI yanıtlayıcı botlar çalıştırın.',
      googleTitle: 'Google Takvim & Kişiler',
      googleDesc: 'Toplantı rezervasyonlarını ve görev hatırlatıcılarını senkronize edin.',
      connect: 'Bağla',
      connected: '✓ Bağlandı',
      exportTitle: 'CRM Verilerini Dışa Aktar',
      exportSubtitle: 'Tüm aday listenizi, denetim puanlarını ve notları harici araçlar için indirin.',
      exportCardTitle: 'Adaylar & Denetim Geçmişi (CSV)',
      exportCardDesc: 'dışa aktarmaya hazır aday kaydı.',
      exportBtn: 'CSV Olarak İndir',
    },
    aiAssistant: {
      title: 'LeadPilot AI Satış Stratejisti',
      liveCrmSync: 'CANLI CRM SENKRONİZASYONU',
      subtitle: 'Mevcut CRM verilerinize, huni durumunuza ve denetim skorlarınıza dayalı tavsiyeler.',
      welcomeMsg: (agency) => `Merhaba! Ben **${agency}** için **LeadPilot AI Satış Stratejistinizim**.\n\nMevcut CRM veritabanınıza, aktif satış aşamalarınıza ve web sitesi denetim skorlarınıza doğrudan erişimim var. Bugün satışlarınızı nasıl hızlandırabilirim?`,
      placeholder: 'Adaylarınız, takipleriniz veya satış stratejiniz hakkında bir soru sorun...',
      askBtn: 'Sor',
      auditing: 'CRM verileri inceleniyor ve stratejik öneri üretiliyor...',
      quickPrompts: [
        'En sıcak adaylarımı listele.',
        'Bugün kiminle iletişime geçmeliyim?',
        'Manchester Roof Services neden iyi bir potansiyel?',
        'En iyi hangi sektör dönüşüm sağlıyor?',
        'Diş klinikleri için hangi teklif açısı en etkilidir?',
      ],
    },
    billingModal: {
      title: 'Abonelik & Kullanım Planları',
      subtitle: 'Stripe & RevenueCat altyapısına hazır esnek kademe sistemi',
      currentPlan: 'Mevcut Plan:',
      leadsUsed: 'aday kullanıldı',
      auditsCompleted: 'yapay zeka denetimi tamamlandı',
      mostPopular: 'En Popüler',
      active: 'Aktif',
      updating: 'Güncelleniyor...',
      switchTo: (name) => `${name} Paketine Geç`,
      current: 'Mevcut Plan',
      footerNote: 'Stripe Checkout ve Müşteri Paneli entegrasyonuna hazır mimari',
      cancelAnytime: 'İstediğiniz zaman iptal edebilir veya yükseltebilirsiniz',
    },
    onboardingModal: {
      titleEdit: 'Ajans & ICP Ayarları',
      titleWelcome: 'LeadPilot AI\'a Hoş Geldiniz',
      subtitle: 'Yapay zeka mesajlarını ve aday puanlamasını kişiselleştirmek için ajansınızı yapılandırın',
      businessName: 'İşletme / Ajans Adı',
      businessType: 'İşletme Türü',
      homeCountry: 'Ana Ülke',
      outreachLang: 'Tercih Edilen İletişim Dili',
      targetIndustries: 'Hedef Sektörler (Nişler)',
      servicesOffered: 'Sunulan Hizmetler',
      icpLabel: 'İdeal Müşteri Profili (ICP) & Strateji Açısı',
      icpHelp: 'Gemini bu verileri adayları puanlarken ve soğuk satış mesajları hazırlarken referans alır.',
      monthlyTarget: 'Aylık Aday Hedefi',
      leadsPerMonth: 'aday / ay',
      syncNote: 'Ajans profili CRM aday skorlaması ile senkronize çalışır',
      saveBtn: 'Profili Kaydet',
    },
    addLeadModal: {
      title: 'CRM\'e Yeni Aday Ekle',
      subtitle: 'Takip ve yapay zeka denetimi başlatmak için şirket bilgilerini girin',
      companyName: 'Firma Adı *',
      industry: 'Sektör',
      city: 'Şehir / Konum',
      website: 'Web Sitesi URL',
      email: 'E-posta',
      phone: 'Telefon',
      rating: 'Google Puanı',
      reviews: 'Yorum Sayısı',
      dealValue: 'Anlaşma Değeri ($)',
      hasWhatsapp: 'WhatsApp İş Numarası Var',
      notes: 'Dahili Notlar & Gözlemler',
      runAuditImmediately: 'Hemen Yapay Zeka Dijital Varlık Denetimi Başlat',
      cancel: 'İptal',
      saveProspect: 'Adayı Kaydet',
      saving: 'Kaydediliyor...',
    },
  },
  en: {
    common: {
      appName: 'LeadPilot',
      tagline: 'AI B2B Lead Intelligence & CRM',
      save: 'Save',
      cancel: 'Cancel',
      delete: 'Delete',
      edit: 'Edit',
      add: 'Add',
      close: 'Close',
      loading: 'Loading...',
      search: 'Search...',
      filter: 'Filter',
      all: 'All',
      actions: 'Actions',
      demoData: 'DEMO DATA',
      high: 'HIGH',
      medium: 'MEDIUM',
      low: 'LOW',
      opportunity: 'OPPORTUNITY',
      leadScore: 'Lead Score',
      websiteScore: 'Website Score',
      digitalPresence: 'Digital Presence',
      estValue: 'Est. Deal Value',
      copied: 'Copied!',
      copy: 'Copy',
      send: 'Send',
      regenerate: 'Regenerate',
      markAsSent: 'Mark as Sent & Advance',
      alreadySent: 'Already Sent',
      stage: 'Stage',
      notes: 'Notes',
      status: 'Status',
      online: 'ONLINE',
      manage: 'Manage',
      clearFilters: 'Clear Filters',
    },
    nav: {
      dashboard: 'Dashboard',
      leads: 'Leads CRM',
      discovery: 'Find Leads',
      pipeline: 'Sales Pipeline',
      settings: 'Settings',
      aiStrategist: 'AI Strategist',
      addLead: 'Add Lead',
      findLeadsPlaceholder: 'Search companies, cities or industries...',
      editIcp: 'Edit ICP',
    },
    dashboard: {
      title: 'Sales & Intelligence Dashboard',
      subtitle: 'Targeting high-ticket local businesses with AI-powered personalized outreach.',
      discoverLeads: 'Discover Leads',
      askAi: 'Ask AI Sales Bot',
      totalLeads: 'TOTAL LEADS',
      contacted: 'CONTACTED',
      replies: 'REPLIES',
      meetings: 'MEETINGS',
      customers: 'CUSTOMERS',
      pipelineValue: 'PIPELINE',
      remindersTitle: 'Follow-up Reminders',
      remindersSubtitle: 'High-priority prospects awaiting a scheduled response touchpoint today.',
      remindersDue: 'Due Today',
      viewAllPipeline: 'View All Tasks in Pipeline',
      conversionVelocity: 'Sales Conversion Velocity',
      conversionSubtitle: 'Tracking prospect movement from discovery to closed-won retainers.',
      conversionRate: 'Conversion Rate',
      avgDealValue: 'Average Deal Value',
      askAiConversion: 'Ask AI how to boost conversions',
      recentLeadsTitle: 'Recent High-Opportunity Leads',
      recentLeadsSubtitle: 'Highest buying potential based on Gemini website audit scores.',
      viewAllLeads: 'View All Leads',
      outreachBtn: 'Outreach',
      stages: {
        discovered: '1. Discovered Leads',
        contacted: '2. Contacted via AI Outreach',
        replies: '3. Positive Replies',
        meetings: '4. Strategy Meetings',
        won: '5. Retainer Clients Won',
      },
    },
    leads: {
      title: 'Prospect Intelligence CRM',
      subtitle: 'active B2B leads tracked across your target niches',
      addNew: '+ Add New Lead',
      searchPlaceholder: 'Search by company name, industry, city, or audit keywords...',
      allIndustries: 'All Industries',
      allStages: 'All Stages',
      allOpportunities: 'All Opportunities',
      sortScore: 'Sort: Lead Score',
      sortRating: 'Sort: Google Rating',
      sortValue: 'Sort: Deal Value',
      sortNewest: 'Sort: Newest',
      noLeads: 'No prospects match your filters',
      noLeadsDesc: 'Try resetting your search query or discovery filters, or add new prospects directly.',
      hasWhatsapp: 'Has WhatsApp',
      noWhatsapp: 'No WA',
      hasEmail: 'Has Email',
      noEmail: 'No Email',
      outreach: 'Outreach',
      audit: 'AI Audit',
    },
    leadDetail: {
      tabs: {
        profile: 'Overview & Profile',
        audit: 'AI Website Audit',
        outreach: 'AI Outreach Copy',
        tasks: 'Follow-ups & Tasks',
        history: 'Activity Timeline',
      },
      contactChannels: 'Contact & Digital Channels',
      website: 'Website',
      email: 'Email',
      phone: 'Phone Number',
      whatsappSupport: 'WhatsApp Support',
      observations: 'Lead Observations & Audit Highlights',
      inspectAudit: 'Inspect AI Website Audit',
      generateOutreach: 'Generate AI Outreach Message',
      auditPromptTitle: 'Run AI Website Intelligence Audit',
      auditPromptDesc: 'Our Gemini intelligence engine analyzes website mobile experience, page speed, CTA friction, WhatsApp availability, and pinpoints exact services to sell.',
      startAuditBtn: 'Start AI Audit Now',
      auditing: 'Auditing website assets & conversion funnels...',
      auditDate: 'Audited on',
      reaudit: 'Re-audit',
      mobileUx: 'Mobile UX',
      pageSpeed: 'Page Speed',
      seoHealth: 'SEO Health',
      recommendedOffer: 'Recommended High-Ticket Offer to Sell',
      strengths: 'Strengths (Compliment in Outreach)',
      weaknesses: 'Conversion Friction & Leaks',
      missedOpp: 'Missed Revenue Opportunities',
      generatePitchFromAudit: 'Generate Personalized Outreach Based on This Audit',
      channel: 'Channel',
      tone: 'Tone',
      language: 'Language',
      serviceToPitch: 'Service to Pitch',
      callToAction: 'Call to Action (CTA)',
      writingPitch: 'Writing hyper-personalized pitch...',
      generateMessageBtn: 'Generate Message',
      readyToSend: 'READY TO SEND',
      emailSubject: 'Email Subject',
      messageBody: 'Message Body',
      copyClipboard: 'Copy to Clipboard',
      markSentAdvance: 'Mark as Sent & Advance Stage',
      scheduleReminder: 'Schedule Next Touchpoint / Reminder',
      reminderPlaceholder: 'e.g. Check if Dave reviewed the WhatsApp quote video...',
      addReminderBtn: 'Add Reminder',
      scheduledTasks: 'Scheduled Tasks',
      noTasks: 'No follow-ups scheduled for this lead.',
      auditHistory: 'Audit & Pipeline History',
      noHistory: 'No activity recorded yet.',
    },
    discovery: {
      title: 'Find High-Intent Business Leads',
      subtitle: 'Discover local businesses with stellar reputations but high-friction digital presence ready for services.',
      bannerTitle: 'External Provider Architecture Active',
      bannerDesc: 'All records below are explicitly labeled as DEMO DATA. Ready for live Google Places API, Outscraper, or Hunter connections.',
      criteriaTitle: 'Lead Discovery Criteria',
      resetExample: 'Reset to Example Search',
      country: 'Country',
      city: 'City / Metro',
      industry: 'Target Industry',
      minRating: 'Min. Google Rating',
      websiteQuality: 'Website Quality',
      minScore: 'Min. Lead Score',
      hasWhatsapp: 'Has WhatsApp',
      hasEmail: 'Has Email',
      hasSocial: 'Has Social',
      findBtn: 'Find Qualified Leads',
      searching: 'Querying Lead Provider...',
      resultsTitle: 'Discovered Prospects',
      resultsSubtitle: 'Sorted by buying potential & lead score',
      noResults: 'No leads match these exact filters',
      noResultsDesc: 'Broaden your city or rating parameters to explore more prospects.',
      saveLead: 'Save Lead',
      saveAndAudit: 'Save & AI Audit',
      inCrm: 'In CRM',
      qualities: {
        all: 'Any Quality',
        weak: 'Weak / Outdated (High Opportunity)',
        average: 'Average / Needs Modernization',
        good: 'Good / Needs Optimization',
      },
    },
    pipeline: {
      title: 'Sales Pipeline Kanban',
      subtitle: 'Drag, tap or advance prospects through stages from initial audit to closed retainer.',
      activePipeline: 'Active Pipeline:',
      dropHere: 'Drop prospects here',
      prev: 'Prev',
      next: 'Next',
      outreach: 'Outreach',
      stages: {
        NEW: 'New Leads',
        QUALIFIED: 'Qualified',
        CONTACTED: 'Contacted',
        REPLIED: 'Replied',
        MEETING: 'Meeting',
        PROPOSAL: 'Proposal',
        WON: 'Won Deals',
        LOST: 'Lost',
      },
    },
    settings: {
      title: 'Settings & Workspace Hub',
      subtitle: 'Manage your agency configuration, team access, billing tiers, and integrations.',
      tabs: {
        profile: 'Agency & ICP Profile',
        billing: 'Billing & Subscription',
        integrations: 'Channel Integrations',
        export: 'Data Export & Backup',
      },
      editSetup: 'Edit Agency Setup',
      targetIndustries: 'Target Industries',
      servicesOffered: 'Services Offered',
      preferredLanguage: 'Preferred Language',
      monthlyTarget: 'Monthly Target',
      icp: 'Ideal Customer Profile (ICP)',
      signedInAs: 'Signed in as',
      rlsActive: 'Multi-tenant RLS active',
      subscriptionTier: 'Subscription Tier',
      subDesc: 'SaaS subscription model prepared for Stripe & RevenueCat.',
      changeTier: 'Change Tier',
      leadsUsed: 'Leads Used',
      renewsIn: 'Cycle renews in 24 days. AI website audit quota:',
      integrationsTitle: 'Channel & Communication Integrations',
      integrationsSubtitle: 'Connect sending channels for 1-click automated outreach dispatch.',
      smtpTitle: 'Custom Email / SMTP',
      smtpDesc: 'Send personalized cold emails directly through your custom domain.',
      waTitle: 'WhatsApp Business Cloud API',
      waDesc: 'Dispatch instant WhatsApp messages and AI conversational bots.',
      googleTitle: 'Google Calendar & Contacts',
      googleDesc: 'Sync meeting bookings and contact timeline reminders.',
      connect: 'Connect',
      connected: '✓ Connected',
      exportTitle: 'Export CRM Data',
      exportSubtitle: 'Download your full leads dataset, audit scores, and notes for external tools.',
      exportCardTitle: 'Leads & Audit History (CSV)',
      exportCardDesc: 'prospect records ready for export.',
      exportBtn: 'Export CSV',
    },
    aiAssistant: {
      title: 'LeadPilot AI Sales Strategist',
      liveCrmSync: 'LIVE CRM SYNC',
      subtitle: 'Grounded in your real CRM pipeline, audit scores & active prospects',
      welcomeMsg: (agency) => `Hello! I am your **LeadPilot AI Sales Strategist** for **${agency}**.\n\nI have direct access to your current CRM database, live pipeline stages, and lead audit metrics. How can I help accelerate your sales today?`,
      placeholder: 'Ask anything about your leads, follow-ups or strategy...',
      askBtn: 'Ask',
      auditing: 'Auditing CRM data and generating strategic recommendation...',
      quickPrompts: [
        'Find my hottest leads.',
        'Which leads should I contact today?',
        'Why is Manchester Roof Services a good prospect?',
        'Which industry is converting best?',
        'What outreach angle works best for dental clinics?',
      ],
    },
    billingModal: {
      title: 'Subscription & Usage Plans',
      subtitle: 'Stripe & RevenueCat billing-ready architecture with seamless tier switching',
      currentPlan: 'Current Plan:',
      leadsUsed: 'leads used',
      auditsCompleted: 'audits completed',
      mostPopular: 'Most Popular',
      active: 'Active',
      updating: 'Updating...',
      switchTo: (name) => `Switch to ${name}`,
      current: 'Current Plan',
      footerNote: 'Ready for Stripe Checkout / Customer Portal integration',
      cancelAnytime: 'Cancel or upgrade anytime',
    },
    onboardingModal: {
      titleEdit: 'Agency & ICP Settings',
      titleWelcome: 'Welcome to LeadPilot AI',
      subtitle: 'Configure your agency profile to personalize AI outreach & lead scoring',
      businessName: 'Business Name',
      businessType: 'Business Type',
      homeCountry: 'Home Country',
      outreachLang: 'Preferred Outreach Language',
      targetIndustries: 'Target Industries (Niches)',
      servicesOffered: 'Services Offered',
      icpLabel: 'Ideal Customer Profile (ICP) & Angle',
      icpHelp: 'Used by Gemini to evaluate lead scoring and highlight relevant conversion angles in cold outreach.',
      monthlyTarget: 'Monthly Lead Target',
      leadsPerMonth: 'leads / month',
      syncNote: 'Agency profile syncs with CRM lead scoring',
      saveBtn: 'Save Profile',
    },
    addLeadModal: {
      title: 'Add New Prospect to CRM',
      subtitle: 'Enter company details to start tracking and AI analysis',
      companyName: 'Company Name *',
      industry: 'Industry',
      city: 'City / Location',
      website: 'Website URL',
      email: 'Email',
      phone: 'Phone',
      rating: 'Google Rating',
      reviews: 'Reviews',
      dealValue: 'Deal Value ($)',
      hasWhatsapp: 'Has WhatsApp Business Number',
      notes: 'Internal Notes',
      runAuditImmediately: 'Run AI Digital Presence Audit Immediately',
      cancel: 'Cancel',
      saveProspect: 'Save Prospect',
      saving: 'Saving...',
    },
  },
  de: {
    // German fallback map
    ...({} as any)
  },
  es: {
    // Spanish fallback map
    ...({} as any)
  }
};

// Fill de and es with en as baseline
translations.de = { ...translations.en };
translations.es = { ...translations.en };
