import { hasGlobalComponent } from "/home/anc/vuepress/node_modules/.pnpm/@vuepress+helper@2.0.0-rc.112_vuepress@2.0.0-rc.24_@vuepress+bundler-webpack@2.0.0-rc.24_vue@3.5.18_/node_modules/@vuepress/helper/lib/client/index.js";
import Badge from "/home/anc/vuepress/node_modules/.pnpm/vuepress-plugin-components@2.0.0-rc.94_sass-loader@16.0.5_sass@1.90.0_webpack@5.101.0___338e38a6c73096a655d43f7d684a4105/node_modules/vuepress-plugin-components/lib/client/components/Badge.js";

import "/home/anc/vuepress/node_modules/.pnpm/@vuepress+helper@2.0.0-rc.112_vuepress@2.0.0-rc.24_@vuepress+bundler-webpack@2.0.0-rc.24_vue@3.5.18_/node_modules/@vuepress/helper/lib/client/styles/sr-only.css";

export default {
  enhance: ({ app }) => {
    if(!hasGlobalComponent("Badge")) app.component("Badge", Badge);
    
  },
  setup: () => {

  },
  rootComponents: [

  ],
};
