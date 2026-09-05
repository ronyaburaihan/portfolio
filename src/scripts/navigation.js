import { $, $$ } from './dom.js';

export function initNavigation() {
    const menu = $('#menuBtn');
          function closeMenu() { menu.setAttribute('aria-expanded', 'false'); menu.setAttribute('aria-label', 'Open navigation'); $('#nav').classList.remove('is-open'); }
          menu.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded', String(open)); menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation'); $('#nav').classList.toggle('is-open', open); });
          $$('#nav a').forEach(a => a.addEventListener('click', closeMenu));
          document.addEventListener('keydown', e => { if (e.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') { closeMenu(); menu.focus(); } });
          document.addEventListener('click', e => { if (!$('#top').contains(e.target)) closeMenu(); });

          /* ---------- sticky header + active nav ---------- */
          const top = $('#top');
          addEventListener('scroll', () => top.classList.toggle('stuck', scrollY > 8), { passive: true });

          const links = $$('#nav a');
          const navIO = new IntersectionObserver(es => es.forEach(e => {
              if (!e.isIntersecting) return;
              links.forEach(a => a.classList.toggle('on', a.getAttribute('href') === '#' + e.target.id));
          }), { rootMargin: '-45% 0px -50% 0px' });
          links.map(a => a.getAttribute('href').slice(1)).forEach(id => {
              const el = document.getElementById(id); if (el) navIO.observe(el);
          });

          navIO.observe(document.getElementById('top-hero'));
}
