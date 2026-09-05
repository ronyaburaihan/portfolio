import { $ } from './dom.js';

export function initTheme() {
    const root = document.documentElement;
          const MOON = 'M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z';
          const SUN = 'M12 4.2V2m0 20v-2.2M4.2 12H2m20 0h-2.2M6.3 6.3 4.8 4.8m14.4 14.4-1.5-1.5M6.3 17.7l-1.5 1.5M19.2 4.8l-1.5 1.5M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0z';
          const systemDark = matchMedia('(prefers-color-scheme: dark)');

          function current() {
              return root.getAttribute('data-theme') || (systemDark.matches ? 'dark' : 'light');
          }
          function paint() {
              const dark = current() === 'dark';
              $('#themeIcon').setAttribute('d', dark ? SUN : MOON);
              $('#themeBtn').setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
              document.querySelector('meta[name="theme-color"]').content = dark ? '#101722' : '#f7f8fa';
          }
          let saved; try { saved = localStorage.getItem('theme'); } catch (_) {}
          if (saved === 'dark' || saved === 'light') root.setAttribute('data-theme', saved);
          paint();
          // Follow the OS until the visitor makes their own choice.
          systemDark.addEventListener('change', () => { if (!root.getAttribute('data-theme')) paint(); });
          $('#themeBtn').addEventListener('click', () => {
              const next = current() === 'dark' ? 'light' : 'dark';
              root.setAttribute('data-theme', next);
              try { localStorage.setItem('theme', next); } catch (_) {}
              paint();
          });
}
