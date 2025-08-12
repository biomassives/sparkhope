import { Layout, NotFound, injectDarkMode, setupDarkMode, setupSidebarItems, scrollPromise } from "/home/anc/vuepress/node_modules/.pnpm/vuepress-theme-hope@2.0.0-rc.94_markdown-it@14.1.0_sass-loader@16.0.5_sass@1.90.0_webpa_b2a7228a3ab266733d9a79ae6d91e153/node_modules/vuepress-theme-hope/lib/bundle/exports/base.js";

import { defineCatalogInfoGetter } from "/home/anc/vuepress/node_modules/.pnpm/@vuepress+plugin-catalog@2.0.0-rc.112_vuepress@2.0.0-rc.24_@vuepress+bundler-webpack@2.0.0-rc.24_vue@3.5.18_/node_modules/@vuepress/plugin-catalog/lib/client/index.js"
import { h } from "vue"
import { resolveComponent } from "vue"
import { Blog, BloggerInfo, SocialMedias, setupBlog } from "/home/anc/vuepress/node_modules/.pnpm/vuepress-theme-hope@2.0.0-rc.94_markdown-it@14.1.0_sass-loader@16.0.5_sass@1.90.0_webpa_b2a7228a3ab266733d9a79ae6d91e153/node_modules/vuepress-theme-hope/lib/bundle/exports/blog.js";
import "/home/anc/vuepress/node_modules/.pnpm/vuepress-theme-hope@2.0.0-rc.94_markdown-it@14.1.0_sass-loader@16.0.5_sass@1.90.0_webpa_b2a7228a3ab266733d9a79ae6d91e153/node_modules/vuepress-theme-hope/lib/bundle/styles/blog/bundle.scss";

import "/home/anc/vuepress/node_modules/.pnpm/@vuepress+helper@2.0.0-rc.112_vuepress@2.0.0-rc.24_@vuepress+bundler-webpack@2.0.0-rc.24_vue@3.5.18_/node_modules/@vuepress/helper/lib/client/styles/colors.css";
import "/home/anc/vuepress/node_modules/.pnpm/@vuepress+helper@2.0.0-rc.112_vuepress@2.0.0-rc.24_@vuepress+bundler-webpack@2.0.0-rc.24_vue@3.5.18_/node_modules/@vuepress/helper/lib/client/styles/normalize.css";
import "/home/anc/vuepress/node_modules/.pnpm/@vuepress+helper@2.0.0-rc.112_vuepress@2.0.0-rc.24_@vuepress+bundler-webpack@2.0.0-rc.24_vue@3.5.18_/node_modules/@vuepress/helper/lib/client/styles/sr-only.css";
import "/home/anc/vuepress/node_modules/.pnpm/vuepress-theme-hope@2.0.0-rc.94_markdown-it@14.1.0_sass-loader@16.0.5_sass@1.90.0_webpa_b2a7228a3ab266733d9a79ae6d91e153/node_modules/vuepress-theme-hope/lib/bundle/styles/bundle.scss";

defineCatalogInfoGetter((meta) => {
  const title = meta.title;
  const shouldIndex = meta.index ?? true;
  const icon = meta.icon;

  return shouldIndex ? {
    title,
    content: icon ? () =>[h(resolveComponent("VPIcon"), { icon, sizing: "both" }), title] : null,
    order: meta.order,
    index: meta.index,
  } : null;
});

export default {
  enhance: ({ app, router }) => {
    const { scrollBehavior } = router.options;

    router.options.scrollBehavior = async (...args) => {
      await scrollPromise.wait();

      return scrollBehavior(...args);
    };

    // inject global properties
    injectDarkMode(app);

    app.component("BloggerInfo", BloggerInfo);
    app.component("SocialMedias", SocialMedias);
  },
  setup: () => {
    setupDarkMode();
    setupSidebarItems();
    setupBlog();
  },
  layouts: {
    Layout,
    NotFound,
    Blog,
  }
};
