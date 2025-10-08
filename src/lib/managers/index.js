// src/lib/managers/index.js
import DataManager from '../DataManager.js';

/**
 * BatchManager - Handles batch operations
 */
export class BatchManager extends DataManager {
  constructor() {
    super('batches');
  }

  async getByStatus(status) {
    return this.filter(batch => batch.status === status);
  }

  async getBySpecies(speciesId) {
    return this.filter(batch => 
      batch.species && batch.species.includes(speciesId)
    );
  }

  async getActive() {
    return this.getByStatus('active');
  }

  async getContaminated() {
    return this.getByStatus('contaminated');
  }
}

/**
 * RecipeManager - Handles recipe operations
 */
export class RecipeManager extends DataManager {
  constructor() {
    super('recipes');
  }

  async getByType(recipeType) {
    return this.filter(recipe => recipe.recipe_type === recipeType);
  }

  async getByDifficulty(difficulty) {
    return this.filter(recipe => recipe.difficulty === difficulty);
  }

  async getByIngredient(ingredientId) {
    return this.filter(recipe => 
      recipe.ingredients && recipe.ingredients.includes(ingredientId)
    );
  }

  async searchByTags(tags) {
    return this.filter(recipe => 
      recipe.tags && tags.some(tag => recipe.tags.includes(tag))
    );
  }
}

/**
 * SpeciesManager - Handles species operations
 */
export class SpeciesManager extends DataManager {
  constructor() {
    super('species');
  }

  async getByDifficulty(difficulty) {
    return this.filter(species => species.difficulty === difficulty);
  }

  async getByFamily(family) {
    return this.filter(species => species.family === family);
  }

  async searchBySubstrate(substrate) {
    return this.filter(species => 
      species.suitable_substrates && 
      species.suitable_substrates.includes(substrate)
    );
  }

  async getMedicinal() {
    return this.filter(species => 
      species.medicinal_properties && 
      species.medicinal_properties.length > 0
    );
  }
}

/**
 * ObservationManager - Handles observation operations
 */
export class ObservationManager extends DataManager {
  constructor() {
    super('observations');
  }

  async getByBatch(batchId) {
    return this.filter(obs => obs.batch_id === batchId);
  }

  async getByGrowthStage(stage) {
    return this.filter(obs => obs.growth_stage === stage);
  }

  async getContaminated() {
    return this.filter(obs => obs.contamination === true);
  }

  async getByDateRange(startDate, endDate) {
    return this.filter(obs => {
      const obsDate = new Date(obs.observation_date);
      return obsDate >= new Date(startDate) && obsDate <= new Date(endDate);
    });
  }

  async getRecent(limit = 10) {
    const all = await this.getAll();
    return all
      .sort((a, b) => 
        new Date(b.observation_date) - new Date(a.observation_date)
      )
      .slice(0, limit);
  }
}

/**
 * IngredientManager - Handles ingredient operations
 */
export class IngredientManager extends DataManager {
  constructor() {
    super('ingredients');
  }

  async getBySource(source) {
    return this.filter(ingredient => ingredient.source === source);
  }

  async getLocal() {
    return this.getBySource('local');
  }

  async getForaged() {
    return this.getBySource('foraged');
  }

  async getWasteStream() {
    return this.getBySource('waste_stream');
  }
}

/**
 * DataStore - Main data store singleton
 */
export class DataStore {
  constructor() {
    this.batches = new BatchManager();
    this.recipes = new RecipeManager();
    this.species = new SpeciesManager();
    this.observations = new ObservationManager();
    this.ingredients = new IngredientManager();
  }

  /**
   * Initialize all managers with local data
   */
  async initLocal(data) {
    await this.batches.loadLocal(data.batches || []);
    await this.recipes.loadLocal(data.recipes || []);
    await this.species.loadLocal(data.species || []);
    await this.observations.loadLocal(data.observations || []);
    await this.ingredients.loadLocal(data.ingredients || []);
    return this;
  }

  /**
   * Initialize Supabase for all managers
   */
  async initSupabase(supabaseUrl, supabaseKey) {
    await Promise.all([
      this.batches.initSupabase(supabaseUrl, supabaseKey),
      this.recipes.initSupabase(supabaseUrl, supabaseKey),
      this.species.initSupabase(supabaseUrl, supabaseKey),
      this.observations.initSupabase(supabaseUrl, supabaseKey),
      this.ingredients.initSupabase(supabaseUrl, supabaseKey),
    ]);
    return this;
  }

  /**
   * Initialize lattice security for all managers
   */
  async initLattice(latticeConfig) {
    await Promise.all([
      this.batches.initLattice(latticeConfig),
      this.recipes.initLattice(latticeConfig),
      this.species.initLattice(latticeConfig),
      this.observations.initLattice(latticeConfig),
      this.ingredients.initLattice(latticeConfig),
    ]);
    return this;
  }
}

// Export singleton instance
export const dataStore = new DataStore();

