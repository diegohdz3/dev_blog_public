// Certificate collection for html/certifications.html. Add new entries below.
// Add completed courses here:
// {
//     title: 'Course title',
//     issuer: 'Issuer or Platform',
//     issued: 'YYYY-MM',
//     hours: '20 hours', // Optional
//     url: 'https://credly.com/...', // Public validation URL
//     image: '../images/certificates/name.png', // Certificate thumbnail/preview
//     pdf: '../certificates/name.pdf' // Optional local PDF link
// }

const certifications = [
    {
        title: 'Operating Systems Support',
        issuer: 'Cisco Networking Academy',
        issued: '2026-03',
        hours: 'Student Credential',
        url: 'https://www.credly.com/badges/03eb959e-4898-4d1b-8c2e-901ca72b7871',
        image: '../images/certificates/cisco-os-support.png',
        pdf: ''
    },
    {
        title: 'Operating Systems Basics',
        issuer: 'Cisco Networking Academy',
        issued: '2026-02',
        hours: 'Student Credential',
        url: 'https://www.credly.com/badges/46287a48-39b8-453e-8d1f-fcfed70c705e',
        image: '../images/certificates/cisco-os-basics.png',
        pdf: ''
    },
    {
        title: 'AWS Academy Graduate - Cloud Foundations',
        issuer: 'AWS Academy',
        issued: '2025-12',
        hours: '20 hours',
        url: 'https://www.credly.com/go/A3pxk32e',
        image: '../images/certificates/aws-cloud-foundations.png',
        pdf: ''
    },
    {
        title: 'Introduction to Internet of Things',
        issuer: 'Cisco Networking Academy',
        issued: '2025-12',
        hours: 'Student Credential',
        url: 'https://www.credly.com/badges/45bd5fab-4f3f-4361-89cf-8196f8a2014d',
        image: '../images/certificates/cisco-iot.png',
        pdf: ''
    },
    {
        title: 'Curso profesional de C++',
        issuer: 'Azul School',
        issued: '2025-11',
        hours: 'ID: AS-1762069947-18934-41246',
        url: 'https://www.azulschool.net/verificacion-de-certificados/',
        image: '../images/certificates/azul-school-cpp.png',
        pdf: ''
    },
    {
        title: 'Networking Basics',
        issuer: 'Cisco Networking Academy',
        issued: '2025-10',
        hours: 'Student Credential',
        url: 'https://www.credly.com/badges/7dbec3fe-7faf-432c-92ac-b48908fa5296',
        image: '../images/certificates/cisco-networking-basics.png',
        pdf: ''
    }
];

const certificationList = document.getElementById('certificationsList');
const certificationTemplate = document.getElementById('certificationTemplate');
const certificationEmpty = document.getElementById('certificationsEmpty');

// Modal Elements
const certModal = document.getElementById('certModal');
const certModalImg = document.getElementById('certModalImg');
const certModalTitle = document.getElementById('certModalTitle');
const certModalMeta = document.getElementById('certModalMeta');
const certModalVerify = document.getElementById('certModalVerify');
const certModalClose = document.getElementById('certModalClose');
const certModalBackdrop = document.getElementById('certModalBackdrop');

function openCertModal(cert) {
    if (!certModal) return;
    if (certModalImg) {
        certModalImg.src = cert.image || '';
        certModalImg.alt = cert.title;
    }
    if (certModalTitle) certModalTitle.textContent = cert.title;
    if (certModalMeta) {
        const parts = [cert.issuer];
        if (cert.hours) parts.push(cert.hours);
        if (cert.issued) {
            try {
                const formattedDate = new Intl.DateTimeFormat('en', { month: 'short', year: 'numeric', timeZone: 'UTC' })
                    .format(new Date(`${cert.issued}-01T00:00:00Z`));
                parts.push(formattedDate);
            } catch {
                parts.push(cert.issued);
            }
        }
        certModalMeta.textContent = parts.join(' • ');
    }
    if (certModalVerify) {
        if (cert.url) {
            certModalVerify.href = cert.url;
            certModalVerify.hidden = false;
            const label = certModalVerify.querySelector('span');
            if (label) {
                label.textContent = /credly/i.test(cert.url) ? 'Verify on Credly' : 'Verify credential';
            }
        } else {
            certModalVerify.hidden = true;
        }
    }
    certModal.scrollTop = 0;
    certModal.classList.add('is-active');
    certModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}

