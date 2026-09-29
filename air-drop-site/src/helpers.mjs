export const escapeHtml = (value = '') => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
export const safeJson = value => JSON.stringify(value).replace(/</g, '\\u003c').replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029');
export function publicUrl(value) {
  if (!value) return '';
  try { const u = new URL(value); return u.protocol === 'https:' ? u.href : ''; } catch { return ''; }
}
export function whatsappUrl(phone, message) {
  const digits = String(phone || '').replace(/\D/g, '');
  return /^55\d{10,11}$/.test(digits) ? `https://wa.me/${digits}?text=${encodeURIComponent(message)}` : '';
}
export function formatPhone(value) {
  const digits = String(value || '').replace(/\D/g, '');
  const match = digits.match(/^55(\d{2})(\d{4,5})(\d{4})$/);
  return match ? `(${match[1]}) ${match[2]}-${match[3]}` : '';
}
export function validCenter(value) {
  if (!/^\s*-?\d+(\.\d+)?\s*,\s*-?\d+(\.\d+)?\s*$/.test(String(value))) return false;
  const [lat, lng] = value.split(',').map(Number);
  return Math.abs(lat) <= 90 && Math.abs(lng) <= 180;
}
export function mapsUrl(maps) {
  if (!maps.enabled || !maps.apiKey) return '';
  const mode = maps.mode === 'place' ? 'place' : 'view';
  if (mode === 'view' && !validCenter(maps.center)) return '';
  if (mode === 'place' && !maps.query?.trim()) return '';
  const q = new URLSearchParams({key:maps.apiKey, language:'pt-BR', region:'BR', zoom:String(Math.max(0, Math.min(21, Number(maps.zoom) || 12)))});
  q.set(mode === 'view' ? 'center' : 'q', mode === 'view' ? maps.center : maps.query);
  return `https://www.google.com/maps/embed/v1/${mode}?${q}`;
}
