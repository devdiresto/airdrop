const STORAGE_KEY = 'airdrop-consent-v1';
const MAX_AGE = 180 * 24 * 60 * 60 * 1000;

export function readChoice(storage, now = Date.now()) {
  try {
    const value = JSON.parse(storage.getItem(STORAGE_KEY));
    if (value && ['granted', 'denied'].includes(value.choice) && Number.isFinite(value.at) && now >= value.at && now - value.at < MAX_AGE) return value.choice;
  } catch { /* Navegadores podem bloquear o armazenamento local. */ }
  return null;
}

export function initTracking(config) {
  const id = String(config.tracking?.googleAdsId || '');
  const label = String(config.tracking?.whatsappConversionLabel || '');
  const enabled = /^AW-\d+$/.test(id);
  const banner = document.querySelector('.cookie-banner');
  let storage;
  try { storage = window.localStorage; } catch { storage = null; }
  let consent = readChoice(storage);
  let loaded = false;
  let lastClick = 0;

  function loadTag() {
    if (!enabled || loaded || consent !== 'granted') return;
    loaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('consent', 'default', {
      ad_storage: 'denied', analytics_storage: 'denied',
      ad_user_data: 'denied', ad_personalization: 'denied'
    });
    window.gtag('consent', 'update', {
      ad_storage: 'granted', analytics_storage: 'denied',
      ad_user_data: 'granted', ad_personalization: 'denied'
    });
    window.gtag('js', new Date());
    window.gtag('config', id, { allow_ad_personalization_signals: false });
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
    script.id = 'google-ads-tag';
    document.head.append(script);
  }

  function setConsent(choice) {
    consent = choice;
    try { storage?.setItem(STORAGE_KEY, JSON.stringify({ choice, at: Date.now() })); } catch { /* Preferência vale nesta página mesmo sem armazenamento. */ }
    if (banner) banner.hidden = true;
    if (choice === 'granted') loadTag();
    else if (loaded) {
      window.gtag?.('consent', 'update', {ad_storage:'denied',analytics_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
      // Remove a tag em memória em vez de continuar a sessão de medição.
      window.location.reload();
    }
  }

  if (enabled) {
    if (consent === 'granted') loadTag();
    else if (!consent && banner) banner.hidden = false;
    document.querySelectorAll('[data-consent]').forEach(button => button.addEventListener('click', () => {
      setConsent(button.dataset.consent);
    }));
    document.querySelectorAll('[data-cookie-settings]').forEach(button => button.addEventListener('click', () => {
      if (!banner) return;
      banner.hidden = false;
      banner.querySelector('button')?.focus();
    }));
  }

  // Mede CLIQUE, não conversa iniciada, mensagem recebida ou serviço fechado.
  // Nenhum campo do formulário é enviado à tag. Não há conversões avançadas.
  return function trackWhatsApp(source) {
    if (!enabled || !loaded || consent !== 'granted' || !/^[A-Za-z0-9_-]+$/.test(label)) return;
    const now = Date.now();
    if (now - lastClick < 1200) return;
    lastClick = now;
    window.gtag?.('event', 'conversion', { send_to: `${id}/${label}`, transport_type: 'beacon' });
  };
}
