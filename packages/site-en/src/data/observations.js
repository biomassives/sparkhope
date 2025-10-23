import observationsData from './observations.json';

export function getAllObservations() {
  return observationsData;
}

export function getObservationById(id) {
  return observationsData.find(observation => observation.id === id);
}
