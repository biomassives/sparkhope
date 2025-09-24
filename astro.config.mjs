import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { loadEnv } from 'vite';

const { SITE_URL } = loadEnv(import.meta.env.MODE, process.cwd(), '');

export default defineConfig({
  site: SITE_URL || 'https://sparkhope.space',
  
  integrations: [
    starlight({
      title: 'SparkHope',
      description: 'Food Security Documentation and Resources',
      
      // Language configuration - 7 languages for global reach!
      defaultLocale: 'en',
      locales: {
        en: {
          label: 'English',
          lang: 'en-US',
        },
        nl: {
          label: 'Nederlands',
          lang: 'nl-NL',
        },
        ar: {
          label: 'العربية',
          lang: 'ar-SA',
          dir: 'rtl',
        },
        sw: {
          label: 'Kiswahili',
          lang: 'sw-KE',
        },
        hi: {
          label: 'हिन्दी',
          lang: 'hi-IN',
        },
        fa: {
          label: 'فارسی',
          lang: 'fa-IR',
          dir: 'rtl',
        },
        ta: {
          label: 'தமிழ்',
          lang: 'ta-IN',
        },
      },
      social: [
	{ icon: 'github', label: 'Github', href: 'https://github.com/biomassives/sparkhope', project: 'Astro Starlight GPL Documentation Engine'},
	{ icon: 'external', label: 'iNaturalist', href: 'https://naturalist.org/projects/spark-hope-food-security', project: 'Spark Hope Food Security' },
	{ icon: 'document', label: 'Mushroom Observer', href: 'https://mushroomobserver.org/projects/386', project: 'Mycelial cake from liquid culture of p. ostreatis and p. pulminarius' },
      ],

      // UI customization
      customCss: [
        './src/styles/custom.css',
        './src/styles/rtl-overrides.css',
      ],
      
      // Search configuration with locale filtering
      pagefind: true,
      
      // Sidebar configuration with translations for all 7 languages
      sidebar: [
        {
          label: 'Guide',
          translations: {
            nl: 'Gids',
            ar: 'دليل',
            sw: 'Mwongozo',
            hi: 'गाइड',
            fa: 'راهنما',
            ta: 'வழிகாட்டி',
          },
          autogenerate: { directory: 'guide' },
        },
        {
          label: 'Events',
          translations: {
            nl: 'Evenementen',
            ar: 'الأحداث',
            sw: 'Matukio',
            hi: 'कार्यक्रम',
            fa: 'رویدادها',
            ta: 'நிகழ்வுகள்',
          },
          autogenerate: { directory: 'events' },
        },
        {
          label: 'Resources',
          translations: {
            nl: 'Bronnen',
            ar: 'الموارد',
            sw: 'Rasilimali',
            hi: 'संसाधन',
            fa: 'منابع',
            ta: 'வளங்கள்',
          },
          autogenerate: { directory: 'resources' },
        },
      ],
      
      // Theme configuration
      expressiveCode: {
        themes: ['dracula', 'github-light'],
        styleOverrides: {
          borderRadius: '0.5rem',
        },
      },
      
      // Enable last updated timestamps
      lastUpdated: true,
      
      // Edit link configuration
      editLink: {
        baseUrl: 'https://github.com/biomassives/sparkhope/edit/main/',
      },
    }),
  ],
  
  // Vite configuration for better dev experience
  vite: {
    ssr: {
      noExternal: ['@astrojs/starlight'],
    },
  },
  
  // Output configuration
  output: 'static',
  
  // Build optimization
  build: {
    inlineStylesheets: 'auto',
  },
});
