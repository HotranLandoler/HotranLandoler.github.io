import { defineConfig } from "astro/config";
import astroI18next from "astro-i18next";

import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  integrations: [astroI18next(), svelte()],
  site: "https://HotranLandoler.github.io",
  scopedStyleStrategy: "class",
});
