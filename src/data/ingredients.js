import ingredientsData from './ingredients.json';

export function getAllIngredients() {
  return ingredientsData;
}

export function getIngredientById(id) {
  return ingredientsData.find(ingredient => ingredient.id === id);
}
