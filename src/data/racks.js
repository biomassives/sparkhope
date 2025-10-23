import racksData from './racks.json';

export function getAllRacks() {
  return racksData;
}

export function getRackById(id) {
  return racksData.find(rack => rack.id === id);
}
