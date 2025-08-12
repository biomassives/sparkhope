import comp from "/home/anc/vuepress/docs/.vuepress/.temp/pages/standards/index.html.vue"
const data = JSON.parse("{\"path\":\"/standards/\",\"title\":\"Project Standards\",\"lang\":\"en-US\",\"frontmatter\":{\"description\":\"Project Standards\",\"head\":[[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"Project Standards\\\",\\\"image\\\":[\\\"\\\"],\\\"dateModified\\\":null,\\\"author\\\":[{\\\"@type\\\":\\\"Person\\\",\\\"name\\\":\\\"Your Name/Organization\\\"}]}\"],[\"meta\",{\"property\":\"og:url\",\"content\":\"https://your-domain.com/standards/\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"Biodiversity Token Transparency\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"Project Standards\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"Project Standards\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"en-US\"}]]},\"readingTime\":{\"minutes\":0.01,\"words\":2},\"filePathRelative\":\"standards/README.md\",\"excerpt\":\"\\n\",\"autoDesc\":true}")
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
