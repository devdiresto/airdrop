import { readdir, readFile, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import assert from 'node:assert/strict';
import { escapeHtml, safeJson, mapsUrl } from '../src/helpers.mjs';
import { makeWhatsappUrl, makeQuoteMessage } from '../dist/assets/js/contact.js';
import { readChoice } from '../dist/assets/js/tracking.js';
import { site, services } from '../src/site.config.mjs';
import { publicationIssues } from '../src/validation.mjs';
const root=fileURLToPath(new URL('../',import.meta.url));
const output=path.join(root,'dist');
async function walk(directory){const entries=await readdir(directory,{withFileTypes:true});const nested=await Promise.all(entries.map(entry=>entry.isDirectory()?walk(path.join(directory,entry.name)):[path.join(directory,entry.name)]));return nested.flat();}
const files=await walk(output);
const pages=files.filter(f=>f.endsWith('.html'));
const pageContent=new Map(await Promise.all(pages.map(async file=>[file,await readFile(file,'utf8')])));
let references=0;
for(const [file,html] of pageContent){
  assert.equal((html.match(/<h1[ >]/g)||[]).length,1,`${file}: exige um h1.`);
  assert.match(html,/<html lang="pt-BR">/);
  assert.match(html,/<meta name="description"/);
  assert.match(html,/<link rel="icon"/);
  const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
  assert.equal(new Set(ids).size,ids.length,`${file}: IDs duplicados.`);
  for(const json of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g))JSON.parse(json[1]);
  for(const match of html.matchAll(/\b(?:href|src)="([^"<>]+)"/g)){
    const link=match[1].replaceAll('&amp;','&');
    if(!link.startsWith('/')&&!link.startsWith('#'))continue;
    const current='/'+path.relative(output,file).replaceAll(path.sep,'/').replace(/index\.html$/,'');
    const url=new URL(link,'https://local.invalid'+current);
    let target=path.join(output,decodeURIComponent(url.pathname));
    try{if((await stat(target)).isDirectory())target=path.join(target,'index.html');await stat(target);}catch{assert.fail(`${file}: referência inexistente ${link}`);}
    if(url.hash&&target.endsWith('.html')){
      const targetHtml=pageContent.get(target)||await readFile(target,'utf8');
      assert.ok(targetHtml.includes(`id="${decodeURIComponent(url.hash.slice(1))}"`),`${file}: âncora inexistente ${link}`);
    }
    references++;
  }
}
assert.equal(pages.length,services.length+5,'Todas as páginas pedidas devem existir.');
const codeFiles=[...files.filter(f=>f.endsWith('.js')),...(await walk(path.join(root,'src'))).filter(f=>f.endsWith('.mjs')),...(await walk(path.join(root,'scripts'))).filter(f=>f.endsWith('.mjs'))];
for(const file of codeFiles){const result=spawnSync(process.execPath,['--check',file],{encoding:'utf8'});assert.equal(result.status,0,result.stderr);}

// Casos de risco real: envio para número vazio, acentos no WhatsApp, mapa sem chave,
// HTML injetado pela configuração e medição sem consentimento válido.
assert.equal(makeWhatsappUrl('', 'Oi'),'');
assert.equal(makeWhatsappUrl('123','Oi'),'');
const message=makeQuoteMessage({model:'iPhone 15',service:'Troca de tela',neighborhood:'Centro, São Paulo',details:'Trincou & não responde'},'Air Drop');
const lead=new URL(makeWhatsappUrl('5511999999999',message));
assert.equal(lead.hostname,'wa.me');
assert.equal(lead.searchParams.get('text'),message);
assert.ok(message.includes('Centro, São Paulo'));
assert.equal(mapsUrl({enabled:false,apiKey:'test'}),'');
assert.equal(mapsUrl({enabled:true,apiKey:'test',mode:'view',center:'100,200'}),'');
const map=new URL(mapsUrl({enabled:true,apiKey:'test',mode:'view',center:'-23.55,-46.63',zoom:12}));
assert.equal(map.pathname,'/maps/embed/v1/view');
assert.equal(map.searchParams.get('center'),'-23.55,-46.63');
const place=new URL(mapsUrl({enabled:true,apiKey:'test',mode:'place',query:'place_id:EXAMPLE',zoom:14}));
assert.equal(place.searchParams.get('q'),'place_id:EXAMPLE');
assert.equal(escapeHtml('<script>"&'), '&lt;script&gt;&quot;&amp;');
assert.ok(!safeJson({text:'</script><script>alert(1)</script>'}).includes('</script>'));
assert.equal(readChoice({getItem(){throw Error('blocked');}}),null);
assert.equal(readChoice({getItem:()=>JSON.stringify({choice:'granted',at:1000})},1001),'granted');
assert.equal(readChoice({getItem:()=>JSON.stringify({choice:'granted',at:1})},200*86400000),null);
const missingPhone = structuredClone(site);
missingPhone.contact.whatsapp = '';
assert.ok(publicationIssues(missingPhone).errors.some(error => error.includes('whatsapp')),'Número ausente precisa ser detectado.');
console.log(`OK: ${pages.length} páginas, ${references} referências locais/âncoras e ${codeFiles.length} arquivos JavaScript.`);
console.log('OK: WhatsApp, codificação de mensagem, mapa, escape de conteúdo e validade do consentimento.');
console.log('Esta verificação não testa serviços externos nem substitui a conferência no navegador e no domínio final.');
