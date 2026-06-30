import { writeFileSync, existsSync, mkdirSync } from 'fs'
import { resolve, dirname } from 'path'

import { PROJECTS } from '../src/data/projectsData.js'
import { SERVICES } from '../src/data/servicesData.js'

const DOMAIN = 'https://dezolastudio.name.ng'
const TODAY = new Date().toISOString().split('T')[0]
const OUTPUT = resolve('public/sitemap.xml')

function esc(str) {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

function url(loc, priority, changefreq) {
  return `  <url>
    <loc>${esc(loc)}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
}

const urls = []

urls.push(url(`${DOMAIN}/`, '1.0', 'weekly'))
urls.push(url(`${DOMAIN}/projects`, '0.8', 'monthly'))

for (const svc of SERVICES) {
  urls.push(url(`${DOMAIN}/services/${svc.slug}`, '0.6', 'monthly'))
}

const seen = new Set()
for (const p of PROJECTS) {
  const key = `${p.id}|${p.category.toLowerCase()}`
  if (seen.has(key)) continue
  seen.add(key)
  urls.push(url(`${DOMAIN}/project/${p.id}/${p.category.toLowerCase()}`, '0.6', 'monthly'))
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>
`

const dir = dirname(OUTPUT)
if (!existsSync(dir)) mkdirSync(dir, { recursive: true })
writeFileSync(OUTPUT, xml, 'utf-8')

console.log(`✅ Sitemap generated with ${urls.length} URLs at public/sitemap.xml`)
