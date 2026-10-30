/**
 * Contact Hub Interactivity - Blue Corp Industries
 * Handles secure form submission, live form status messages, lightbox image zoom, and toast notifications.
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log("Blue Corp Contact Hub Initialized. ZA-South Node active.");

    // 1. Secure Form Submission & Validation
    const contactForm = document.getElementById('contactMatrixForm');
    const formStatus = document.getElementById('formStatus');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const nameInput = document.getElementById('contact-name').value.trim();
            const emailInput = document.getElementById('contact-email').value.trim();
            const submitBtn = document.getElementById('submitBtn');

            // Basic validation check
            if (!nameInput || !emailInput) {
                showNotification("Error: Required parameters missing in transmission matrix.");
                return;
            }

            // Save original button text
            const originalText = submitBtn.textContent;
            submitBtn.textContent = "Routing Platform Message...";
            submitBtn.disabled = true;
            submitBtn.style.opacity = "0.7";

            if (formStatus) {
                formStatus.textContent = "Establishing secure connection with ZA-South Node...";
                formStatus.style.color = "#66c0f4";
            }

            // Simulate cloud dispatch delay
            setTimeout(() => {
                submitBtn.textContent = "Message Dispatched ✓";
                submitBtn.style.backgroundColor = "var(--proposal-mint, #2ecc71)";
                submitBtn.style.color = "#000";

                if (formStatus) {
                    formStatus.textContent = `Transmission successful! Response vector logged for ${nameInput}.`;
                    formStatus.style.color = "var(--proposal-mint, #2ecc71)";
                }

                showNotification(`Success: Message routed from ${emailInput}.`);

                // Reset form fields
                contactForm.reset();

                // Restore button after 4 seconds
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.backgroundColor = "";
                    submitBtn.style.color = "";
                    submitBtn.style.opacity = "1";
                    if (formStatus) formStatus.textContent = "";
                }, 4000);
            }, 1200);
        });
    }

    // 2. Image Lightbox Integration
    const lightboxTriggers = document.querySelectorAll('.lightbox-trigger-img');
    const lightboxOverlay = document.getElementById('matrixLightboxOverlay');
    const lightboxImage = document.getElementById('matrixLightboxImage');
    const lightboxClose = document.getElementById('matrixLightboxClose');

    if (lightboxTriggers.length > 0 && lightboxOverlay && lightboxImage) {
        lightboxTriggers.forEach(img => {
            img.style.cursor = 'zoom-in';
            img.addEventListener('click', () => {
                lightboxImage.src = img.src;
                lightboxImage.alt = img.alt;
                lightboxOverlay.style.display = 'flex';
                requestAnimationFrame(() => {
                    lightboxOverlay.style.opacity = '1';
                });
            });
        });

        const closeLightbox = () => {
            lightboxOverlay.style.opacity = '0';
            setTimeout(() => {
                lightboxOverlay.style.display = 'none';
                lightboxImage.src = '';
            }, 300);
        };

        if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
        lightboxOverlay.addEventListener('click', (e) => {
            if (e.target === lightboxOverlay) closeLightbox();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeLightbox();
        });
    }

    // 3. Dynamic Notification Toast System
    function showNotification(message) {
        let toastContainer = document.querySelector('.toast-container');
        if (!toastContainer) {
            toastContainer = document.createElement('div');
            toastContainer.className = 'toast-container';
            Object.assign(toastContainer.style, {
                position: 'fixed',
                bottom: '20px',
                right: '20px',
                zIndex: '9999',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px'
            });
            document.body.appendChild(toastContainer);
        }

        const toast = document.createElement('div');
        toast.className = 'blue-corp-toast';
        toast.textContent = message;
        
        Object.assign(toast.style, {
            background: '#1a1a24',
            color: '#fff',
            padding: '12px 20px',
            borderLeft: '4px solid #66c0f4',
            borderRadius: '4px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            fontFamily: 'inherit',
            fontSize: '0.9rem',
            opacity: '0',
            transition: 'opacity 0.3s ease, transform 0.3s ease',
            transform: 'translateY(10px)'
        });

        toastContainer.appendChild(toast);

        requestAnimationFrame(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translateY(0)';
        });

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(10px)';
            setTimeout(() => toast.remove(), 300);
        }, 4000);
    }
});