#!/usr/bin/env perl
use strict;
use warnings;
use File::Find;
use File::Slurp;

print "🍄 Smart Astro page conversion (preserving features)...\n\n";

sub convert_file {
    my ($file) = @_;
    my $content = read_file($file);
    my $original = $content;
    
    # Step 1: Replace Layout import
    $content =~ s/import Layout from '\@sparkhope\/core\/Layout\.astro';/import Layout from '..\/..\/layouts\/Layout.astro';/g;
    
    # Step 2: Replace initData import with loadData
    $content =~ s/import \{ initializeDataStore \} from '\@sparkhope\/core\/lib\/initData\.js';/import { getAllSamples, getSampleById, getAllProjects, getProjectById, getAllSpecies, getSpeciesById, getAllBatches, getBatchById, getAllRecipes, getRecipeById, getAllObservations, getObservationById, getAllRacks, getRackById, getAllIngredients, getIngredientById } from '..\/..\/utils\/loadData';/g;
    
    # Step 3: Remove type imports
    $content =~ s/import type \{[^}]+\} from '\@sparkhope\/core\/types';?\s*\n//g;
    
    # Step 4: Remove store initialization
    $content =~ s/const store = await initializeDataStore\(\);\s*\n//g;
    
    # Step 5: Convert store calls to direct function calls
    # Handle typed arrays first: const samples: Sample[] = await store.samples.getAll();
    $content =~ s/const (samples):\s*Sample\[\]\s*=\s*await store\.samples\.getAll\(\);/const $1 = getAllSamples();/g;
    $content =~ s/const (racks):\s*Rack\[\]\s*=\s*await store\.racks\.getAll\(\);/const $1 = getAllRacks();/g;
    $content =~ s/const (projects):\s*\w+\[\]\s*=\s*await store\.projects\.getAll\(\);/const $1 = getAllProjects();/g;
    $content =~ s/const (species):\s*\w+\[\]\s*=\s*await store\.species\.getAll\(\);/const $1 = getAllSpecies();/g;
    $content =~ s/const (batches):\s*\w+\[\]\s*=\s*await store\.batches\.getAll\(\);/const $1 = getAllBatches();/g;
    $content =~ s/const (recipes):\s*\w+\[\]\s*=\s*await store\.recipes\.getAll\(\);/const $1 = getAllRecipes();/g;
    $content =~ s/const (observations):\s*\w+\[\]\s*=\s*await store\.observations\.getAll\(\);/const $1 = getAllObservations();/g;
    $content =~ s/const (ingredients):\s*\w+\[\]\s*=\s*await store\.ingredients\.getAll\(\);/const $1 = getAllIngredients();/g;
    
    # Handle regular getAll calls
    $content =~ s/await store\.samples\.getAll\(\)/getAllSamples()/g;
    $content =~ s/await store\.projects\.getAll\(\)/getAllProjects()/g;
    $content =~ s/await store\.species\.getAll\(\)/getAllSpecies()/g;
    $content =~ s/await store\.batches\.getAll\(\)/getAllBatches()/g;
    $content =~ s/await store\.recipes\.getAll\(\)/getAllRecipes()/g;
    $content =~ s/await store\.observations\.getAll\(\)/getAllObservations()/g;
    $content =~ s/await store\.racks\.getAll\(\)/getAllRacks()/g;
    $content =~ s/await store\.ingredients\.getAll\(\)/getAllIngredients()/g;
    
    # Handle getById calls
    $content =~ s/await store\.samples\.getById\(([^)]+)\)/getSampleById($1)/g;
    $content =~ s/await store\.projects\.getById\(([^)]+)\)/getProjectById($1)/g;
    $content =~ s/await store\.species\.getById\(([^)]+)\)/getSpeciesById($1)/g;
    $content =~ s/await store\.batches\.getById\(([^)]+)\)/getBatchById($1)/g;
    $content =~ s/await store\.recipes\.getById\(([^)]+)\)/getRecipeById($1)/g;
    $content =~ s/await store\.observations\.getById\(([^)]+)\)/getObservationById($1)/g;
    $content =~ s/await store\.racks\.getById\(([^)]+)\)/getRackById($1)/g;
    $content =~ s/await store\.ingredients\.getById\(([^)]+)\)/getIngredientById($1)/g;
    
    return ($content, $content ne $original);
}

# Process both sites
for my $site ('packages/site-es', 'packages/site-en') {
    print "Processing $site...\n";
    
    my $pages_dir = "$site/src/pages";
    next unless -d $pages_dir;
    
    find(sub {
        return unless /\.astro$/;
        return if $File::Find::name =~ /index\.astro$/ && $File::Find::dir =~ /pages$/;
        
        my $file = $File::Find::name;
        print "  Converting: $file\n";
        
        my ($new_content, $changed) = convert_file($file);
        
        if ($changed) {
            write_file($file, $new_content);
            print "    ✓ Converted\n";
        } else {
            print "    - No changes\n";
        }
        
    }, $pages_dir);
}

print "\n✅ Smart conversion complete!\n";
