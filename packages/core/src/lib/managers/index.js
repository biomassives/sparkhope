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
 * RacksManager - Handles rack/storage location operations
 */
export class RacksManager extends DataManager {
  constructor() {
    super('racks');
  }

  /**
   * Get racks by type (incubation, liquid_culture, grain_spawn, cold_storage, etc.)
   */
  async getByType(rackType) {
    return this.filter(rack => rack.rack_type === rackType);
  }

  /**
   * Get racks by location (Lab Room, Clean Room, etc.)
   */
  async getByLocation(location) {
    return this.filter(rack => rack.location === location);
  }

  /**
   * Get racks by status (active, inactive, maintenance)
   */
  async getByStatus(status) {
    return this.filter(rack => rack.status === status);
  }

  /**
   * Get only climate-controlled racks
   */
  async getClimateControlled() {
    return this.filter(rack => rack.has_climate_control === true);
  }

  /**
   * Get racks with available space
   */
  async getAvailableRacks(minSpaceNeeded = 1) {
    return this.filter(rack => {
      const available = rack.capacity - (rack.current_count || 0);
      return available >= minSpaceNeeded;
    });
  }

  /**
   * Get racks by occupancy level
   * @param {string} level - 'empty', 'low', 'medium', 'high', 'full'
   */
  async getByOccupancy(level) {
    return this.filter(rack => {
      if (rack.capacity === 0) return false;
      const occupancy = (rack.current_count / rack.capacity) * 100;
      
      switch(level) {
        case 'empty': return occupancy === 0;
        case 'low': return occupancy > 0 && occupancy < 30;
        case 'medium': return occupancy >= 30 && occupancy < 70;
        case 'high': return occupancy >= 70 && occupancy < 90;
        case 'full': return occupancy >= 90;
        default: return false;
      }
    });
  }

  /**
   * Get total capacity across all racks
   */
  async getTotalCapacity() {
    const racks = await this.getAll();
    return racks.reduce((sum, rack) => sum + (rack.capacity || 0), 0);
  }

  /**
   * Get total occupied space across all racks
   */
  async getTotalOccupied() {
    const racks = await this.getAll();
    return racks.reduce((sum, rack) => sum + (rack.current_count || 0), 0);
  }

  /**
   * Get overall occupancy percentage
   */
  async getOverallOccupancy() {
    const total = await this.getTotalCapacity();
    const occupied = await this.getTotalOccupied();
    return total > 0 ? Math.round((occupied / total) * 100) : 0;
  }

  /**
   * Get all unique locations
   */
  async getAllLocations() {
    const racks = await this.getAll();
    const locations = [...new Set(racks.map(r => r.location).filter(Boolean))];
    return locations.sort();
  }

  /**
   * Get all unique rack types
   */
  async getAllTypes() {
    const racks = await this.getAll();
    const types = [...new Set(racks.map(r => r.rack_type).filter(Boolean))];
    return types.sort();
  }

  /**
   * Find best rack for a sample type
   */
  async findBestRackFor(sampleType, minSpaceNeeded = 1) {
    const available = await this.getAvailableRacks(minSpaceNeeded);
    
    // Prioritize racks that match the sample type
    const matchingType = available.filter(r => 
      r.rack_type === sampleType || 
      (sampleType === 'agar_plate' && r.rack_type === 'incubation')
    );
    
    if (matchingType.length > 0) {
      // Return the one with most space
      return matchingType.sort((a, b) => 
        (b.capacity - b.current_count) - (a.capacity - a.current_count)
      )[0];
    }
    
    // Otherwise return any available rack
    return available.length > 0 ? available[0] : null;
  }
}

/**
 * SamplesManager - Handles sample/culture operations
 */
export class SamplesManager extends DataManager {
  constructor() {
    super('samples');
  }

  /**
   * Get samples by type (agar_plate, liquid_culture, grain_spawn, slant)
   */
  async getByType(sampleType) {
    return this.filter(sample => sample.sample_type === sampleType);
  }

  /**
   * Get samples by species
   */
  async getBySpecies(speciesId) {
    return this.filter(sample => sample.species_id === speciesId);
  }

  /**
   * Get samples in a specific rack
   */
  async getByRack(rackId) {
    return this.filter(sample => sample.location_id === rackId);
  }

