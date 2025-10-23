export interface TranslationKeys {
  // Navigation
  'nav.home': string;
  'nav.campaigns': string;
  'nav.about': string;
  'nav.donate': string;
  
  // Hero
  'hero.title': string;
  'hero.subtitle': string;
  'hero.cta': string;
  
  // Campaign
  'campaign.raised': string;
  'campaign.goal': string;
  'campaign.backers': string;
  'campaign.daysLeft': string;
  'campaign.donate': string;
  
  // Common
  'common.loading': string;
  'common.error': string;
  'common.readMore': string;
  'common.shareNow': string;
}

export type Locale = 'en' | 'es' | 'fr' | 'pt';

export interface LocaleConfig {
  code: Locale;
  name: string;
  flag: string;
  direction: 'ltr' | 'rtl';
}
