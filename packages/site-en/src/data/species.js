import speciesData from './species.json';

export function getAllSpecies() {
  return speciesData;
}

export function getSpeciesById(id) {
  return speciesData.find(species => species.id === id);
}
