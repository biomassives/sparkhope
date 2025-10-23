// src/data/batches.js
import batchesData from './batches.json';

/**
 * Get all batches
 * @returns {Array} Array of batch objects
 */
export function getAllBatches() {
  return batchesData;
}

/**
 * Get batch by ID
 * @param {string} id - Batch ID
 * @returns {Object|undefined} Batch object or undefined
 */
export function getBatchById(id) {
  return batchesData.find(batch => batch.id === id || batch.id === parseInt(id));
}

/**
 * Get batches by status
 * @param {string} status - Batch status
 * @returns {Array} Filtered array of batches
 */
export function getBatchesByStatus(status) {
  return batchesData.filter(batch => batch.status === status);
}