function closeCertModal() {
    if (!certModal) return;
    certModal.classList.remove('is-active');
    certModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

if (certModalClose) certModalClose.addEventListener('click', closeCertModal);
if (certModalBackdrop) certModalBackdrop.addEventListener('click', closeCertModal);
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && certModal && certModal.classList.contains('is-active')) {
        closeCertModal();
    }
});

if (certificationList && certificationTemplate && certificationEmpty) {
    certifications.forEach((certificate, index) => {
        if (!certificate.title || !certificate.issuer) return;
        const item = certificationTemplate.content.cloneNode(true);
        const article = item.querySelector('.certification');
        if (article) {
            article.setAttribute('data-delay', index % 4);
        }

        item.querySelector('.certification__title').textContent = certificate.title;
        const issuerEl = item.querySelector('.certification__issuer');
        if (issuerEl) issuerEl.textContent = certificate.issuer;

        // Chips
        const chipIssuer = item.querySelector('.certification__chip--issuer');
        if (chipIssuer) {
            chipIssuer.textContent = certificate.issuer;
            if (/cisco/i.test(certificate.issuer)) {
                chipIssuer.classList.add('certification__chip--cisco');
            } else if (/aws|amazon/i.test(certificate.issuer)) {
                chipIssuer.classList.add('certification__chip--aws');
            } else if (/azul/i.test(certificate.issuer)) {
                chipIssuer.classList.add('certification__chip--azulschool');
            }
        }

        const chipHours = item.querySelector('.certification__chip--hours');
        if (chipHours) {
            if (certificate.hours) {
                chipHours.textContent = certificate.hours;
            } else {
                chipHours.remove();
            }
        }

        // Date formatting
        const date = item.querySelector('time');
        if (date) {
            if (/^\d{4}-(0[1-9]|1[0-2])$/.test(certificate.issued || '')) {
                date.dateTime = certificate.issued;
                date.textContent = new Intl.DateTimeFormat('en', {
                    month: 'short', year: 'numeric', timeZone: 'UTC'
                }).format(new Date(`${certificate.issued}-01T00:00:00Z`));
            } else {
                date.remove();
                const sep = item.querySelector('.certification__meta-sep');
                if (sep) sep.remove();
            }
        }

        // Preview image / Thumbnail
        const preview = item.querySelector('.certification__preview');
        const thumb = item.querySelector('.certification__thumb');
        const previewBtn = item.querySelector('.certification__preview-btn');

        if (certificate.image && thumb) {
            thumb.src = certificate.image;
            thumb.alt = `${certificate.title} certificate`;
            if (preview) {
                preview.addEventListener('click', () => openCertModal(certificate));
                preview.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        openCertModal(certificate);
                    }
                });
            }
            if (previewBtn) {
                previewBtn.addEventListener('click', () => openCertModal(certificate));
            }
        } else {
            if (article) article.classList.add('certification--no-thumb');
            if (previewBtn) previewBtn.remove();
        }

        // Main link (Credly or URL)
        const link = item.querySelector('.certification__link');
        let credentialUrl;
        try {
            if (certificate.url) credentialUrl = new URL(certificate.url, document.baseURI);
        } catch { /* Omit links that cannot be resolved. */ }
        if (credentialUrl && ['https:', 'http:', 'file:'].includes(credentialUrl.protocol)) {
            link.href = credentialUrl.href;
            link.setAttribute('aria-label', `View credential for ${certificate.title} (opens in a new tab)`);
        } else {
            link.remove();
        }

        // Optional PDF link
        const pdfLink = item.querySelector('.certification__pdf');
        if (pdfLink) {
            if (certificate.pdf) {
                pdfLink.href = certificate.pdf;
                pdfLink.hidden = false;
                pdfLink.setAttribute('aria-label', `Download or view PDF for ${certificate.title}`);
            } else {
                pdfLink.remove();
            }
        }

        certificationList.append(item);
    });

    // Make newly appended anim elements visible
    requestAnimationFrame(() => {
        certificationList.querySelectorAll('.certification.anim').forEach(el => {
            el.classList.add('visible');
        });
    });

    certificationEmpty.hidden = certificationList.childElementCount > 0;
}

