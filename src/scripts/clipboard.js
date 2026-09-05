import { $, $$ } from './dom.js';

export function initClipboard() {
    let toastT;
          function toast(msg) {
              const t = $('#toast'); t.textContent = msg; t.classList.add('show');
              clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('show'), 2400);
          }
          $$('[data-copy]').forEach(b => b.addEventListener('click', () => {
              const txt = b.dataset.copy;
              const done = () => toast(b.dataset.msg);
              if (navigator.clipboard) navigator.clipboard.writeText(txt).then(done).catch(fallback);
              else fallback();
              function fallback() {
                  const ta = document.createElement('textarea');
                  ta.value = txt; ta.style.position = 'fixed'; ta.style.opacity = '0';
                  document.body.appendChild(ta); ta.select();
                  try { document.execCommand('copy'); done(); } catch (_) { toast(txt); }
                  ta.remove();
              }
          }));
}
