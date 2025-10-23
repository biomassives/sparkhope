// Simple data loader using local JSON files
import samplesData from '../data/samples.json';
import projectsData from '../data/projects.json';
import recipesData from '../data/recipes.json';
import speciesData from '../data/species.json';
import batchesData from '../data/batches.json';
import observationsData from '../data/observations.json';
import racksData from '../data/racks.json';
import ingredientsData from '../data/ingredients.json';

// Samples
export function getAllSamples() {
  return samplesData || [];
}

export function getSampleById(id: string) {
  return samplesData.find((s: any) => s.id === id);
}

export function getSamplesByBatch(batchId: string) {
  return samplesData.filter((s: any) => s.batch_id === batchId);
}

export function getSamplesBySpecies(speciesId: string) {
  return samplesData.filter((s: any) => s.species_id === speciesId);
}

export function getSamplesByRack(rackId: string) {
  return samplesData.filter((s: any) => s.location_id === rackId);
}

// Projects
export function getAllProjects() {
  return projectsData || [];
}

export function getProjectById(id: string) {
  return projectsData.find((p: any) => p.id === id);
}

export function getActiveProjects() {
  return projectsData.filter((p: any) => p.status === 'Active');
}

// Species
export function getAllSpecies() {
  return speciesData || [];
}

export function getSpeciesById(id: string) {
  return speciesData.find((s: any) => s.id === id);
}

// Batches
export function getAllBatches() {
  return batchesData || [];
}

export function getBatchById(id: string) {
  return batchesData.find((b: any) => b.id === id);
}

export function getActiveBatches() {
  return batchesData.filter((b: any) => 
    !b.status || 
    b.status === 'active' || 
    b.status === 'Active' || 
    b.status === 'growing' ||
    b.status === 'colonizing'
  );
}

export function getBatchesBySpecies(speciesId: string) {
  return batchesData.filter((b: any) => b.species_id === speciesId);
}

// Recipes
export function getAllRecipes() {
  return recipesData || [];
}

export function getRecipeById(id: string) {
  return recipesData.find((r: any) => r.id === id);
}

// Observations
export function getAllObservations() {
  return observationsData || [];
}

export function getObservationById(id: string) {
  return observationsData.find((o: any) => o.id === id);
}

export function getObservationsByBatch(batchId: string) {
  return observationsData.filter((o: any) => o.batch_id === batchId);
}

export function getObservationsBySample(sampleId: string) {
  return observationsData.filter((o: any) => o.sample_id === sampleId);
}

export function getObservationsBySpecies(speciesId: string) {
  const samples = getSamplesBySpecies(speciesId);
  const sampleIds = samples.map((s: any) => s.id);
  return observationsData.filter((o: any) => 
    o.species_id === speciesId || sampleIds.includes(o.sample_id)
  );
}

// Racks
export function getAllRacks() {
  return racksData || [];
}

export function getRackById(id: string) {
  return racksData.find((r: any) => r.id === id);
}

// Ingredients
export function getAllIngredients() {
  return ingredientsData || [];
}

export function getIngredientById(id: string) {
  return ingredientsData.find((i: any) => i.id === id);
}

// Helpers
export function getSpeciesName(speciesId: string) {
  const species = getSpeciesById(speciesId);
  return species ? (species.common_name || species.scientific_name) : speciesId;
}

// Legacy compatibility - map old function names
export function getBySpecies(speciesId: string) {
  return getSamplesBySpecies(speciesId);
}

export function getByBatch(batchId: string) {
  return getObservationsByBatch(batchId);
}

export function getBySample(sampleId: string) {
  return getObservationsBySample(sampleId);
}
