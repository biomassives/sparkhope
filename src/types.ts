// src/types.ts

export type AnyData = Record<string, any>;

// Optional stricter types if needed
export interface Batch extends AnyData {}
export interface Recipe extends AnyData {}
export interface Ingredient extends AnyData {}
export interface Species extends AnyData {}
export interface Observation extends AnyData {}

export interface Batch {
  id: string;
  title: string;
  description?: string;
  relations?: {
    linkedIngredients?: any[];
    linkedRecipes?: any[];
  };
}

