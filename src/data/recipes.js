import recipesData from './recipes.json';

export function getAllRecipes() {
  return recipesData;
}

export function getRecipeById(id) {
  return recipesData.find(recipe => recipe.id === id);
}