  /**
   * Get samples by batch
   */
  async getByBatch(batchId) {
    return this.filter(sample => sample.batch_id === batchId);
  }

  /**
   * Get samples by status (inoculated, colonizing, colonized, ready, used, contaminated, stored, discarded)
   */
  async getByStatus(status) {
    return this.filter(sample => sample.status === status);
  }

  /**
   * Get contaminated samples
   */
  async getContaminated() {
    return this.filter(sample => sample.contamination === true);
  }

  /**
   * Get ready samples (available for use)
   */
  async getReady() {
    return this.filter(sample => sample.status === 'ready');
  }

  /**
   * Get samples by generation
   */
  async getByGeneration(generation) {
    return this.filter(sample => sample.generation === generation);
  }

  /**
   * Get samples by health rating
   */
  async getByHealthRating(minRating) {
    return this.filter(sample => 
      sample.health_rating && sample.health_rating >= minRating
    );
  }

  /**
   * Get samples at a specific position in a rack
   */
  async getByPosition(rackId, position) {
    return this.filter(sample => 
      sample.location_id === rackId && sample.position === position
    );
  }

  /**
   * Get sample lineage (trace back through source samples)
   */
  async getLineage(sampleId) {
    const lineage = [];
    let currentSample = await this.getById(sampleId);
    
    while (currentSample) {
      lineage.push(currentSample);
      
      if (currentSample.source_sample_id) {
        currentSample = await this.getById(currentSample.source_sample_id);
      } else {
        currentSample = null;
      }
    }
    
    return lineage;
  }

  /**
   * Get all samples derived from a source sample
   */
  async getDescendants(sampleId) {
    return this.filter(sample => sample.source_sample_id === sampleId);
  }

  /**
   * Get samples inoculated within a date range
   */
  async getByDateRange(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    return this.filter(sample => {
      if (!sample.inoculation_date) return false;
      const inocDate = new Date(sample.inoculation_date);
      return inocDate >= start && inocDate <= end;
    });
  }

  /**
   * Get samples by age (days since inoculation)
   */
  async getByAge(minDays, maxDays = Infinity) {
    const now = new Date();
    
    return this.filter(sample => {
      if (!sample.inoculation_date) return false;
      const inocDate = new Date(sample.inoculation_date);
      const ageInDays = Math.floor((now - inocDate) / (1000 * 60 * 60 * 24));
      return ageInDays >= minDays && ageInDays <= maxDays;
    });
  }

  /**
   * Get samples that need attention (contaminated, old colonizing samples, etc.)
   */
  async getNeedingAttention() {
    const contaminated = await this.getContaminated();
    const oldColonizing = await this.filter(sample => {
      if (sample.status !== 'colonizing' || !sample.inoculation_date) return false;
      
      const now = new Date();
      const inocDate = new Date(sample.inoculation_date);
      const ageInDays = Math.floor((now - inocDate) / (1000 * 60 * 60 * 24));
      
      // Flag samples colonizing for more than 30 days
      return ageInDays > 30;
    });
    
    return [...contaminated, ...oldColonizing];
  }

  /**
   * Get statistics for samples
   */
  async getStatistics() {
    const all = await this.getAll();
    
    return {
      total: all.length,
      byType: this._groupBy(all, 'sample_type'),
      byStatus: this._groupBy(all, 'status'),
      contaminated: all.filter(s => s.contamination).length,
      ready: all.filter(s => s.status === 'ready').length,
      averageHealth: this._calculateAverage(all, 'health_rating')
    };
  }

  /**
   * Helper: Group samples by property
   */
  _groupBy(samples, property) {
    return samples.reduce((acc, sample) => {
      const key = sample[property] || 'unknown';
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});
  }

  /**
   * Helper: Calculate average of a numeric property
   */
  _calculateAverage(samples, property) {
    const values = samples
      .map(s => s[property])
      .filter(v => typeof v === 'number' && !isNaN(v));
    
    if (values.length === 0) return 0;
    return Math.round((values.reduce((a, b) => a + b, 0) / values.length) * 10) / 10;
  }

  /**
   * Get samples grouped by rack
   */
  async groupByRack() {
    const samples = await this.getAll();
    return samples.reduce((acc, sample) => {
      const rackId = sample.location_id || 'unassigned';
      if (!acc[rackId]) acc[rackId] = [];
      acc[rackId].push(sample);
      return acc;
    }, {});
  }

