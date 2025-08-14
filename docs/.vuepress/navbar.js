import { navbar } from "vuepress-theme-hope";

export const enNavbar = navbar([
  "/",
   {
    text: 'Languages',
    items: [
      { text: 'English', link: '/' },
      { text: 'Nederlands', link: '/nl/' },
      { text: 'العربية', link: '/ar/' },
    ],
  },
  { text: "Guide", icon: "lightbulb", link: "/guide/" },
  { text: "Standards", icon: "book", link: "/standards/" },
]);

export const nlNavbar = navbar([
  "/nl/",
  {
    text: 'Talen',
    items: [
      { text: 'English', link: '/' },
      { text: 'Nederlands', link: '/nl/' },
      { text: 'العربية', link: '/ar/' },
    ],
  },
  { text: "Gids", icon: "lightbulb", link: "/nl/gids/" },
  { text: "Standaarden", icon: "book", link: "/nl/standaarden/" },
]);

// ADD THE ARABIC NAVBAR
export const arNavbar = navbar([
  "/ar/",
  {
    text: 'اللغات',
    items: [
      { text: 'English', link: '/' },
      { text: 'Nederlands', link: '/nl/' },
      { text: 'العربية', link: '/ar/' },
    ],
  }, 
  { text: "الدليل", icon: "lightbulb", link: "/ar/guide/" },
  { text: "المعايير", icon: "book", link: "/ar/standards/" },
]);
