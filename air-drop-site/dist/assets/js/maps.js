export function initMap(config) {
  const button = document.querySelector('#load-map');
  const panel = document.querySelector('#map-panel');
  if (!button || !panel || !config.maps?.embedUrl) return;
  button.addEventListener('click', () => {
    let url;
    try { url = new URL(config.maps.embedUrl); } catch { return; }
    if (url.origin !== 'https://www.google.com' || !url.pathname.startsWith('/maps/embed/v1/')) return;
    const iframe = document.createElement('iframe');
    iframe.title = config.maps.title || 'Região de atendimento';
    iframe.src = url.href;
    iframe.width = '600';
    iframe.height = '460';
    iframe.loading = 'eager';
    iframe.referrerPolicy = 'strict-origin-when-cross-origin';
    iframe.allowFullscreen = true;
    const help = document.createElement('p');
    help.className = 'map-help';
    help.append('Mapa fornecido pelo Google. Se ele não aparecer, ');
    const link = document.createElement('a');
    link.href = config.maps.fallbackUrl;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.textContent = 'abra a região no Google Maps';
    help.append(link, '. A disponibilidade no seu endereço é confirmada no atendimento.');
    panel.replaceChildren(iframe, help);
    iframe.focus();
  }, { once: true });
}