  /**
   * Find available positions in a rack
   */
  async findAvailablePositions(rackId, gridLayout) {
    const samplesInRack = await this.getByRack(rackId);
    const occupiedPositions = new Set(
      samplesInRack.map(s => s.position).filter(Boolean)
    );
    
    const allPositions = [];
    for (let row = 0; row < gridLayout.rows; row++) {
      const rowLetter = String.fromCharCode(65 + row); // A, B, C...
      for (let col = 1; col <= gridLayout.columns; col++) {
        const position = `${rowLetter}${col}`;
        if (!occupiedPositions.has(position)) {
          allPositions.push(position);
        }
      }
    }
    
    return allPositions;
  }
}


/**
 * ProjectsManager - Handles project operations for research and cultivation tracking.
 * Provides data optimized for the Project Dashboard.
 */
export class ProjectsManager extends DataManager {
  constructor() {
    // The super constructor must be updated to load 'projects' data
    // This assumes your DataStore initialization handles passing the data.
    super('projects'); 
  }

  /**
   * Get projects by their current status (e.g., Active, Planning, Complete)
   */
  async getByStatus(status) {
    return this.filter(project => project.status && project.status.toLowerCase() === status.toLowerCase());
  }

  /**
   * Get projects by their priority level (e.g., High, Medium, Low)
   */
  async getByPriority(priority) {
    return this.filter(project => project.priority && project.priority.toLowerCase() === priority.toLowerCase());
  }

  /**
   * Get projects by type (e.g., Biomaterials, Food Science, Social Impact Research)
   */
  async getByType(projectType) {
    return this.filter(project => project.type && project.type.toLowerCase() === projectType.toLowerCase());
  }

  /**
   * Get projects associated with a specific species ID
   */
  async getBySpecies(speciesId) {
    return this.filter(project => 
      project.current_species && project.current_species.includes(speciesId)
    );
  }

  /**
   * Get projects that are currently "Active" or "In Progress".
   */
  async getActiveProjects() {
    return this.filter(project => 
      project.status && 
      (project.status.toLowerCase() === 'active' || project.status.toLowerCase() === 'in progress')
    );
  }

  /**
   * Get projects that are past their expected end date but not yet 'Complete'.
   */
  async getDelayedProjects() {
    const now = new Date();
    return this.filter(project => {
      if (project.status && project.status.toLowerCase() === 'complete') return false;
      if (!project.end_date) return false;
      
      const endDate = new Date(project.end_date);
      return endDate < now;
    });
  }

  // ----------------------------------------------------------------
  // 🎯 DASHBOARD METRICS (Based on the Astro template requirements)
  // ----------------------------------------------------------------

  /**
   * Get all statistics required for the Project Dashboard and overall context.
   * This is the single most important function for the index page frontmatter.
   */
  async getDashboardMetrics() {
    const allProjects = await this.getAll();
    
    // Calculate total racks by flattening all associated_racks arrays
    const totalAssociatedRacks = allProjects.reduce((count, project) => {
        return count + (project.associated_racks ? project.associated_racks.length : 0);
    }, 0);
    
    // Use the inherited helper for grouping and averaging
    const projectsByStatus = this._groupBy(allProjects, 'status');
    const averageProgress = this._calculateAverage(allProjects, 'progress_percentage');
    const highPriorityCount = allProjects.filter(p => p.priority && p.priority.toLowerCase() === 'high').length;

    return {
      totalProjects: allProjects.length,
      averageProgress: Math.round(averageProgress), // Template requires integer percentage
      highPriorityCount: highPriorityCount,
      totalAssociatedRacks: totalAssociatedRacks,
      projectsByStatus: projectsByStatus
    };
  }

  // NOTE: Assuming _groupBy and _calculateAverage helpers exist in DataManager
  // or are copied/inherited into ProjectsManager as they were in SamplesManager.
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
    this.racks = new RacksManager();
    this.projects = new ProjectsManager();
    this.samples = new SamplesManager();
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
    await this.racks.loadLocal(data.racks || []);
    await this.projects.loadLocal(data.projects || []);
    await this.samples.loadLocal(data.samples || []);
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

