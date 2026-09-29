import { publicUrl, whatsappUrl, validCenter } from './helpers.mjs';

export function publicationIssues(site) {
  const errors = [];
  const warnings = [];
  if (!publicUrl(site.url)) errors.push('Informe site.url com o domínio final em HTTPS.');
  else {
    const url = new URL(site.url);
    if (url.pathname !== '/' || url.search || url.hash) errors.push('site.url deve conter somente a origem, sem caminho, consulta ou fragmento.');
    if (/example\.|seudominio|localhost|127\.0\.0\.1/i.test(url.hostname)) errors.push('Substitua o domínio de exemplo pelo domínio real.');
  }
  if (!whatsappUrl(site.contact.whatsapp, 'Olá')) errors.push('Informe contact.whatsapp com 55 + DDD + número real.');
  if (!site.contact.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(site.contact.email)) errors.push('Informe um e-mail real de contato e privacidade.');
  if (!site.business.legalName.trim()) errors.push('Informe a razão social ou o nome do responsável comercial.');
  if (!site.business.city.trim() || !site.business.state.trim()) errors.push('Informe a cidade e o estado da operação.');
  if (!site.delivery.areas.length) errors.push('Informe a lista real de bairros ou cidades atendidos.');
  if (!site.business.hours.trim()) errors.push('Informe os horários reais de atendimento.');
  if (!site.warranty.duration.trim() || !site.warranty.coverage.trim() || !site.warranty.conditions.trim()) errors.push('Preencha o prazo, a cobertura e as condições reais da garantia.');
  if (!site.business.cnpj.trim()) warnings.push('Preencha o CNPJ, se aplicável à sua operação.');
  if (!site.business.publicAddress.trim()) warnings.push('Revise a identificação/endereço comercial aplicável. Não anuncie uma loja inexistente.');
  if (!site.logo) warnings.push('Logo não inserido: a marca está em tipografia provisória.');
  if (site.maps.enabled) {
    if (!site.maps.apiKey) errors.push('maps.enabled está ativo, mas a chave da Maps Embed API está vazia.');
    if (!['view','place'].includes(site.maps.mode)) errors.push('maps.mode deve ser view ou place.');
    if (site.maps.mode === 'view' && !validCenter(site.maps.center)) errors.push('Informe maps.center com latitude e longitude válidas.');
    if (site.maps.mode === 'place' && !site.maps.query.trim()) errors.push('Informe o endereço ou Place ID verdadeiro em maps.query.');
  }
  if (site.tracking.googleAdsId && !/^AW-\d+$/.test(site.tracking.googleAdsId)) errors.push('tracking.googleAdsId precisa ter o formato AW-123456789.');
  if (site.tracking.whatsappConversionLabel && !/^[A-Za-z0-9_-]+$/.test(site.tracking.whatsappConversionLabel)) errors.push('Label de conversão inválido. Copie o valor fornecido pelo Google.');
  if (site.tracking.googleAdsId && !site.tracking.whatsappConversionLabel) warnings.push('Tag configurada sem label: não serão registrados eventos de conversão de WhatsApp.');
  return {errors, warnings};
}
