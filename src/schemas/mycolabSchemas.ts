// src/schemas/mycolabSchemas.ts
import { z } from 'astro:content';

export const observationSchema = z.object({
  title: z.string().optional(),
  batch_id: z.string().optional(),
  observation_date: z.string().optional(),
  description: z.string().optional(),
  observer: z.string().optional(),
  growth_stage: z.enum(['inoculation', 'colonization', 'pinning', 'fruiting', 'harvest']).optional(),
  contamination: z.boolean().optional(),
  contamination_type: z.string().optional(),
  conditions: z.object({
    temperature: z.number().optional(),
    humidity: z.number().optional(),
    light_exposure: z.string().optional(),
    air_exchange: z.string().optional(),
  }).optional(),
  notes: z.string().optional(),
  images: z.array(z.string()).optional(),
  species: z.array(z.string()).optional(),
  ingredients: z.array(z.string()).optional(),
  recipes: z.array(z.string()).optional(),
});

export const speciesSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  species_id: z.string().optional(),
  scientific_name: z.string().optional(),
  common_names: z.array(z.string()).optional(),
  family: z.string().optional(),
  difficulty: z.enum(['easy', 'moderate', 'challenging']).optional(),
  suitable_substrates: z.array(z.string()).optional(),
  nutritional_profile: z.object({
    protein: z.number().optional(),
    fiber: z.number().optional(),
    vitamins: z.array(z.string()).optional(),
  }).optional(),
  medicinal_properties: z.array(z.string()).optional(),
  culinary_uses: z.string().optional(),
});

export const recipeSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  recipe_id: z.string().optional(),
  recipe_type: z.enum(['agar', 'liquid_culture', 'spawn', 'substrate', 'bulk']).optional(),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
  ingredients: z.array(z.string()).optional(),
  instructions: z.array(z.string()).optional(),
  sterilization_method: z.string().optional(),
  yield: z.string().optional(),
  suitable_species: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
});

