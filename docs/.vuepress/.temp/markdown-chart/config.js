import { defineClientConfig } from "vuepress/client";
import Mermaid from "/home/anc/vuepress_mealworm/sparkhope/node_modules/@vuepress/plugin-markdown-chart/lib/client/components/Mermaid.js";

export default defineClientConfig({
  enhance: ({ app }) => {
    app.component("Mermaid", Mermaid);
  },
});
