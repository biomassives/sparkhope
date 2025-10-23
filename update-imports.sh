#!/bin/bash
find packages/site-en/src/pages -type f -name "*.astro" -exec sed -i \
  -e "s|from '../../layouts/Layout.astro'|from '@sparkhope/core/Layout.astro'|g" \
  -e "s|from '../../lib/initData.js'|from '@sparkhope/core/lib/initData.js'|g" \
  -e "s|from '../../types/database'|from '@sparkhope/core/types'|g" \
  {} \;
