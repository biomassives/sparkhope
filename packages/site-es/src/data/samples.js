import samplesData from './samples.json';

export function getAllSamples() {
  return samplesData;
}

export function getSampleById(id) {
  return samplesData.find(sample => sample.id === id);
}
