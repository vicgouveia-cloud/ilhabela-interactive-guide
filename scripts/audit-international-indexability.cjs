#!/usr/bin/env node
'use strict';

// Audit generated, indexable international pages before promoting a release.
// This deliberately does not make untranslated routes indexable.
const fs = require('node:fs');
const path = require('node:path');
const ROOT = path.resolve(__dirname, '..');
const SITE = 'https://ilhabelatrip.com';
const sitemap = fs.readFileSync(path.join(ROOT, 'sitemap.xml'), 'utf8');
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1]);
const failures = [];
const counts = {};
const langs = new Set(['pt', 'en', 'es', 'fr', 'he']);
const expectedLang = { pt: 'pt', en: 'en', es: 'es', fr: 'fr', he: 'he' };
for (const url of urls) {
  if (!url.startsWith(SITE + '/')) { failures.push('Unexpected host: ' + url); continue; }
  const pathname = new URL(url).pathname;
  const segments = pathname.split('/').filter(Boolean);
  const language = langs.has(segments[0]) && segments[0] !== 'pt' ? segments[0] : 'pt';
  counts[language] = (counts[language] || 0) + 1;
  const file = path.join(ROOT, ...segments, 'index.html');
  if (!fs.existsSync(file)) { failures.push('Missing HTML: ' + pathname); continue; }
  const html = fs.readFileSync(file, 'utf8');
  const canonical = html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i);
  if (!canonical || canonical[1] !== url) failures.push('Canonical mismatch: ' + pathname);
  if (/<meta\s+name=["']robots["']\s+content=["'][^"']*noindex/i.test(html)) failures.push('Sitemap includes noindex: ' + pathname);
  const langTag = html.match(/<html\s+[^>]*lang=["']([^"']+)["']/i);
  if (!langTag || langTag[1].split('-')[0] !== expectedLang[language]) failures.push('HTML language mismatch: ' + pathname);
  const alternateTags = [...html.matchAll(/<link\s+rel=["']alternate["']\s+hreflang=["']([^"']+)["']\s+href=["']([^"']+)["']/gi)];
  for (const [, alternateLang, alternateUrl] of alternateTags) {
    if (alternateLang === 'x-default') continue;
    if (!langs.has(alternateLang)) failures.push('Unknown hreflang: ' + pathname + ' ' + alternateLang);
    if (!urls.includes(alternateUrl)) failures.push('Alternate not in sitemap: ' + pathname + ' ' + alternateUrl);
  }
}
if (new Set(urls).size !== urls.length) failures.push('Duplicate sitemap URLs');
console.log('SEO international indexability audit:', JSON.stringify(counts));
if (failures.length) {
  console.error(failures.join('\n'));
  process.exitCode = 1;
} else {
  console.log('All ' + urls.length + ' sitemap URLs passed structural checks.');
}
