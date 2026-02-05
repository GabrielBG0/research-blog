// @ts-check

import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

import vercel from "@astrojs/vercel";

// 1. IMPORT THE MATH PLUGINS
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import {
  transformerMetaHighlight,
  transformerNotationDiff,
} from "@shikijs/transformers";

// https://astro.build/config
export default defineConfig({
  site: "https://example.com",
  integrations: [mdx(), sitemap(), react()],

  vite: {
    plugins: [tailwindcss()],
  },

  adapter: vercel(),

  // 2. ADD THIS MARKDOWN CONFIGURATION
  markdown: {
    // 1. Keep your Math plugins
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],

    // 2. Add this NEW Shiki configuration
    shikiConfig: {
      // Choose a theme: 'dracula', 'github-dark', 'night-owl', etc.
      theme: "synthwave-84",
      // Prevents horizontal scrolling on mobile
      wrap: true,
      transformers: [
        transformerMetaHighlight(),
        transformerNotationDiff(),
      ],
    },
  },
});
