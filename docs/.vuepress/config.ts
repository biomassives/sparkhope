import { defineUserConfig } from "vuepress";
import { webpackBundler } from "@vuepress/bundler-webpack";
import { hopeTheme } from "vuepress-theme-hope";

// keep your existing navbar/sidebar files
import { enNavbar, nlNavbar, arNavbar } from "./navbar.js";
import { enSidebar, nlSidebar, arSidebar } from "./sidebar.js";

// official plugins
import { searchPlugin } from "@vuepress/plugin-search";
import { sitemapPlugin } from "@vuepress/plugin-sitemap";
import { feedPlugin } from "@vuepress/plugin-feed";
import { pwaPlugin } from "@vuepress/plugin-pwa";

export default defineUserConfig({
  // bundler
  bundler: webpackBundler(),

  base: "/",
  lang: "en-US",
  title: "Biodiversity Token Transparency",
  description: "Documentation for biodiversity token standards and practices.",

  head: [
    // PWA manifest & icons (add these files to /public)
    ["link", { rel: "manifest", href: "/manifest.webmanifest" }],
    ["meta", { name: "theme-color", content: "#0ea5e9" }],
    ["link", { rel: "icon", href: "/icons/icon-192.png", sizes: "192x192" }],
    ["link", { rel: "apple-touch-icon", href: "/icons/icon-512.png" }],
  ],

  theme: hopeTheme({
    hostname: "https://<your-pages-domain>",

    // shows a repo link in the navbar (GitLab URL is fine)
    repo: "https://gitlab.com/<group>/<repo>",
    docsDir: "docs",

    logo: "/logo.svg",
    author: { name: "Your Name/Organization" },

    // Nice learning features
    plugins: {
      // built-in md enhancements you’ll use in workshops
      mdEnhance: {
        tabs: true,
        codetabs: true,
        align: true,
        tasklist: true,
        mark: true,
        mermaid: true,     // diagrams in lessons
        footnote: true,
        figure: true,
        demo: true,        // inline code demos if you want
      },
      icon: { assets: "fontawesome-with-brands" },
      blog: true,         // enables blog features if you want posts/updates
    },

    // i18n
    locales: {
      "/": {
        lang: "en-US",
        title: "Biodiversity Tokens",
        navbar: enNavbar,
        sidebar: enSidebar,
      },
      "/nl/": {
        lang: "nl-NL",
        title: "Biodiversiteit Tokens",
        navbar: nlNavbar,
        sidebar: nlSidebar,
      },
      "/ar/": {
        lang: "ar-SA",
        title: "توكنز التنوع البيولوجي",
        // Hope handles RTL styling; keep your content RTL-friendly
        navbar: arNavbar,
        sidebar: arSidebar,
      },
    },
  }),

  // official VuePress plugins go here (one search option at a time)
  plugins: [
    // Local client-side search (simple, no external service)
    searchPlugin({
      locales: {
        "/":   { placeholder: "Search docs" },
        "/nl/":{ placeholder: "Zoeken" },
        "/ar/":{ placeholder: "ابحث" },
      },
      // Example: exclude drafts folder if you have one
      // isSearchable: (page) => !page.filePathRelative?.includes("drafts/"),
    }),

    // Sitemap for SEO / discovery
    sitemapPlugin({
      hostname: "https://<your-pages-domain>",
    }),

    // Feeds: announce new posts or events (RSS + JSON)
    feedPlugin({
      hostname: "https://<your-pages-domain>",
      feeds: { rss: true, atom: false, json: true },
      // Only include pages marked as posts or events
      filter: ({ frontmatter }) =>
        frontmatter.type === "post" || frontmatter.event === true,
    }),

    // PWA for offline reading during workshops
    pwaPlugin({
      cacheHTML: true,
      maxSize: 2048, // KB per asset cache limit
      // update popup uses the theme’s defaults; can customize if you like
    }),
  ],
});

