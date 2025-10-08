// src/utils/resolveRelations.ts
import type { AnyData, Batch, Recipe, Ingredient, Observation, Species } from '../types';

export interface ResolvedRelations {
  linkedBatches: Batch[];
  linkedRecipes: Recipe[];
  linkedIngredients: Ingredient[];
  linkedObservations: Observation[];
  linkedSpecies: Species[];
}

export function resolveRelations(data: AnyData): ResolvedRelations {
  return {
    linkedBatches: (data.linkedBatches ?? []) as Batch[],
    linkedRecipes: (data.linkedRecipes ?? []) as Recipe[],
    linkedIngredients: (data.linkedIngredients ?? []) as Ingredient[],
    linkedObservations: (data.linkedObservations ?? []) as Observation[],
    linkedSpecies: (data.linkedSpecies ?? []) as Species[],
  };
}

