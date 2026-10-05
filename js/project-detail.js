// =====================================================================
//  PROJECT-DETAIL.JS — Animations & interactions for project landing pages
// =====================================================================

document.addEventListener('DOMContentLoaded', () => {

    // --- Parallax on hero background ---
    const heroSection = document.querySelector('.pj-hero');
    const heroBg = heroSection?.querySelector('[data-parallax]');

    if (heroSection && heroBg) {
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
                !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
            if (!ticking) {
                requestAnimationFrame(() => {
                    const rect = heroSection.getBoundingClientRect();
                    const windowH = window.innerHeight;
                    if (rect.bottom > 0 && rect.top < windowH) {
                        const progress = (windowH - rect.top) / (windowH + rect.height);
                        const yOffset = (progress - 0.5) * 80;
                        heroBg.style.transform = `translateY(${yOffset}px)`;
                    }
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }

    // --- Animate timeline line on scroll ---
    const timelineLine = document.querySelector('.pj-timeline__line');
    const timelineSection = document.querySelector('#timeline');

    if (timelineLine && timelineSection) {
        const updateTimelineLine = () => {
            const rect = timelineSection.getBoundingClientRect();
            const windowH = window.innerHeight;

            if (rect.top < windowH && rect.bottom > 0) {
                const sectionVisible = Math.min(
                    Math.max((windowH - rect.top) / (rect.height + windowH * 0.3), 0),
                    1
                );
                timelineLine.style.setProperty('--line-progress', sectionVisible);
            }
        };

        window.addEventListener('scroll', () => {
            requestAnimationFrame(updateTimelineLine);
        }, { passive: true });

        updateTimelineLine();
    }

    // --- Gallery lightbox ---
    const galleryItems = document.querySelectorAll('.pj-gallery__image-wrap');
    let lightbox = null;

    function openLightbox(imgSrc, imgAlt) {
        if (lightbox) return;

        lightbox = document.createElement('div');
        lightbox.className = 'pj-lightbox';
        lightbox.innerHTML = `
            <div class="pj-lightbox__backdrop"></div>
            <div class="pj-lightbox__content">
                <img src="${imgSrc}" alt="${imgAlt}" class="pj-lightbox__img">
                <button class="pj-lightbox__close" aria-label="Close lightbox">
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor"
                        stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </button>
            </div>
        `;

        document.body.appendChild(lightbox);
        document.body.style.overflow = 'hidden';

        requestAnimationFrame(() => {
            lightbox.classList.add('active');
        });

        lightbox.querySelector('.pj-lightbox__backdrop').addEventListener('click', closeLightbox);
        lightbox.querySelector('.pj-lightbox__close').addEventListener('click', closeLightbox);

        document.addEventListener('keydown', handleLightboxEsc);
    }

    function closeLightbox() {
        if (!lightbox) return;
        lightbox.classList.remove('active');
        lightbox.classList.add('closing');

        setTimeout(() => {
            if (lightbox) {
                lightbox.remove();
                lightbox = null;
            }
            document.body.style.overflow = '';
        }, 400);

        document.removeEventListener('keydown', handleLightboxEsc);
    }

    function handleLightboxEsc(e) {
        if (e.key === 'Escape') closeLightbox();
    }

    galleryItems.forEach(item => {
        item.style.cursor = 'zoom-in';
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            if (img) openLightbox(img.src, img.alt);
        });
    });

    // --- Smooth scroll for anchor links ---
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

});
