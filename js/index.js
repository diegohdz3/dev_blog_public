// =====================================================================
//  INDEX.JS — Hub page (index.html)
// =====================================================================

// Reveal the background only once the poster is ready to paint.
// Text and navigation keep their own entrance timing while the image loads.
const heroBackground = document.querySelector('.hero__bg');
const heroPoster = document.querySelector('.hero__poster');

if (heroBackground && heroPoster) {
    const revealBackground = () => heroBackground.classList.add('is-ready');

    if (typeof heroPoster.decode === 'function') {
        heroPoster.decode().then(revealBackground, revealBackground);
    } else if (heroPoster.complete) {
        revealBackground();
    } else {
        heroPoster.addEventListener('load', revealBackground, { once: true });
        heroPoster.addEventListener('error', revealBackground, { once: true });
    }
}

// --- Page transition system ---
function navigateWithTransition(href) {
    const overlay = document.getElementById('pageTransition');
    if (!overlay) {
        window.location.href = href;
        return;
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        window.location.href = href;
        return;
    }
    overlay.classList.add('active', 'leaving');

    // Navigate after transition completes
    setTimeout(() => {
        window.location.href = href;
    }, 550);
}

// Intercept all [data-nav] links
document.querySelectorAll('[data-nav]').forEach(link => {
    link.addEventListener('click', (e) => {
        if (e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
        e.preventDefault();
        const href = link.getAttribute('href');
        if (href) navigateWithTransition(href);
    });
});

// --- Magnetic effect on hub nav buttons ---
const hubBtns = document.querySelectorAll('.hub-nav__btn');

hubBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches ||
            window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        const r = btn.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) * 0.08;
        const y = (e.clientY - r.top - r.height / 2) * 0.08;
        btn.style.transform = `translate(${x}px, ${y}px)`;
    });

    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
    });
});

// --- Subtle glitch effect on hub buttons (random) ---
function randomGlitch() {
    if (hubBtns.length === 0) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
        !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    const randomBtn = hubBtns[Math.floor(Math.random() * hubBtns.length)];
    const label = randomBtn.querySelector('.hub-nav__label');

    if (label) {
        label.style.textShadow = '-1px 0 #ff2e63, 1px 0 #08f7fe';
        label.style.transform = `translate(${Math.random() * 2 - 1}px, ${Math.random() * 2 - 1}px)`;

        setTimeout(() => {
            label.style.textShadow = 'none';
            label.style.transform = 'translate(0, 0)';
        }, 80);
    }

    // Schedule next glitch (random interval between 4-10s)
    setTimeout(randomGlitch, 4000 + Math.random() * 6000);
}

// Start random glitch after initial animations
setTimeout(randomGlitch, 3000);
