import { site } from '../src/site.config.mjs';
import { publicationIssues } from '../src/validation.mjs';
const {errors,warnings}=publicationIssues(site);
if(!site.publishReady) errors.push('Após revisar os dados reais, altere publishReady para true e execute npm run build.');
if(errors.length) console.log('DADOS PENDENTES\n'+errors.map(x=>'- '+x).join('\n'));
if(warnings.length) console.log('ITENS PARA REVISAR\n'+warnings.map(x=>'- '+x).join('\n'));
console.log('Esta verificação é técnica e de preenchimento. Ela não avalia elegibilidade nem aprovação no Google Ads.');
process.exitCode=errors.length?1:0;
