// src/middleware/index.ts
import type { MiddlewareHandler } from 'astro';

const SUPPORTED_LOCALES = ['en', 'nl', 'ar', 'sw', 'hi', 'fa', 'ta'];
const DEFAULT_LOCALE = 'en';

// Map of language codes to supported locales
const LANGUAGE_MAP: Record<string, string> = {
  // English
  'en': 'en',
  'en-US': 'en',
  'en-GB': 'en',
  'en-CA': 'en',
  'en-AU': 'en',
  'en-IN': 'en',
  
  // Dutch
  'nl': 'nl',
  'nl-NL': 'nl',
  'nl-BE': 'nl',
  
  // Arabic
  'ar': 'ar',
  'ar-SA': 'ar',
  'ar-AE': 'ar',
  'ar-EG': 'ar',
  'ar-MA': 'ar',
  'ar-DZ': 'ar',
  'ar-TN': 'ar',
  'ar-LY': 'ar',
  'ar-JO': 'ar',
  'ar-SY': 'ar',
  'ar-IQ': 'ar',
  'ar-KW': 'ar',
  'ar-BH': 'ar',
  'ar-QA': 'ar',
  'ar-OM': 'ar',
  'ar-YE': 'ar',
  'ar-LB': 'ar',
  'ar-PS': 'ar',
  
  // Swahili
  'sw': 'sw',
  'sw-KE': 'sw',
  'sw-TZ': 'sw',
  'sw-UG': 'sw',
  'sw-CD': 'sw',
  
  // Hindi
  'hi': 'hi',
  'hi-IN': 'hi',
  
  // Farsi/Persian
  'fa': 'fa',
  'fa-IR': 'fa',
  'fa-AF': 'fa',
  
  // Tamil
  'ta': 'ta',
  'ta-IN': 'ta',
  'ta-LK': 'ta',
  'ta-SG': 'ta',
  'ta-MY': 'ta',
};

export const onRequest: MiddlewareHandler = async (context, next) => {
  const { pathname } = context.url;
  const { request } = context;
  
  // Skip if already has locale prefix
  const hasLocalePrefix = SUPPORTED_LOCALES.some(
    locale => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );
  
  if (hasLocalePrefix) {
    return next();
  }
  
  // Only redirect from root path
  if (pathname !== '/' && pathname !== '') {
    return next();
  }
  
  // Check for stored preference in cookie
  const cookies = context.cookies;
  const storedLocale = cookies.get('preferred-locale')?.value;
  
  if (storedLocale && SUPPORTED_LOCALES.includes(storedLocale)) {
    return context.redirect(`/${storedLocale}/`);
  }
  
  // Parse Accept-Language header
  const acceptLanguage = request.headers.get('accept-language') || '';
  const browserLocale = detectBrowserLocale(acceptLanguage);
  
  // Redirect to detected locale if not default
  if (browserLocale && browserLocale !== DEFAULT_LOCALE) {
    // Set cookie for future visits
    cookies.set('preferred-locale', browserLocale, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365, // 1 year
      httpOnly: true,
      sameSite: 'lax',
    });
    return context.redirect(`/${browserLocale}/`);
  }
  
  return next();
};

function detectBrowserLocale(acceptLanguage: string): string | null {
  // Parse Accept-Language header (e.g., "en-US,en;q=0.9,nl;q=0.8")
  const languages = acceptLanguage
    .split(',')
    .map(lang => {
      const [code, q = '1'] = lang.trim().split(';q=');
      return {
        code: code.toLowerCase(),
        quality: parseFloat(q.replace('q=', '')),
      };
    })
    .sort((a, b) => b.quality - a.quality);
  
  // Find first matching supported locale
  for (const { code } of languages) {
    // Try exact match
    if (LANGUAGE_MAP[code]) {
      return LANGUAGE_MAP[code];
    }
    
    // Try language code without region
    const langCode = code.split('-')[0];
    if (LANGUAGE_MAP[langCode]) {
      return LANGUAGE_MAP[langCode];
    }
  }
  
  return null;
}
