
export function initMotion() {
    const root = document.documentElement;
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    const control = document.getElementById('motionBtn');
    const running = new Set();
    const counters = new Set();
    let paused = false;
    const disabled = () => paused || preference.matches;
    const ease = 'cubic-bezier(.22, 1, .36, 1)';

    function animate(element, frames, options = {}) {
        if (disabled() || document.hidden || !element.animate) return;
        const animation = element.animate(frames, { duration: 720, easing: ease, fill: 'backwards', ...options });
        running.add(animation);
        const clear = () => running.delete(animation);
        animation.addEventListener('finish', clear, { once: true });
        animation.addEventListener('cancel', clear, { once: true });
    }

    function syncMotion() {
        root.classList.toggle('motion-paused', disabled());
        control.disabled = preference.matches;
        control.setAttribute('aria-pressed', String(disabled()));
        const label = preference.matches ? 'Motion reduced by system preference' : paused ? 'Resume animations' : 'Pause animations';
        control.setAttribute('aria-label', label);
        control.title = label;
        document.getElementById('motionIcon').setAttribute('d', disabled() ? 'm8 5 11 7-11 7Z' : 'M9 5v14M15 5v14');
        if (disabled()) {
            [...running].forEach(animation => animation.cancel());
            [...counters].forEach(counter => counter.finish());
        }
        document.dispatchEvent(new CustomEvent('portfolio-motion-change', { detail: { paused: disabled() } }));
    }
    control.addEventListener('click', () => { paused = !paused; syncMotion(); });
    preference.addEventListener('change', syncMotion);
    syncMotion();

    // Animate once on entry. Base content remains visible if scripting fails.
    const reveal = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            observer.unobserve(entry.target);
            animate(entry.target, [
                { opacity: 0, transform: 'translateY(24px)' },
                { opacity: 1, transform: 'translateY(0)' }
            ], { delay: Number(entry.target.dataset.motionDelay || 0) });
        });
    }, { threshold: 0, rootMargin: '0px 0px -30px 0px' });
    const targets = document.querySelectorAll('.hero-grid > div > [data-r], .identity, .sec-head, .card, .about-grid, .row, .xp-item, .col, .edu-item, .cred, .contact-cta, .contact-grid > *');
    targets.forEach(element => reveal.observe(element));
    document.querySelectorAll('.hero-grid > div > [data-r]').forEach((element, i) => { element.dataset.motionDelay = i * 75; });
    document.querySelectorAll('.col, .contact-grid > *').forEach((element, i) => { element.dataset.motionDelay = (i % 3) * 65; });

    // Ambient motion runs only when its small hero elements are on screen.
    const ambient = new IntersectionObserver(entries => entries.forEach(entry => entry.target.classList.toggle('motion-visible', entry.isIntersecting)), { threshold: 0 });
    document.querySelectorAll('.identity, .avail').forEach(element => ambient.observe(element));

    // Keep the accessible number stable while the visible number counts up.
    const numbers = new IntersectionObserver((entries, observer) => entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);
        if (disabled()) return;
        const element = entry.target;
        const original = element.textContent;
        const value = parseInt(original, 10);
        if (!Number.isFinite(value)) return;
        const suffix = original.replace(String(value), '');
        const text = document.createElement('span');
        text.style.cssText = 'display:inline;font:inherit;color:inherit;margin:0';
        text.setAttribute('aria-hidden', 'true');
        element.setAttribute('aria-label', original);
        element.replaceChildren(text);
        let frame;
        const start = performance.now();
        const counter = { finish() { cancelAnimationFrame(frame); text.textContent = original; counters.delete(counter); } };
        counters.add(counter);
        function tick(now) {
            const progress = Math.min((now - start) / 1100, 1);
            text.textContent = Math.round(value * (1 - Math.pow(1 - progress, 3))) + suffix;
            if (progress < 1 && !disabled() && !document.hidden) frame = requestAnimationFrame(tick);
            else counter.finish();
        }
        frame = requestAnimationFrame(tick);
    }), { threshold: .7 });
    document.querySelectorAll('.stat b').forEach(element => numbers.observe(element));

    document.querySelectorAll('.case-detail').forEach(details => {
        details.addEventListener('toggle', () => {
            if (details.open) animate(details.querySelector('.card-duo'), [{ opacity: 0, transform: 'translateY(-6px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 340 });
        });
    });

    // A passive listener and one frame at a time keep scrolling lightweight.
    const progress = document.querySelector('.scroll-progress');
    let scrollFrame = 0;
    function updateProgress() {
        scrollFrame = 0;
        const distance = root.scrollHeight - innerHeight;
        progress.style.transform = `scaleX(${distance > 0 ? Math.min(1, Math.max(0, scrollY / distance)) : 0})`;
    }
    function queueProgress() { if (!scrollFrame) scrollFrame = requestAnimationFrame(updateProgress); }
    addEventListener('scroll', queueProgress, { passive: true });
    addEventListener('resize', queueProgress);
    if ('ResizeObserver' in window) new ResizeObserver(queueProgress).observe(document.body);
    updateProgress();
    document.addEventListener('visibilitychange', () => {
        root.classList.toggle('document-hidden', document.hidden);
        if (document.hidden) {
            [...running].forEach(animation => animation.cancel());
            [...counters].forEach(counter => counter.finish());
        }
    });
}
