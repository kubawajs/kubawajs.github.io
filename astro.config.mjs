import { defineConfig } from "astro/config";
import image from "@astrojs/image";
import partytown from "@astrojs/partytown";
import compress from "astro-compress";
import sitemap from "@astrojs/sitemap";
import robotsTxt from "astro-robots-txt";

const domainUrl = "https://www.wajs-dev.net";

// https://astro.build/config
export default defineConfig({
  site: domainUrl,
  integrations: [
    image(),
    compress(),
    partytown({
      config: {
        forward: ["dataLayer.push"],
      },
    }),
    sitemap({
      filter: (page) => page.toLowerCase().indexOf(`${domainUrl}/work`) === -1,
    }),
    robotsTxt({
      sitemap: `${domainUrl}/sitemap-index.xml`,
      policy: [
        {
          userAgent: '*',
          disallow: ["/work", "/work/*"],
        },
      ],
    }),
  ],
});
