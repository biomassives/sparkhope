export const redirects = JSON.parse("{}")

export const routes = Object.fromEntries([
  ["/ar/", { loader: () => import(/* webpackChunkName: "ar_index.html" */"/home/anc/vuepress/docs/.vuepress/.temp/pages/ar/index.html.js"), meta: {"excerpt":"\n","title":"أهلاً بكم في توثيق توكنز التنوع البيولوجي","type":"article"} }],
  ["/nl/", { loader: () => import(/* webpackChunkName: "nl_index.html" */"/home/anc/vuepress/docs/.vuepress/.temp/pages/nl/index.html.js"), meta: {"excerpt":"\n","readingTime":{"minutes":0,"words":1},"title":"Welkom!","type":"article"} }],
  ["/guide/", { loader: () => import(/* webpackChunkName: "guide_index.html" */"/home/anc/vuepress/docs/.vuepress/.temp/pages/guide/index.html.js"), meta: {"excerpt":"\n","readingTime":{"minutes":0.01,"words":2},"title":"The Guide","type":"article"} }],
  ["/standards/", { loader: () => import(/* webpackChunkName: "standards_index.html" */"/home/anc/vuepress/docs/.vuepress/.temp/pages/standards/index.html.js"), meta: {"excerpt":"\n","readingTime":{"minutes":0.01,"words":2},"title":"Project Standards","type":"article"} }],
  ["/ar/guide/", { loader: () => import(/* webpackChunkName: "ar_guide_index.html" */"/home/anc/vuepress/docs/.vuepress/.temp/pages/ar/guide/index.html.js"), meta: {"excerpt":"\n","title":"مقدمة الدليل","type":"article"} }],
  ["/ar/standards/off-chain.html", { loader: () => import(/* webpackChunkName: "ar_standards_off-chain.html" */"/home/anc/vuepress/docs/.vuepress/.temp/pages/ar/standards/off-chain.html.js"), meta: {"excerpt":"\n","title":"بيانات خارج السلسلة","type":"article"} }],
  ["/ar/standards/on-chain.html", { loader: () => import(/* webpackChunkName: "ar_standards_on-chain.html" */"/home/anc/vuepress/docs/.vuepress/.temp/pages/ar/standards/on-chain.html.js"), meta: {"excerpt":"\n","title":"معايير على السلسلة","type":"article"} }],
  ["/nl/gids/", { loader: () => import(/* webpackChunkName: "nl_gids_index.html" */"/home/anc/vuepress/docs/.vuepress/.temp/pages/nl/gids/index.html.js"), meta: {"excerpt":"\n","readingTime":{"minutes":0.01,"words":2},"title":"Gids Introductie","type":"article"} }],
  ["/nl/standaarden/", { loader: () => import(/* webpackChunkName: "nl_standaarden_index.html" */"/home/anc/vuepress/docs/.vuepress/.temp/pages/nl/standaarden/index.html.js"), meta: {"excerpt":"\n","readingTime":{"minutes":0.01,"words":2},"title":"Onze Standaarden","type":"article"} }],
  ["/404.html", { loader: () => import(/* webpackChunkName: "404.html" */"/home/anc/vuepress/docs/.vuepress/.temp/pages/404.html.js"), meta: {"title":""} }],
  ["/", { loader: () => import(/* webpackChunkName: "index.html" */"/home/anc/vuepress/docs/.vuepress/.temp/pages/index.html.js"), meta: {"title":""} }],
  ["/ar/standards/", { loader: () => import(/* webpackChunkName: "ar_standards_index.html" */"/home/anc/vuepress/docs/.vuepress/.temp/pages/ar/standards/index.html.js"), meta: {"title":"Standards"} }],
  ["/category/", { loader: () => import(/* webpackChunkName: "category_index.html" */"/home/anc/vuepress/docs/.vuepress/.temp/pages/category/index.html.js"), meta: {"title":"Category","index":false} }],
  ["/tag/", { loader: () => import(/* webpackChunkName: "tag_index.html" */"/home/anc/vuepress/docs/.vuepress/.temp/pages/tag/index.html.js"), meta: {"title":"Tag","index":false} }],
  ["/article/", { loader: () => import(/* webpackChunkName: "article_index.html" */"/home/anc/vuepress/docs/.vuepress/.temp/pages/article/index.html.js"), meta: {"title":"Articles","index":false} }],
  ["/star/", { loader: () => import(/* webpackChunkName: "star_index.html" */"/home/anc/vuepress/docs/.vuepress/.temp/pages/star/index.html.js"), meta: {"title":"Star","index":false} }],
  ["/timeline/", { loader: () => import(/* webpackChunkName: "timeline_index.html" */"/home/anc/vuepress/docs/.vuepress/.temp/pages/timeline/index.html.js"), meta: {"title":"Timeline","index":false} }],
]);

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateRoutes) {
    __VUE_HMR_RUNTIME__.updateRoutes(routes)
  }
  if (__VUE_HMR_RUNTIME__.updateRedirects) {
    __VUE_HMR_RUNTIME__.updateRedirects(redirects)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ routes, redirects }) => {
    __VUE_HMR_RUNTIME__.updateRoutes(routes)
    __VUE_HMR_RUNTIME__.updateRedirects(redirects)
  })
}
