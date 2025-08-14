export const siteData = JSON.parse("{\"base\":\"/\",\"lang\":\"en-US\",\"title\":\"Biodiversity Token Transparency\",\"description\":\"Documentation for biodiversity token standards and practices.\",\"head\":[[\"link\",{\"rel\":\"manifest\",\"href\":\"/manifest.webmanifest\"}],[\"meta\",{\"name\":\"theme-color\",\"content\":\"#0ea5e9\"}],[\"link\",{\"rel\":\"icon\",\"href\":\"/icons/icon-192.png\",\"sizes\":\"192x192\"}],[\"link\",{\"rel\":\"apple-touch-icon\",\"href\":\"/icons/icon-512.png\"}],[\"meta\",{\"name\":\"author\",\"content\":\"Spark Hope\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"Spark Hope\"}],[\"link\",{\"rel\":\"canonical\",\"href\":\"https://sparkhope.vercel.app\"}]],\"locales\":{}}")

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateSiteData) {
    __VUE_HMR_RUNTIME__.updateSiteData(siteData)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ siteData }) => {
    __VUE_HMR_RUNTIME__.updateSiteData(siteData)
  })
}
