import { $ } from './dom.js';

export function initDemos() {
    const phoneT = $('#phoneT');
    if (!phoneT) return;

    let reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
          const demoControls = [];
          document.addEventListener('portfolio-motion-change', event => {
              reduced = event.detail.paused;
              timers.forEach(clearTimeout);
              demoControls.forEach(({ key, onShow }) => { if (live[key] && !document.hidden) onShow(); });
          });
          const timers = new Map();
          function later(key, fn, ms) { clearTimeout(timers.get(key)); timers.set(key, setTimeout(fn, ms)); }
          function stop(key) { clearTimeout(timers.get(key)); }

          function buzz(el) {
              if (reduced) return;
              el.animate([{ transform: 'translateX(0)' }, { transform: 'translateX(-2px)' },
              { transform: 'translateX(2px)' }, { transform: 'translateX(0)' }], { duration: 180 });
          }
          function tap(el, fn) {
              el.addEventListener('click', fn);
              el.addEventListener('keydown', e => {
                  if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fn(); }
              });
          }
          // Run onShow while visible; onHide the moment it leaves.
          const live = {};
          function autoplay(el, key, onShow, onHide) {
              demoControls.push({ key, onShow });
              live[key] = false;
              new IntersectionObserver(es => es.forEach(en => {
                  live[key] = en.isIntersecting;
                  en.isIntersecting ? onShow() : onHide();
              }), { threshold: .3 }).observe(el);
              document.addEventListener('visibilitychange',
                  () => document.hidden ? onHide() : (live[key] && onShow()));
          }

          /* ---- Turner: live translation ---- */
          const PHRASES = [
              { en: 'Where is the nearest pharmacy?', es: '¿Dónde está la farmacia más cercana?', ar: 'أين أقرب صيدلية؟', fr: 'Où est la pharmacie la plus proche ?' },
              { en: 'How do I get to the train station?', es: '¿Cómo llego a la estación de tren?', ar: 'كيف أصل إلى محطة القطار؟', fr: 'Comment aller à la gare ?' },
              { en: 'Could I see the menu, please?', es: '¿Podría ver el menú, por favor?', ar: 'هل يمكنني رؤية قائمة الطعام؟', fr: 'Puis-je voir le menu, s’il vous plaît ?' },
              { en: 'What time does the museum open?', es: '¿A qué hora abre el museo?', ar: 'متى يفتح المتحف؟', fr: 'À quelle heure ouvre le musée ?' }];
          const TL = { es: 'ESPAÑOL', ar: 'العربية', fr: 'FRANÇAIS' }, TL_ORDER = ['es', 'ar', 'fr'];
          const tWave = $('#tWave');
          if (!tWave) return;
          for (let i = 0; i < 13; i++) { const b = document.createElement('i'); b.style.setProperty('--i', i); tWave.appendChild(b); }
          let tIdx = 0;
          const popIn = (el, txt) => { el.textContent = txt; el.classList.remove('pop'); void el.offsetWidth; el.classList.add('pop'); };
          function tRun() {
              stop('t');
              if (!live.t || document.hidden) return;
              const p = PHRASES[tIdx], L = TL_ORDER[tIdx % 3];
              const showTarget = () => {
                  $('#tTgtLab').textContent = TL[L] + ' · TRANSLATED';
                  $('#tTgt').setAttribute('dir', L === 'ar' ? 'rtl' : 'ltr');
                  popIn($('#tTgt'), p[L]);
              };
              if (reduced) { popIn($('#tSrc'), p.en); showTarget(); $('#tStat').textContent = 'TAP FOR THE NEXT PHRASE'; return; }
              tWave.classList.add('on'); $('#tMic').classList.add('on');
              $('#tMode').textContent = 'LISTENING'; $('#tStat').textContent = 'LISTENING — SPEAK NOW';
              later('t', () => {
                  $('#tMode').textContent = 'TRANSLATING'; $('#tStat').textContent = 'TRANSLATING…';
                  popIn($('#tSrc'), p.en);
                  later('t', () => {
                      tWave.classList.remove('on'); $('#tMic').classList.remove('on');
                      showTarget(); $('#tStat').textContent = 'TAP FOR THE NEXT PHRASE';
                      later('t', () => { tIdx = (tIdx + 1) % PHRASES.length; tRun(); }, 2700);
                  }, 750);
              }, 1500);
          }
          tap(phoneT, () => { buzz(phoneT); tIdx = (tIdx + 1) % PHRASES.length; tRun(); });
          autoplay(phoneT, 't', tRun,
              () => { stop('t'); tWave.classList.remove('on'); $('#tMic').classList.remove('on'); });

          /* ---- ImproveType: predictive keyboard ---- */
          const DICT = ['the', 'and', 'you', 'that', 'with', 'have', 'this', 'from', 'they', 'will', 'there', 'their',
              'what', 'about', 'which', 'make', 'like', 'time', 'know', 'people', 'good', 'work', 'well', 'want',
              'hello', 'world', 'thanks', 'please', 'where', 'great', 'today', 'tomorrow', 'kotlin', 'compose',
              'flutter', 'mobile', 'android', 'build', 'ship', 'apps', 'code', 'keyboard', 'suggest', 'translate',
              'flow', 'language'];
          const KPH = ['ship apps', 'kotlin flow', 'hello world', 'type fast'];
          const phoneK = $('#phoneK'), kSugg = $('#kSugg'), kTxt = $('#kTxt'), kPh = $('#kPh');
          let kText = '', kPaused = false, ki = 0, kc = 0, kMode = 'type';
          function renderK() {
              kPh.style.display = kText ? 'none' : '';
              kTxt.textContent = kText;
              const w = (kText.match(/[a-z']+$/i) || [''])[0].toLowerCase();
              let out = [];
              if (w) {
                  out = DICT.filter(d => d.startsWith(w) && d !== w).sort((a, b) => a.length - b.length).slice(0, 3);
                  if (!out.length) out = DICT.filter(d => d.includes(w)).slice(0, 3);
              }
              if (!out.length) out = ['hello', 'kotlin', 'ship'];
              kSugg.innerHTML = out.map(x => `<span>${x}</span>`).join('');
          }
          const mkKey = (l, cls) => { const s = document.createElement('span'); s.className = 'dk-key' + (cls || ''); s.textContent = l; return s; };
          'qwertyuiop'.split('').forEach(c => $('#kR1').appendChild(mkKey(c.toUpperCase())));
          const r2 = $('#kR2'); r2.style.paddingInline = '12px';
          'asdfghjkl'.split('').forEach(c => r2.appendChild(mkKey(c.toUpperCase())));
          const r3 = $('#kR3'); r3.appendChild(mkKey('⇧', ' fn'));
          'zxcvbnm'.split('').forEach(c => r3.appendChild(mkKey(c.toUpperCase())));
          r3.appendChild(mkKey('⌫', ' fn'));
          function kStep() {
              stop('k');
              if (!live.k || document.hidden || kPaused) return;
              if (reduced) { kText = KPH[ki]; renderK(); $('#kStat').textContent = 'AI SUGGESTIONS'; return; }
              const ph = KPH[ki];
              if (kMode === 'type') {
                  kText = ph.slice(0, ++kc); renderK();
                  if (kc >= ph.length) {
                      $('#kStat').textContent = 'AI SUGGESTING…';
                      kMode = 'del'; later('k', kStep, 1500); return;
                  }
                  $('#kStat').textContent = 'AUTO-TYPING'; later('k', kStep, 100 + Math.random() * 70);
              } else {
                  kc -= 2;
                  if (kc <= 0) { kc = 0; kText = ''; renderK(); kMode = 'type'; ki = (ki + 1) % KPH.length; later('k', kStep, 600); return; }
                  kText = ph.slice(0, kc); renderK(); later('k', kStep, 45);
              }
          }
          tap(phoneK, () => {
              kPaused = !kPaused; buzz(phoneK);
              $('#kStat').textContent = kPaused ? 'PAUSED — TAP TO RESUME' : 'AUTO-TYPING';
              stop('k'); if (!kPaused) later('k', kStep, 400);
          });
          renderK();
          autoplay(phoneK, 'k', () => { if (!kPaused) later('k', kStep, 400); }, () => stop('k'));

          /* ---- Image Enlarger: before / after sweep ---- */
          const phoneE = $('#phoneE'), eBa = $('#eBa');
          let eCredits = 12;
          function eRun() {
              stop('e');
              if (!live.e || document.hidden) return;
              if (reduced) { eBa.style.setProperty('--split', '50%'); $('#eStage').textContent = 'Enhanced · 4× upscale'; return; }
              eBa.style.setProperty('--split', '100%');
              $('#eStage').textContent = 'Uploading…';
              $('#eStat').textContent = 'PROCESSING';
              later('e', () => {
                  $('#eStage').textContent = 'Restoring faces & detail…';
                  const t0 = performance.now(), D = 1900;
                  (function sweep(t) {
                      const k = Math.min(1, (t - t0) / D), e = 1 - Math.pow(1 - k, 3);
                      eBa.style.setProperty('--split', (100 - e * 100).toFixed(1) + '%');
                      if (k < 1) { requestAnimationFrame(sweep); }
                      else {
                          eCredits = eCredits > 1 ? eCredits - 1 : 12;
                          $('#eCred').textContent = eCredits + ' LEFT';
                          $('#eStage').textContent = 'Enhanced · 4× upscale';
                          $('#eStat').textContent = 'TAP TO RE-RUN';
                          later('e', eRun, 3200);
                      }
                  })(t0);
              }, 900);
          }
          tap(phoneE, () => { buzz(phoneE); eRun(); });
          autoplay(phoneE, 'e', eRun, () => stop('e'));

          /* ---- TTBoost: request pipeline ---- */
          const phoneS = $('#phoneS'), sLog = $('#sLog');
          const LOG = [
              ['POST /v6/login', ''],
              ['→ App Check token', 'hl'],
              ['  prefetched \u00b7 \u2713 valid', 'ok'],
              ['→ X-Signature', 'hl'],
              ['  ts drift 0.4s · ok', 'ok'],
              ['→ device integrity', 'hl'],
              ['  not rooted', 'ok'],
              ['← 200 OK · 142 ms', 'ok'],
              ['', ''],
              ['POST /v6/orders', ''],
              ['← 503 Service Unavailable', 'warn'],
              ['  mapped → localized msg', ''],
              ['  retry 1 of 3 · 200 OK', 'ok']
          ];
          sLog.innerHTML = LOG.map(([t, c]) =>
              `<div class="${c}">${t || '&nbsp;'}</div>`).join('');
          const sLines = Array.from(sLog.children);
          function sRun() {
              stop('s');
              if (!live.s || document.hidden) return;
              if (reduced) { sLines.forEach(l => l.classList.add('on')); $('#sStat').textContent = 'REQUEST PIPELINE'; return; }
              sLines.forEach(l => l.classList.remove('on'));
              $('#sStat').textContent = 'RUNNING…';
              let i = 0;
              (function next() {
                  if (!live.s || document.hidden) return;
                  if (i >= sLines.length) {
                      $('#sStat').textContent = 'TAP TO REPLAY';
                      later('s', sRun, 3400); return;
                  }
                  sLines[i++].classList.add('on');
                  later('s', next, 260);
              })();
          }
          tap(phoneS, () => { buzz(phoneS); sRun(); });
          autoplay(phoneS, 's', sRun, () => stop('s'));
}
