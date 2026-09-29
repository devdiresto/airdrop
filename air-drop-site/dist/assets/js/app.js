import { config } from './config.js';
import { initContact } from './contact.js';
import { initMap } from './maps.js';
import { initTracking } from './tracking.js';

const toggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#mobile-nav');
function closeMenu() {
  if (!toggle || !navigation) return;
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', 'Abrir menu');
  navigation.hidden = true;
}
if (toggle && navigation) {
  toggle.hidden = false;
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    navigation.hidden = !open;
  });
  navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !navigation.hidden) { closeMenu(); toggle.focus(); }
  });
  window.matchMedia('(min-width: 901px)').addEventListener('change', event => { if (event.matches) closeMenu(); });
}

const filters = document.querySelector('.service-filters');
const cards = [...document.querySelectorAll('.services-grid .service-card')];
if (filters) {
  filters.hidden = false;
  filters.querySelectorAll('button').forEach(button => button.addEventListener('click', () => {
    const category = button.dataset.filter;
    filters.querySelectorAll('button').forEach(item => {
      const selected = item === button;
      item.classList.toggle('active', selected);
      item.setAttribute('aria-pressed', String(selected));
    });
    let count = 0;
    cards.forEach(card => { card.hidden = category !== 'all' && card.dataset.category !== category; if (!card.hidden) count++; });
    document.querySelector('.services-grid')?.classList.toggle('is-filtered', category !== 'all');
    document.querySelector('#filter-status').textContent = `${count} ${count === 1 ? 'serviço disponível' : 'serviços disponíveis'} nesta categoria.`;
  }));
}

const track = initTracking(config);
initContact(config, track);
initMap(config);
