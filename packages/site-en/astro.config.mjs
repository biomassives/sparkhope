import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://sparkhope.org',
  integrations: [
    starlight({
      title: 'SparkHope Laboratory',
      defaultLocale: 'en',
      locales: {
        en: {
          label: 'English',
          lang: 'en',
        },
      },
      customCss: [
        '@sparkhope/core/botanical-theme.css',
      ],
      sidebar: [
        {
          label: 'Documentation',
          autogenerate: { directory: 'guides' },
        },
        {
          label: 'Protocols',
          autogenerate: { directory: 'protocols' },
        },
        {
          label: 'Reference',
          autogenerate: { directory: 'reference' },
        },
      ],
      social: {
        github: 'https://github.com/yourusername/sparkhope',
      },
    }),
  ],
});
