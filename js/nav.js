// =====================================================================
//  NAV.JS — Shared navigation script for subpages
//  (about.html, thoughts.html, projects.html, contact.html)
// =====================================================================

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

// --- Section-level observer (triggers bg zoom, scan sweep, in-view) ---
const sections = document.querySelectorAll('.about, .projects, .thoughts, .pj-hero');

sections.forEach(section => {
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, { threshold: 0.05 });

    sectionObserver.observe(section);
});

// --- Element-level observer (triggers individual animations) ---
const animEls = document.querySelectorAll('.anim');

const elementObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            elementObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15,
    rootMargin: '0px 0px -30px 0px'
});

animEls.forEach(el => elementObserver.observe(el));

// --- Subtle mouse-tracking glow on cards ---
const cards = document.querySelectorAll('.card');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

// --- Parallax on about background ---
const aboutSection = document.querySelector('.about');
const parallaxBg = document.querySelector('[data-parallax]');

if (aboutSection && parallaxBg) {
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
            !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
        if (!ticking) {
            requestAnimationFrame(() => {
                const rect = aboutSection.getBoundingClientRect();
                const windowH = window.innerHeight;

                if (rect.bottom > 0 && rect.top < windowH) {
                    const progress = (windowH - rect.top) / (windowH + rect.height);
                    const yOffset = (progress - 0.5) * 60;
                    parallaxBg.style.transform = `translateY(${yOffset}px)`;
                }
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}

// --- Auto-trigger in-view for subpage hero (since it's visible on load) ---
document.addEventListener('DOMContentLoaded', () => {
    // Small delay to let page-enter animation start
    setTimeout(() => {
        const hero = document.querySelector('.subpage-hero');
        if (hero) {
            hero.classList.add('in-view');
        }
    }, 200);
});

// --- Contact form handling ---
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const submitBtn = document.getElementById('contactSubmit');
        const label = submitBtn.querySelector('.contact__submit-label');

        if (label) {
            label.textContent = '[ message sent ✓ ]';
            submitBtn.style.color = '#08f7fe';
            submitBtn.style.textShadow = '0 0 14px rgba(8,247,254,.4)';
        }

        setTimeout(() => {
            if (label) {
                label.textContent = '[ send message ]';
                submitBtn.style.color = '';
                submitBtn.style.textShadow = '';
            }
            contactForm.reset();
        }, 3000);
    });
}
