import { defineConfig } from "astro/config";
import astroI18next from "astro-i18next";
import icon from "astro-icon";
import svelte from "@astrojs/svelte";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  integrations: [
    astroI18next(),
    svelte(),
    icon(),
    sitemap({
      i18n: {
        defaultLocale: "zh", // 所有不包含 `es` 或 `fr` 的链接都将被视为默认语言环境，即 `en`
        locales: {
          zh: "zh", // `defaultLocale` 的值必须在 `locales` 键中存在
          en: "en",
        },
      },
    }),
  ],
  site: "https://chaoli.io",
  scopedStyleStrategy: "class",
});
