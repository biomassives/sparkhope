import comp from "/home/anc/vuepress_mealworm/mealwor/docs/.vuepress/.temp/pages/guide/index.html.vue"
const data = JSON.parse("{\"path\":\"/guide/\",\"title\":\"The Guide\",\"lang\":\"en-US\",\"frontmatter\":{\"description\":\"The Guide\",\"head\":[[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"The Guide\\\",\\\"image\\\":[\\\"\\\"],\\\"dateModified\\\":null,\\\"author\\\":[{\\\"@type\\\":\\\"Person\\\",\\\"name\\\":\\\"Your Name/Organization\\\"}]}\"],[\"meta\",{\"property\":\"og:url\",\"content\":\"https://your-domain.com/guide/\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"Biodiversity Token Transparency\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"The Guide\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"The Guide\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"en-US\"}]]},\"readingTime\":{\"minutes\":0.01,\"words\":2},\"filePathRelative\":\"guide/README.md\",\"excerpt\":\"\\n\",\"autoDesc\":true}")
export { comp, data }

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
