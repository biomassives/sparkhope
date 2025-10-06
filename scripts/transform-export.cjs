#!/usr/bin/env node

/**
 * Transform MycoLab SQLite export to Astro-compatible JSON files
 * 
 * Usage:
 *   node scripts/transform-export.js mycolab_export_20251006_090207.json
 */

const fs = require('fs');
const path = require('path');

// Read the export file
const exportFile = process.argv[2] || 'mycolab_export_20251006_090207.json';

if (!fs.existsSync(exportFile)) {
  console.error(`❌ File not found: ${exportFile}`);
  console.error('Usage: node scripts/transform-export.js <export-file.json>');
  process.exit(1);
}

console.log(`📖 Reading export from: ${exportFile}\n`);
const data = JSON.parse(fs.readFileSync(exportFile, 'utf8'));

const dataDir = path.join(__dirname, '../src/data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Transform Species
console.log('🍄 Transforming species...');
const species = data.species.map(s => ({
  id: `species-${s.id}`,
  common_name: s.common_name,
  scientific_name: s.latin_name, // Note: source has "latin_name"
  description: s.notes || '',
  optimal_temp: s.ideal_temp || 'Unknown',
  optimal_humidity: s.ideal_humidity ? `${s.ideal_humidity}%` : 'Unknown',
  substrate_preference: s.substrate_preference || 'Various',
  difficulty: 'beginner', // Could enhance this with logic
  image_path: s.image_path
}));

fs.writeFileSync(
  path.join(dataDir, 'species.json'),
  JSON.stringify(species, null, 2)
);
console.log(`   ✓ ${species.length} species`);

// Transform Ingredients
console.log('🥄 Transforming ingredients...');
const ingredients = data.ingredients.map(i => ({
  id: `ingredient-${i.id}`,
  name: i.name,
  category: categorizeIngredient(i.name, i.description),
  description: i.description || '',
  unit: i.default_unit || 'g',
  preparation_notes: i.preparation_notes || '',
  storage_notes: i.storage_notes || '',
  usage_notes: i.usage_notes || '',
  rating: i.rating || 3,
  image_path: i.image_path
}));

fs.writeFileSync(
  path.join(dataDir, 'ingredients.json'),
  JSON.stringify(ingredients, null, 2)
);
console.log(`   ✓ ${ingredients.length} ingredients`);

// Transform Recipes with ingredients
console.log('📋 Transforming recipes...');
const recipes = data.recipe_mixes.map(r => {
  // Find all ingredients for this recipe
  const recipeIngredients = data.recipe_ingredients
    .filter(ri => ri.recipe_id === r.id)
    .map(ri => {
      const ingredient = data.ingredients.find(i => i.id === ri.ingredient_id);
      return {
        id: `ingredient-${ri.ingredient_id}`,
        name: ingredient ? ingredient.name : 'Unknown',
        amount: ri.amount,
        unit: ri.unit,
        notes: ri.notes || ''
      };
    });

  return {
    id: `recipe-${r.id}`,
    name: r.name,
    type: determineRecipeType(r.name),
    description: r.notes || '',
    total_volume: r.total_volume_liters,
    preparation: r.preparation || '',
    ingredients: recipeIngredients,
    image_path: r.image_path
  };
});

fs.writeFileSync(
  path.join(dataDir, 'recipes.json'),
  JSON.stringify(recipes, null, 2)
);
console.log(`   ✓ ${recipes.length} recipes`);

// Transform Batches
console.log('🧫 Transforming batches...');
const batches = data.batches.map(b => {
  const species = data.species.find(s => s.id === b.species_id);
  const recipe = data.recipe_mixes.find(r => r.id === b.recipe_id);
  
  return {
    id: b.batch_id,
    name: `${species ? species.common_name : 'Unknown'} - ${b.batch_id}`,
    species: species ? species.common_name : 'Unknown',
    species_id: `species-${b.species_id}`,
    recipe: recipe ? recipe.name : 'Unknown',
    recipe_id: `recipe-${b.recipe_id}`,
    start_date: b.start_date,
    stage: b.stage,
    status: mapStageToStatus(b.stage),
    vessel_type: b.vessel_type || 'Unknown',
    temperature: b.temperature || '',
    humidity: b.humidity || '',
    success_rating: b.success_rating || 5,
    notes: b.notes || '',
    image_path: b.image_path,
    created_at: b.created_at
  };
});

fs.writeFileSync(
  path.join(dataDir, 'batches.json'),
  JSON.stringify(batches, null, 2)
);
console.log(`   ✓ ${batches.length} batches`);

// Transform Observations
console.log('📊 Transforming observations...');
const observations = data.observations.map(o => {
  const batch = data.batches.find(b => b.id === o.batch_id);
  
  return {
    id: `obs-${o.id}`,
    batch_id: batch ? batch.batch_id : `unknown-${o.batch_id}`,
    observation_date: o.observation_date.split(' ')[0], // Extract date only
    observation_type: o.observation_type,
    observer: o.created_by || 'Unknown',
    growth_stage: mapGrowthStage(o.growth_stage),
    visual_assessment: o.visual_assessment,
    contamination: o.contamination_detected === 1,
    temperature: o.temperature || '',
    humidity: o.humidity || '',
    notes: o.notes || '',
    image_path: o.image_path,
    created_at: o.created_at
  };
});

fs.writeFileSync(
  path.join(dataDir, 'observations.json'),
  JSON.stringify(observations, null, 2)
);
console.log(`   ✓ ${observations.length} observations`);

// Create metadata
const metadata = {
  export_date: data.export_date,
  transformed_date: new Date().toISOString(),
  source_file: exportFile,
  record_counts: {
    species: species.length,
    ingredients: ingredients.length,
    recipes: recipes.length,
    batches: batches.length,
    observations: observations.length
  }
};

fs.writeFileSync(
  path.join(dataDir, '_metadata.json'),
  JSON.stringify(metadata, null, 2)
);

console.log('\n✅ Transformation complete!');
console.log(`📁 Output directory: ${dataDir}\n`);
console.log('Summary:');
console.log(`  Species: ${species.length}`);
console.log(`  Ingredients: ${ingredients.length}`);
console.log(`  Recipes: ${recipes.length}`);
console.log(`  Batches: ${batches.length}`);
console.log(`  Observations: ${observations.length}`);

// Helper functions
function categorizeIngredient(name, description) {
  const lower = (name + ' ' + description).toLowerCase();
  
  if (lower.includes('water') || lower.includes('distilled')) return 'base';
  if (lower.includes('honey') || lower.includes('syrup') || lower.includes('sugar')) return 'sugar';
  if (lower.includes('yeast') || lower.includes('peptide') || lower.includes('protein')) return 'nutrient';
  if (lower.includes('grain') || lower.includes('rice') || lower.includes('rye')) return 'grain';
  if (lower.includes('agar') || lower.includes('gypsum') || lower.includes('calcium')) return 'additive';
  
  return 'other';
}

function determineRecipeType(name) {
  const lower = name.toLowerCase();
  
  if (lower.includes('liquid') || lower.includes('lc')) return 'liquid_culture';
  if (lower.includes('agar') || lower.includes('mea') || lower.includes('pda')) return 'agar';
  if (lower.includes('grain') || lower.includes('spawn')) return 'grain_spawn';
  if (lower.includes('substrate') || lower.includes('bulk')) return 'substrate';
  
  return 'other';
}

function mapStageToStatus(stage) {
  if (!stage) return 'unknown';
  
  const lower = stage.toLowerCase();
  
  if (lower.includes('preparat')) return 'preparing';
  if (lower.includes('coloniz')) return 'colonizing';
  if (lower.includes('fruit')) return 'fruiting';
  if (lower.includes('harvest')) return 'harvested';
  if (lower.includes('contamin')) return 'contaminated';
  
  return stage;
}

function mapGrowthStage(stage) {
  if (!stage) return undefined;
  
  const lower = stage.toLowerCase();
  
  if (lower.includes('inocul')) return 'inoculation';
  if (lower.includes('early') && lower.includes('coloniz')) return 'colonization';
  if (lower.includes('active') && lower.includes('coloniz')) return 'colonization';
  if (lower.includes('full') && lower.includes('coloniz')) return 'colonization';
  if (lower.includes('pin')) return 'pinning';
  if (lower.includes('fruit')) return 'fruiting';
  if (lower.includes('harvest')) return 'harvest';
  
  return undefined;
}
