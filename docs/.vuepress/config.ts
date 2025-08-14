import { defineUserConfig } from 'vuepress'
import { webpackBundler } from '@vuepress/bundler-webpack'
import { hopeTheme } from 'vuepress-theme-hope'
import { enNavbar, nlNavbar, arNavbar } from './navbar.js'
import { enSidebar, nlSidebar, arSidebar } from './sidebar.js'

const HOSTNAME = 'https://sparkhope.vercel.app'

export default defineUserConfig({
  bundler: webpackBundler(),
  base: '/',
  lang: 'en-US',
  title: 'Biodiversity Token Transparency',
  description: 'Documentation for biodiversity token standards and practices.',
  shouldPrefetch: false,
  head: [
    ['link', { rel: 'manifest', href: '/manifest.webmanifest' }],
    ['meta', { name: 'theme-color', content: '#0ea5e9' }],
    ['link', { rel: 'icon', href: '/icons/icon-192.png', sizes: '192x192' }],
    ['link', { rel: 'apple-touch-icon', href: '/icons/icon-512.png' }],
    ['meta', { name: 'author', content: 'Spark Hope' }],
    ['meta', { property: 'og:site_name', content: 'Spark Hope' }],
    ['link', { rel: 'canonical', href: HOSTNAME }],
  ],
  theme: hopeTheme({
    hostname: HOSTNAME,
    repo: 'https://github.com/biomassives/sparkhope',
    docsDir: 'docs',
    logo: '/logo.svg',
    author: { name: 'Spark Hope' },
    markdown: {
      tabs: true, codeTabs: true, align: true, tasklist: true,
      mark: true, mermaid: true, footnote: true, figure: true, demo: true,
    },
    plugins: {
      search: {
        locales: {
          '/': { placeholder: 'Search docs' },
          '/nl/': { placeholder: 'Zoeken' },
          '/ar/': { placeholder: 'ابحث' },
        },
        filter: (item) => {
          const currentLang = window.location.pathname.split('/')[1]; // Get current language from URL
          
          // Handle the case for English (root path)
          if (currentLang === '') {
            return item.path === '/'; // Show only the root path for English
          }
          
          // For other languages, check if the item path starts with the current language prefix
          return item.path.startsWith(`/${currentLang}`) || item.path === `/${currentLang}/`;
        },
      },
      catalog: {},
      icon: { assets: 'fontawesome-with-brands' },
      blog: true,
      feed: {
        hostname: HOSTNAME,
        rss: true,
        json: true,
        atom: false,
        count: 50,
        filter: ({ frontmatter }) =>
          frontmatter.type === 'post' || frontmatter.event === true,
        channel: {
          title: 'Spark Hope: Updates & Events',
          description: 'News, posts, and event announcements for Spark Hope.',
          icon: '/icons/icon-192.png',
          link: HOSTNAME,
          language: 'en-US',
          author: { name: 'Spark Hope' },
          copyright: `© ${new Date().getFullYear()} Spark Hope`,
        },
      },
    },
    locales: {
      '/':   { lang: 'en-US', title: 'Spark Hope', navbar: enNavbar, sidebar: enSidebar },
      '/nl/':{ lang: 'nl-NL', title: 'Biodiversiteit Tokens', navbar: nlNavbar, sidebar: nlSidebar },
      '/ar/':{ lang: 'ar-SA',  title: 'توكنز التنوع البيولوجي', navbar: arNavbar, sidebar: arSidebar },
    },
  }),
  plugins: [],
})

