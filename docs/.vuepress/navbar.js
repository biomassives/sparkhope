import { navbar } from "vuepress-theme-hope";

export const enNavbar = navbar([
  "/",
  { text: "Guide", icon: "lightbulb", link: "/guide/" },
  { text: "Standards", icon: "book", link: "/standards/" },
]);

export const nlNavbar = navbar([
  "/nl/",
  { text: "Gids", icon: "lightbulb", link: "/nl/gids/" },
  { text: "Standaarden", icon: "book", link: "/nl/standaarden/" },
]);

// ADD THE ARABIC NAVBAR
export const arNavbar = navbar([
  "/ar/",
  { text: "الدليل", icon: "lightbulb", link: "/ar/guide/" },
  { text: "المعايير", icon: "book", link: "/ar/standards/" },
]);
