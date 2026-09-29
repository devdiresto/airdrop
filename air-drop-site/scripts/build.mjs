import { mkdir, writeFile, access, unlink } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { site, services } from '../src/site.config.mjs';
import { homePage, servicePage, privacyPage, termsPage, warrantyPage, notFoundPage } from '../src/templates.mjs';
import { publicUrl, mapsUrl, safeJson, escapeHtml } from '../src/helpers.mjs';
import { publicationIssues } from '../src/validation.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const out = path.join(root, 'dist');
const {errors} = publicationIssues(site);
if (site.publishReady && errors.length) throw new Error('Complete a configuração antes de gerar a versão pública:\n- '+errors.join('\n- '));
if (site.logo) {
  if (!/^\/assets\/img\/[a-zA-Z0-9_./-]+$/.test(site.logo) || site.logo.includes('..')) throw new Error('Use um logo local dentro de /assets/img/, com nome sem espaços.');
  await access(path.join(out,site.logo));
}
const routes = new Map([
  ['/', homePage()],
  ...services.map(service => [`/servicos/${service.slug}/`,servicePage(service)]),
  ['/garantia/',warrantyPage()],
  ['/privacidade/',privacyPage()],
  ['/termos/',termsPage()]
]);
for (const [route,html] of routes) {
  const destination = path.join(out,route,'index.html');
  await mkdir(path.dirname(destination),{recursive:true});
  await writeFile(destination, html+'\n');
}
await writeFile(path.join(out,'404.html'),notFoundPage()+'\n');
const mapsEmbed = mapsUrl(site.maps);
const fallbackQuery = site.maps.mode === 'place' ? site.maps.query : site.maps.center;
const config = {
  brand:site.brand,
  whatsapp:site.contact.whatsapp,
  maps:{embedUrl:mapsEmbed,title:site.maps.title,fallbackUrl:publicUrl(site.maps.linkUrl)||`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fallbackQuery)}`},
  tracking:site.tracking
};
await writeFile(path.join(out,'assets/js/config.js'),`// Gerado por scripts/build.mjs. Edite src/site.config.mjs.\nexport const config = ${JSON.stringify(config,null,2)};\n`);
const origin = publicUrl(site.url)?.replace(/\/$/,'');
await writeFile(path.join(out,'robots.txt'),`User-agent: *\nDisallow:\n${origin ? `\nSitemap: ${origin}/sitemap.xml\n` : ''}`);
if (origin) {
  await writeFile(path.join(out,'sitemap.xml'),`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${[...routes.keys()].map(route=>`  <url><loc>${escapeHtml(origin+route)}</loc></url>`).join('\n')}\n</urlset>\n`);
} else {
  try { await unlink(path.join(out,'sitemap.xml')); } catch (error) { if(error.code!=='ENOENT') throw error; }
}
console.log(`${routes.size+1} páginas geradas. Arquivos publicáveis: dist/`);
console.log(site.publishReady ? 'Modo público. Revise o conteúdo e as integrações no domínio final.' : 'Modo de edição: metadados noindex. Preencha os dados antes de publicar.');
