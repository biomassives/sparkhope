#!/usr/bin/env perl
use strict;
use warnings;
use File::Find;
use File::Slurp;

print "🍄 Starting Astro page conversion...\n\n";

# Process both sites
for my $site ('packages/site-es', 'packages/site-en') {
    print "Processing $site...\n";
    
    my $pages_dir = "$site/src/pages";
    next unless -d $pages_dir;
    
    # Find all .astro files
    find(sub {
        return unless /\.astro$/;
        return if /^index\.astro$/ && $File::Find::dir =~ /pages$/; # Skip main index
        
        my $file = $File::Find::name;
        print "  Converting: $file\n";
        
        my $content = read_file($file);
        my $original = $content;
        
        # Replace initData imports - using proper escaping
        $content =~ s/import\s+\{\s*initializeDataStore\s*\}\s+from\s+['"].*?initData\.js['"];/import { getAllSamples, getSampleById, getAllProjects, getProjectById, getAllSpecies, getSpeciesById, getAllBatches, getBatchById, getAllRecipes, getRecipeById, getAllObservations, getObservationById, getAllRacks, getRackById, getAllIngredients, getIngredientById } from '..\/..\/utils\/loadData';/;
        
        # Replace data store initialization
        $content =~ s/const\s+store\s+=\s+await\s+initializeDataStore\(\);?\s*\n//g;
        
        # Replace store.entity.getAll() calls
        $content =~ s/await\s+store\.samples\.getAll\(\)/getAllSamples()/g;
        $content =~ s/await\s+store\.projects\.getAll\(\)/getAllProjects()/g;
        $content =~ s/await\s+store\.species\.getAll\(\)/getAllSpecies()/g;
        $content =~ s/await\s+store\.batches\.getAll\(\)/getAllBatches()/g;
        $content =~ s/await\s+store\.recipes\.getAll\(\)/getAllRecipes()/g;
        $content =~ s/await\s+store\.observations\.getAll\(\)/getAllObservations()/g;
        $content =~ s/await\s+store\.racks\.getAll\(\)/getAllRacks()/g;
        $content =~ s/await\s+store\.ingredients\.getAll\(\)/getAllIngredients()/g;
        
        # Replace store.entity.getById() calls
        $content =~ s/await\s+store\.samples\.getById\((.*?)\)/getSampleById($1)/g;
        $content =~ s/await\s+store\.projects\.getById\((.*?)\)/getProjectById($1)/g;
        $content =~ s/await\s+store\.species\.getById\((.*?)\)/getSpeciesById($1)/g;
        $content =~ s/await\s+store\.batches\.getById\((.*?)\)/getBatchById($1)/g;
        $content =~ s/await\s+store\.recipes\.getById\((.*?)\)/getRecipeById($1)/g;
        $content =~ s/await\s+store\.observations\.getById\((.*?)\)/getObservationById($1)/g;
        $content =~ s/await\s+store\.racks\.getById\((.*?)\)/getRackById($1)/g;
        $content =~ s/await\s+store\.ingredients\.getById\((.*?)\)/getIngredientById($1)/g;
        
        # Remove optional chaining that's no longer needed
        $content =~ s/store\.(\w+)\?\.getAll\(\)/getAll\u$1()/g;
        
        # Handle lines like: const samples: Sample[] = await store.samples.getAll();
        $content =~ s/const\s+(\w+):\s*\w+\[\]\s*=\s*await\s+store\.(\w+)\.getAll\(\);/const $1 = getAll\u$2();/g;
        
        # Remove @sparkhope/core imports - properly escaped
        $content =~ s/import.*?from\s+['"]\@sparkhope\/core.*?['"];?\s*\n//g;
        
        # Remove type imports we don't need anymore
        $content =~ s/import\s+type\s+\{[^}]*\}\s+from\s+['"].*?types\/database['"];?\s*\n//g;
        
        if ($content ne $original) {
            write_file($file, $content);
            print "    ✓ Converted\n";
        } else {
            print "    - No changes needed\n";
        }
        
    }, $pages_dir);
}

print "\n✅ Conversion complete!\n";
