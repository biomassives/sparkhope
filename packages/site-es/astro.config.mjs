import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://es.sparkhope.org',
  integrations: [
    starlight({
      title: 'Laboratorio SparkHope',
      defaultLocale: 'es',
      locales: {
        es: {
          label: 'Español',
          lang: 'es',
        },
      },
      customCss: [
        '@sparkhope/core/botanical-theme.css',
      ],
      sidebar: [
        {
          label: 'Documentación',
          autogenerate: { directory: 'guias' },
        },
        {
          label: 'Protocolos',
          autogenerate: { directory: 'protocolos' },
        },
        {
          label: 'Referencia',
          autogenerate: { directory: 'referencia' },
        },
      ],
      social: {
        github: 'https://github.com/yourusername/sparkhope',
      },
    }),
  ],
});
