import { defineConfig } from 'astro/config';
import icon from 'astro-icon';
import svelte from '@astrojs/svelte';
import sitemap from '@astrojs/sitemap';

import { locales, defaultLocale, localesAsObject } from './src/i18n';

// https://astro.build/config
export default defineConfig({
  integrations: [
    svelte(),
    icon(),
    sitemap({
      i18n: {
        defaultLocale: defaultLocale,
        locales: localesAsObject,
      },
    }),
  ],
  site: 'https://chaoli.io',
  i18n: {
    locales: locales,
    defaultLocale: defaultLocale,
  },
});
