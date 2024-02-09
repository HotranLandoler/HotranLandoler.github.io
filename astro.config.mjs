import { defineConfig } from "astro/config";
import astroI18next from "astro-i18next";
import icon from "astro-icon";

import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  integrations: [astroI18next(), svelte(), icon()],
  site: "https://HotranLandoler.github.io",
  scopedStyleStrategy: "class",
});
