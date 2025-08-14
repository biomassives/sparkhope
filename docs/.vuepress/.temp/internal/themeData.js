export const themeData = JSON.parse("{\"encrypt\":{},\"repo\":\"https://github.com/biomassives/sparkhope\",\"docsDir\":\"docs\",\"logo\":\"/logo.svg\",\"author\":{\"name\":\"Spark Hope\"},\"locales\":{\"/\":{\"lang\":\"en-US\",\"navbarLocales\":{\"langName\":\"English\",\"selectLangAriaLabel\":\"Select language\"},\"metaLocales\":{\"author\":\"Author\",\"date\":\"Writing Date\",\"origin\":\"Original\",\"views\":\"Page views\",\"category\":\"Category\",\"tag\":\"Tag\",\"readingTime\":\"Reading Time\",\"words\":\"Words\",\"toc\":\"On This Page\",\"prev\":\"Prev\",\"next\":\"Next\",\"contributors\":\"Contributors\",\"editLink\":\"Edit this page\",\"print\":\"Print\"},\"blogLocales\":{\"article\":\"Articles\",\"articleList\":\"Article List\",\"category\":\"Category\",\"tag\":\"Tag\",\"timeline\":\"Timeline\",\"timelineTitle\":\"Yesterday Once More!\",\"all\":\"All\",\"intro\":\"Personal Intro\",\"star\":\"Star\",\"empty\":\"No $text\"},\"paginationLocales\":{\"prev\":\"Prev\",\"next\":\"Next\",\"navigate\":\"Jump to\",\"action\":\"Go\",\"errorText\":\"Please enter a number between 1 and $page !\"},\"outlookLocales\":{\"themeColor\":\"Theme Color\",\"darkmode\":\"Theme Mode\",\"fullscreen\":\"Full Screen\"},\"routerLocales\":{\"skipToContent\":\"Skip to main content\",\"notFoundTitle\":\"Page not found\",\"notFoundMsg\":[\"There’s nothing here.\",\"How did we get here?\",\"That’s a Four-Oh-Four.\",\"Looks like we've got some broken links.\"],\"back\":\"Go back\",\"home\":\"Take me home\"},\"title\":\"Spark Hope\",\"navbar\":[\"/\",{\"text\":\"Languages\",\"children\":[{\"text\":\"English\",\"link\":\"/\"},{\"text\":\"Nederlands\",\"link\":\"/nl/\"},{\"text\":\"العربية\",\"link\":\"/ar/\"}]},{\"text\":\"Guide\",\"icon\":\"lightbulb\",\"link\":\"/guide/\"},{\"text\":\"Standards\",\"icon\":\"book\",\"link\":\"/standards/\"}],\"sidebar\":{\"/\":\"structure\",\"/ar/\":\"structure\",\"/events/\":\"structure\",\"/guide/\":\"structure\",\"/nl/\":\"structure\",\"/standards/\":\"structure\"}}}}")

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateThemeData) {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ themeData }) => {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  })
}
