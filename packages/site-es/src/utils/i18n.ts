import type { TranslationKeys, Locale } from '../types/i18n';
import translations from '../data/translations.json';

export class I18nManager {
  private locale: Locale;
  private translations: Record<string, TranslationKeys>;

  constructor(locale: Locale = 'es') {
    this.locale = locale;
    this.translations = translations;
  }

  t(key: keyof TranslationKeys, params?: Record<string, string>): string {
    let text = this.translations[this.locale]?.[key] || key;
    
    if (params) {
      Object.entries(params).forEach(([param, value]) => {
        text = text.replace(`{${param}}`, value);
      });
    }
    
    return text;
  }

  setLocale(locale: Locale): void {
    this.locale = locale;
  }

  getLocale(): Locale {
    return this.locale;
  }

  formatCurrency(amount: number): string {
    const formats = {
      en: { currency: 'USD', locale: 'en-US' },
      es: { currency: 'USD', locale: 'es-ES' },
      fr: { currency: 'EUR', locale: 'fr-FR' },
      pt: { currency: 'BRL', locale: 'pt-BR' }
    };

    const format = formats[this.locale];
    return new Intl.NumberFormat(format.locale, {
      style: 'currency',
      currency: format.currency
    }).format(amount);
  }

  formatDate(date: Date): string {
    const locales = {
      en: 'en-US',
      es: 'es-ES',
      fr: 'fr-FR',
      pt: 'pt-BR'
    };

    return new Intl.DateTimeFormat(locales[this.locale], {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  }
}

export const i18n = new I18nManager('es');
