// Start the portrait entrance once the image is ready, including cached images.
const portrait = document.querySelector('.about__portrait');
const portraitImage = portrait?.querySelector('img');

if (portraitImage) {
    const revealPortrait = () => portrait.classList.add('is-ready');
    if (typeof portraitImage.decode === 'function') {
        portraitImage.decode().then(revealPortrait, revealPortrait);
    } else if (portraitImage.complete) {
        revealPortrait();
    } else {
        portraitImage.addEventListener('load', revealPortrait, { once: true });
        portraitImage.addEventListener('error', revealPortrait, { once: true });
    }
}

