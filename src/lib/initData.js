// src/lib/initData.js
import { dataStore } from './managers/index.js';

// Import JSON data
import batchesData from '../data/batches.json';
import recipesData from '../data/recipes.json';
import speciesData from '../data/species.json';
import observationsData from '../data/observations.json';
import ingredientsData from '../data/ingredients.json';

/**
 * Initialize the data store with local JSON data
 */
export async function initializeDataStore() {
  await dataStore.initLocal({
    batches: batchesData,
    recipes: recipesData,
    species: speciesData,
    observations: observationsData,
    ingredients: ingredientsData,
  });

  // Optional: Initialize Supabase if env vars are set
  if (import.meta.env.PUBLIC_SUPABASE_URL && import.meta.env.PUBLIC_SUPABASE_KEY) {
    await dataStore.initSupabase(
      import.meta.env.PUBLIC_SUPABASE_URL,
      import.meta.env.PUBLIC_SUPABASE_KEY
    );
  }

  // Optional: Initialize lattice security if configured
  if (import.meta.env.LATTICE_CONFIG) {
    await dataStore.initLattice(
      JSON.parse(import.meta.env.LATTICE_CONFIG)
    );
  }

  return dataStore;
}

// Export initialized store for use in pages
export { dataStore };
