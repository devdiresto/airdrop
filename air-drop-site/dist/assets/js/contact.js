/** Mensagem enviada apenas quando o visitante continua para o WhatsApp. */
export function makeWhatsappUrl(phone, message) {
  const digits = String(phone || '').replace(/\D/g, '');
  if (!/^55\d{10,11}$/.test(digits)) return '';
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export function makeQuoteMessage({ model, service, neighborhood, details }, brand = 'Air Drop') {
  return [
    `Olá, ${brand}! Gostaria de um orçamento para reparo de iPhone a domicílio.`,
    '',
    `Modelo: ${String(model).trim()}`,
    `Serviço: ${String(service).trim()}`,
    `Bairro/cidade: ${String(neighborhood).trim()}`,
    ...(String(details || '').trim() ? [`Problema: ${String(details).trim()}`] : []),
    '',
    'Podem confirmar a disponibilidade, o valor e as condições do atendimento?'
  ].join('\n');
}

export function initContact(config, track) {
  document.querySelectorAll('a[data-whatsapp]').forEach(link => link.addEventListener('click', () => track('direct_link')));
  const form = document.querySelector('#quote-form');
  if (!form) return;
  const submit = form.querySelector('[data-enable-contact]');
  if (submit) submit.disabled = false;
  form.addEventListener('submit', event => {
    event.preventDefault();
    const status = document.querySelector('#quote-status');
    status.textContent = '';
    if (!form.reportValidity()) return;
    const fields = new FormData(form);
    if (!String(fields.get('neighborhood') || '').trim()) {
      status.textContent = 'Informe seu bairro e sua cidade para consultar o atendimento.';
      form.elements.neighborhood.focus();
      return;
    }
    const selected = form.elements.service;
    const message = makeQuoteMessage({
      model: fields.get('model'),
      service: selected.options[selected.selectedIndex].textContent,
      neighborhood: fields.get('neighborhood'),
      details: fields.get('details')
    }, config.brand);
    const url = makeWhatsappUrl(config.whatsapp, message);
    if (!url) {
      status.textContent = 'O canal de atendimento ainda não está disponível neste site. Tente novamente mais tarde.';
      return;
    }
    track('quote_form');
    // Abre na mesma aba: evita bloqueio de pop-up e funciona também em celulares.
    // Nenhum dado do formulário é gravado no navegador ou enviado a um servidor próprio.
    window.location.assign(url);
  });
}
