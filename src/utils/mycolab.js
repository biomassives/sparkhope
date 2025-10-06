// src/utils/mycolab.js

/**
 * Generate observation title from batch ID and date
 * @param {string} batchId - e.g., "lc-20251005-002" or "mb-20251004-001"
 * @param {string} observationDate - ISO date string "2025-10-05"
 * @returns {string} - e.g., "Observation: LC-20251005-002 | Oct 5, 2025"
 */
export function generateObservationTitle(batchId, observationDate) {
  if (!batchId || !observationDate) {
    return 'Observation';
  }
  
  // Format batch ID to uppercase
  const formattedBatchId = batchId.toUpperCase();
  
  // Format date to readable format
  const date = new Date(observationDate);
  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
  
  return `Observation: ${formattedBatchId} | ${formattedDate}`;
}

/**
 * Get display title for observation (auto-generates if not provided)
 */
export function getObservationTitle(observation) {
  return observation.data.title || generateObservationTitle(
    observation.data.batch_id,
    observation.data.observation_date
  );
}

/**
 * Parse batch type from batch ID
 * @param {string} batchId - e.g., "lc-20251005-002"
 * @returns {object} - { type: 'liquid_culture', date: '20251005', number: '002' }
 */
export function parseBatchId(batchId) {
  const batchTypes = {
    'lc': 'liquid_culture',
    'mb': 'mycelium_block',
    'ag': 'agar',
    'sp': 'spawn'
  };
  
  const match = batchId.match(/^([a-z]+)-(\d{8})-(\d{3})$/i);
  
  if (!match) {
    return { type: 'unknown', date: '', number: '' };
  }
  
  return {
    type: batchTypes[match[1].toLowerCase()] || 'unknown',
    date: match[2],
    number: match[3],
    raw: batchId
  };
}
