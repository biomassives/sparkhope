import { sidebar } from "vuepress-theme-hope";

export const enSidebar = sidebar({
    "/guide/": "structure",
    "/standards/": "structure",
});

export const nlSidebar = sidebar({
    "/nl/gids/": "structure",
    "/nl/standaarden/": "structure",
});

// ADD THE ARABIC SIDEBAR
export const arSidebar = sidebar({
    "/ar/guide/": "structure",
    "/ar/standards/": "structure",
});
