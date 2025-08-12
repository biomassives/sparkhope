import { hopeTheme } from "vuepress-theme-hope";
import { webpackBundler } from "@vuepress/bundler-webpack";
import { enNavbar, nlNavbar, arNavbar } from "./navbar.js";
import { enSidebar, nlSidebar, arSidebar } from "./sidebar.js";

export default {
  // Using the Webpack bundler
  bundler: webpackBundler(),

  base: "/",
  lang: 'en-US',
  title: 'Biodiversity Token Transparency',
  description: 'Documentation for biodiversity token standards and practices.',

  theme: hopeTheme({
    hostname: "https://your-domain.com",
    author: { name: "Your Name/Organization" },
    logo: "/logo.svg",
    repo: "your-github-org/your-repo",
    docsDir: "docs",
    plugins: {
      mdEnhance: { align: true, codeTabs: true, tabs: true },
      icon: { assets: "fontawesome-with-brands" },
      blog: true,
    },
    locales: {
      "/": { lang: "en-US", title: "Biodiversity Tokens", navbar: enNavbar, sidebar: enSidebar, },
      "/nl/": { lang: "nl-NL", title: "Biodiversiteit Tokens", navbar: nlNavbar, sidebar: nlSidebar, },
      "/ar/": { lang: "ar-SA", title: "توكنز التنوع البيولوجي", direction: "rtl", navbar: arNavbar, sidebar: arSidebar, },
    },
  }),
};
