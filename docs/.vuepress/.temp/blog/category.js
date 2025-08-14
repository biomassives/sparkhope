export const categoriesMap = JSON.parse("{\"category\":{\"/\":{\"path\":\"/category/\",\"map\":{}}},\"tag\":{\"/\":{\"path\":\"/tag/\",\"map\":{\"workshop\":{\"path\":\"/tag/workshop/\",\"indexes\":[0,1,2,3,4]},\"mycology\":{\"path\":\"/tag/mycology/\",\"indexes\":[0,2,4]},\"safety\":{\"path\":\"/tag/safety/\",\"indexes\":[0,2]},\"documentation\":{\"path\":\"/tag/documentation/\",\"indexes\":[2]},\"nutrition\":{\"path\":\"/tag/nutrition/\",\"indexes\":[0]},\"concepts\":{\"path\":\"/tag/concepts/\",\"indexes\":[0]},\"field\":{\"path\":\"/tag/field/\",\"indexes\":[4]},\"identification\":{\"path\":\"/tag/identification/\",\"indexes\":[4]},\"ecology\":{\"path\":\"/tag/ecology/\",\"indexes\":[4]},\"ورشة\":{\"path\":\"/tag/%D9%88%D8%B1%D8%B4%D8%A9/\",\"indexes\":[5,6]},\"فطريات\":{\"path\":\"/tag/%D9%81%D8%B7%D8%B1%D9%8A%D8%A7%D8%AA/\",\"indexes\":[5,6]},\"سلامة\":{\"path\":\"/tag/%D8%B3%D9%84%D8%A7%D9%85%D8%A9/\",\"indexes\":[5,6]},\"توثيق\":{\"path\":\"/tag/%D8%AA%D9%88%D8%AB%D9%8A%D9%82/\",\"indexes\":[6]},\"تغذية\":{\"path\":\"/tag/%D8%AA%D8%BA%D8%B0%D9%8A%D8%A9/\",\"indexes\":[5]},\"مفاهيم\":{\"path\":\"/tag/%D9%85%D9%81%D8%A7%D9%87%D9%8A%D9%85/\",\"indexes\":[5]},\"mycologie\":{\"path\":\"/tag/mycologie/\",\"indexes\":[1,3]},\"veiligheid\":{\"path\":\"/tag/veiligheid/\",\"indexes\":[1,3]},\"documentatie\":{\"path\":\"/tag/documentatie/\",\"indexes\":[3]},\"voeding\":{\"path\":\"/tag/voeding/\",\"indexes\":[1]},\"concepten\":{\"path\":\"/tag/concepten/\",\"indexes\":[1]}}}}}");

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
  if (__VUE_HMR_RUNTIME__.updateBlogCategory)
    __VUE_HMR_RUNTIME__.updateBlogCategory(categoriesMap);
}

if (import.meta.hot)
  import.meta.hot.accept(({ categoriesMap }) => {
    __VUE_HMR_RUNTIME__.updateBlogCategory(categoriesMap);
  });

