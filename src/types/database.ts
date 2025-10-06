/**
 * TypeScript type definitions for MycoLab database
 * 
 * These types match the JSON data structures in src/data/
 */

export interface Species {
  id: string;
  common_name: string;
  scientific_name: string;
  description: string;
  optimal_temp: string;
  optimal_humidity: string;
  fruiting_time: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface Ingredient {
  id: string;
  name: string;
  category: 'base' | 'sugar' | 'nutrient' | 'grain' | 'additive';
  description: string;
  unit: string;
}

export interface RecipeIngredient {
  id: string;
  amount: number;
  unit: string;
}

export interface Recipe {
  id: string;
  name: string;
  type: 'liquid_culture' | 'grain_spawn' | 'agar' | 'substrate';
  description: string;
  ingredients: RecipeIngredient[];
  instructions: string[];
  sterilization: string;
  yield: string;
}

export interface Batch {
  id: string;
  name: string;
  species: string;
  recipe: string;
  start_date: string; // ISO date format: YYYY-MM-DD
  status: 'colonizing' | 'ready' | 'fruiting' | 'harvested' | 'failed';
  quantity: string;
  notes?: string;
  ingredients: string[];
}

export interface ObservationConditions {
  temperature?: number;
  humidity?: number;
  light_exposure?: string;
  air_exchange?: string;
}

export interface Observation {
  id: string;
  batch_id: string;
  observation_date: string; // ISO date format: YYYY-MM-DD
  observer?: string;
  growth_stage?: 'inoculation' | 'colonization' | 'pinning' | 'fruiting' | 'harvest';
  conditions?: ObservationConditions;
  contamination?: boolean;
  contamination_type?: string;
  notes?: string;
  images?: string[];
  ingredients?: string[];
  recipes?: string[];
  species?: string[];
}

// Utility types
export type GrowthStage = Observation['growth_stage'];
export type BatchStatus = Batch['status'];
export type RecipeType = Recipe['type'];
export type IngredientCategory = Ingredient['category'];
export type DifficultyLevel = Species['difficulty'];

// Collection types
export type SpeciesCollection = Species[];
export type IngredientCollection = Ingredient[];
export type RecipeCollection = Recipe[];
export type BatchCollection = Batch[];
export type ObservationCollection = Observation[];

// Database metadata
export interface DatabaseMetadata {
  export_date: string;
  record_counts: {
    species: number;
    ingredients: number;
    recipes: number;
    batches: number;
    observations: number;
  };
  total_records: number;
}

// Helper type for grouping
export type GroupedData<T> = Record<string, T[]>;

// Filter types
export interface ObservationFilters {
  batch_id?: string;
  growth_stage?: GrowthStage;
  contamination?: boolean;
  date_from?: string;
  date_to?: string;
}

export interface BatchFilters {
  status?: BatchStatus;
  species?: string;
  recipe?: string;
}

// Stats types
export interface DatabaseStats {
  total_species: number;
  total_ingredients: number;
  total_recipes: number;
  total_batches: number;
  active_batches: number;
  total_observations: number;
  recent_observations: number;
  batches_by_status: Record<BatchStatus, number>;
  species_by_difficulty: Record<DifficultyLevel, number>;
}

// Type guards
export function isSpecies(obj: any): obj is Species {
  return obj && typeof obj.id === 'string' && typeof obj.common_name === 'string';
}

export function isObservation(obj: any): obj is Observation {
  return obj && typeof obj.id === 'string' && typeof obj.batch_id === 'string';
}

export function isBatch(obj: any): obj is Batch {
  return obj && typeof obj.id === 'string' && typeof obj.name === 'string';
}

export function isRecipe(obj: any): obj is Recipe {
  return obj && typeof obj.id === 'string' && Array.isArray(obj.ingredients);
}

export function isIngredient(obj: any): obj is Ingredient {
  return obj && typeof obj.id === 'string' && typeof obj.category === 'string';
}
