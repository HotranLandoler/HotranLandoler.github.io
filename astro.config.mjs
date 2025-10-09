import { defineConfig } from 'astro/config';
import icon from 'astro-icon';
import svelte from '@astrojs/svelte';
import sitemap from '@astrojs/sitemap';

import tailwind from '@astrojs/tailwind';
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
    tailwind({
      applyBaseStyles: false,
    }),
  ],
  site: 'https://chaoli.io',
  scopedStyleStrategy: 'class',
  i18n: {
    locales: locales,
    defaultLocale: defaultLocale,
  },
});
