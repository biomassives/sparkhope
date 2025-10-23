/**
 * /src/types/database.ts
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
  preparation_notes?: string;
  storage_notes?: string;
  usage_notes?: string;
  rating?: number;
  image_path?: string | null;
}

export interface RecipeIngredient {
  id: string;
  name: string;
  amount?: number | string;
  unit?: string;
  notes?: string;
}

export interface Recipe {
  id: string;
  name: string;
  type: 'liquid_culture' | 'grain_spawn' | 'agar' | 'substrate';
  description: string;
  ingredients: RecipeIngredient[];
  instructions: string[];
  sterilization_method?: string;
  yield?: string;
  preparation?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced' | 'easy' | 'moderate' | 'challenging';
  suitable_species?: string[];
  tags?: string[];
}

export interface GridLayout {
  rows: number;
  columns: number;
}

export interface Rack {
  id: string;
  name: string;
  location: string;
  rack_type: 'incubation' | 'liquid_culture' | 'grain_spawn' | 'cold_storage' | 'fruiting' | 'other';
  capacity: number;
  current_count: number;
  temperature?: string;
  humidity?: string;
  has_climate_control: boolean;
  dimensions?: string;
  grid_layout?: GridLayout;
  notes?: string;
  status: 'active' | 'inactive' | 'maintenance';
  created_at: string;
}

export interface Sample {
  id: string;
  sample_type: 'agar_plate' | 'liquid_culture' | 'grain_spawn' | 'slant' | 'spore_print' | 'tissue_culture';
  species_id: string;
  batch_id?: string | null;
  generation: string;
  location_id: string;
  position?: string;
  inoculation_date: string;
  status: 'inoculated' | 'colonizing' | 'colonized' | 'ready' | 'used' | 'contaminated' | 'stored' | 'discarded';
  health_rating?: number; // 1-5
  contamination: boolean;
  notes?: string;
  source_sample_id?: string | null;
  image_path?: string | null;
  created_at: string;
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
  temperature?: number | string;
  humidity?: number | string;
  light_exposure?: string;
  air_exchange?: string;
}

export interface Observation {
  id: string;
  batch_id: string;
  observation_date: string; // ISO date format: YYYY-MM-DD
  observation_type?: string;
  observer?: string;
  growth_stage?: 'inoculation' | 'colonization' | 'pinning' | 'fruiting' | 'harvest';
  visual_assessment?: string;
  conditions?: ObservationConditions;
  contamination?: boolean;
  contamination_type?: string;
  temperature?: string;
  humidity?: string;
  notes?: string;
  images?: string[];
  image_path?: string | null;
  ingredients?: string[];
  recipes?: string[];
  species?: string[];
  created_at?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  type: string; // 'Biomaterials' | 'Food Science' | 'Medicine' | etc.
  goal: string;
  manager?: string;
  status: 'Planning' | 'Active' | 'On Hold' | 'Completed' | 'Cancelled';
  priority: 'Low' | 'Medium' | 'High';
  complexity?: string;
  progress_percentage: number;
  start_date: string;
  end_date?: string;
  current_species?: string[];
  associated_racks?: string[];
  budget?: string;
  notes?: string;
  tags?: string[];
}



// Utility types
export type GrowthStage = Observation['growth_stage'];
export type BatchStatus = Batch['status'];
export type RecipeType = Recipe['type'];
export type RackType = Rack['rack_type'];
export type SampleType = Sample['sample_type'];
export type SampleStatus = Sample['status'];
export type IngredientCategory = Ingredient['category'];
export type DifficultyLevel = Species['difficulty'];

// Collection types
export type SpeciesCollection = Species[];
export type IngredientCollection = Ingredient[];
export type RecipeCollection = Recipe[];
export type SampleCollection = Sample[];
export type RackCollection = Rack[];
export type BatchCollection = Batch[];
export type ObservationCollection = Observation[];

// Database metadata
export interface DatabaseMetadata {
  export_date: string;
  record_counts: {
    species: number;
    ingredients: number;
    recipes: number;
    racks: number;
    samples: number;
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

export interface SampleFilters {
  sample_type?: SampleType;
  species_id?: string;
  location_id?: string;
  status?: SampleStatus;
  contamination?: boolean;
  generation?: string;
  min_health_rating?: number;
}

export interface RackFilters {
  rack_type?: RackType;
  location?: string;
  status?: Rack['status'];
  has_climate_control?: boolean;
  min_available_space?: number;
}

// Stats types
export interface DatabaseStats {
  total_species: number;
  total_ingredients: number;
  total_recipes: number;
  total_racks: number;
  total_samples: number;
  total_batches: number;
  active_batches: number;
  total_observations: number;
  recent_observations: number;
  batches_by_status: Record<BatchStatus, number>;
  species_by_difficulty: Record<DifficultyLevel, number>;
  samples_by_type: Record<SampleType, number>;
  samples_by_status: Record<SampleStatus, number>;
  racks_by_type: Record<RackType, number>;
}

export interface RackStats {
  total_capacity: number;
  total_occupied: number;
  occupancy_rate: number;
  available_space: number;
  by_type: Record<RackType, number>;
  by_location: Record<string, number>;
  climate_controlled: number;
}

export interface SampleStats {
  total: number;
  by_type: Record<SampleType, number>;
  by_status: Record<SampleStatus, number>;
  contaminated: number;
  ready: number;
  average_health: number;
  by_generation: Record<string, number>;
}

// Data store interface
export interface Store<T = any> {
  getAll: () => Promise<T[]>;
  getById: (id: string) => Promise<T | undefined>;
  filter: (predicate: (item: T) => boolean) => Promise<T[]>;
  create: (data: Partial<T>) => Promise<T>;
  update: (id: string, data: Partial<T>) => Promise<T>;
  delete: (id: string) => Promise<boolean>;
}

export interface DataStore {
  species: Store<Species>;
  observations: Store<Observation>;
  ingredients: Store<Ingredient>;
  recipes: Store<Recipe>;
  racks: Store<Rack>;
  samples: Store<Sample>;
  projects: Store<Project>;
  batches?: Store<Batch>;
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

export function isRack(obj: any): obj is Rack {
  return obj && 
    typeof obj.id === 'string' && 
    typeof obj.name === 'string' && 
    typeof obj.rack_type === 'string' &&
    typeof obj.capacity === 'number';
}

export function isSample(obj: any): obj is Sample {
  return obj && 
    typeof obj.id === 'string' && 
    typeof obj.sample_type === 'string' &&
    typeof obj.species_id === 'string' &&
    typeof obj.contamination === 'boolean';
}

// Helper functions for type-safe operations
export function getRackOccupancyRate(rack: Rack): number {
  if (rack.capacity === 0) return 0;
  return Math.round((rack.current_count / rack.capacity) * 100);
}

export function getSampleAge(sample: Sample): number {
  const now = new Date();
  const inocDate = new Date(sample.inoculation_date);
  return Math.floor((now.getTime() - inocDate.getTime()) / (1000 * 60 * 60 * 24));
}

export function isRackAvailable(rack: Rack, spaceNeeded: number = 1): boolean {
  const available = rack.capacity - rack.current_count;
  return available >= spaceNeeded && rack.status === 'active';
}

export function isSampleReady(sample: Sample): boolean {
  return sample.status === 'ready' && !sample.contamination;
}

export function isSampleContaminated(sample: Sample): boolean {
  return sample.contamination === true || sample.status === 'contaminated';
}

// Position helpers
export function parsePosition(position: string): { row: number; col: number } | null {
  const match = position.match(/^([A-Z])(\d+)$/);
  if (!match) return null;
  
  return {
    row: match[1].charCodeAt(0) - 65, // A=0, B=1, etc.
    col: parseInt(match[2]) - 1 // Convert to 0-based
  };
}

export function formatPosition(row: number, col: number): string {
  const rowLetter = String.fromCharCode(65 + row);
  return `${rowLetter}${col + 1}`;
}

export function isValidPosition(position: string, gridLayout: GridLayout): boolean {
  const parsed = parsePosition(position);
  if (!parsed) return false;
  
  return parsed.row >= 0 && 
         parsed.row < gridLayout.rows && 
         parsed.col >= 0 && 
         parsed.col < gridLayout.columns;
}