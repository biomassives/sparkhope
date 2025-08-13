import { createWriteStream } from 'node:fs'
import { resolve } from 'node:path'
import { SitemapStream } from 'sitemap'
import globby from 'globby'

const HOSTNAME = (process.env.SITE_URL || 'https://sparkhope.vercel.app').replace(/\/$/, '')
const DIST = resolve('docs/.vuepress/dist')

// find all built HTML files
const files = await globby(['**/*.html'], { cwd: DIST })

const sm = new SitemapStream({ hostname: HOSTNAME })
const out = createWriteStream(resolve(DIST, 'sitemap.xml'))
sm.pipe(out)

for (const f of files) {
  if (f === '404.html' || f.endsWith('/404.html')) continue
  // pretty URLs: drop "index.html" or ".html"
  const url = '/' + f.replace(/index\.html$/, '').replace(/\.html$/, '')
  sm.write({ url })
}

sm.end()
await new Promise(r => out.on('finish', r))
console.log('✔ sitemap.xml generated')

