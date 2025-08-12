import { hasGlobalComponent } from "/home/anc/vuepress_mealworm/mealwor/node_modules/.pnpm/@vuepress+helper@2.0.0-rc.112_vuepress@2.0.0-rc.24_@vuepress+bundler-webpack@2.0.0-rc.24_vue@3.5.18_/node_modules/@vuepress/helper/lib/client/index.js";
import { useScriptTag } from "/home/anc/vuepress_mealworm/mealwor/node_modules/.pnpm/@vueuse+core@13.6.0_vue@3.5.18/node_modules/@vueuse/core/index.mjs";
import { h } from "vue";
import { VPIcon } from "/home/anc/vuepress_mealworm/mealwor/node_modules/.pnpm/@vuepress+plugin-icon@2.0.0-rc.112_markdown-it@14.1.0_vuepress@2.0.0-rc.24_@vuepress+bu_d3f55a519a6d117f5d0d95e44965e070/node_modules/@vuepress/plugin-icon/lib/client/index.js"

export default {
  enhance: ({ app }) => {
    if(!hasGlobalComponent("VPIcon")) {
      app.component(
        "VPIcon",
        (props) =>
          h(VPIcon, {
            type: "fontawesome",
            prefix: "",
            ...props,
          })
      )
    }
  },
  setup: () => {
    useScriptTag(
  `https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6/js/all.min.js`,
  () => {},
  { attrs: { "data-auto-replace-svg": "nest" } }
);

  },
}
