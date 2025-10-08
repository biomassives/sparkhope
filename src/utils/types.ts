export interface Batch {
  id: string;
  title: string;
  linkedRecipe?: string;
  linkedSpecies?: string[];
  linkedIngredients?: string[];
  status?: string;
  date_created?: string;
}

export interface Recipe {
  id: string;
  title: string;
  ingredient_ids?: string[];
  type?: string;
  description?: string;
}

export interface Ingredient {
  id: string;
  title: string;
  category?: string;
  role?: string;
  cost?: number;
  batch_ids?: string[];
}

export interface Species {
  id: string;
  title: string;
  description?: string;
  icon?: string;
}

export interface Observation {
  id: string;
  title: string;
  species?: string[];
  status?: string;
  date_created?: string;
}

