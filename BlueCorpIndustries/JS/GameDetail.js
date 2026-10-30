/**
 * Game Showroom Interactivity - Blue Corp Industries
 * Handles showroom navigation, screenshot inspection lightbox, and dynamic notifications.
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log("Blue Corp Game Showroom Initialized. ZA-South Node active.");

    // 1. Showroom Card Interactivity (Smooth Scroll & Quick Notification)
    const showroomCards = document.querySelectorAll('.showroom-card');
    
    showroomCards.forEach((card, index) => {
        // Map card index to corresponding target article IDs
        const targets = ['#resident-evil', '#god-of-war', '#peak'];
        const targetId = targets[index];

        // Add interactive styling to cards
        Object.assign(card.style, {
            cursor: 'pointer',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease'
        });

        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-4px)';
            card.style.boxShadow = '0 6px 20px rgba(0, 210, 255, 0.15)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = 'none';
        });

        // Click to scroll to specs and trigger notification
        card.addEventListener('click', () => {
            const title = card.querySelector('h3').textContent;
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                showNotification(`Loaded tactical specs for: ${title}`);
            }
        });
    });

    // 2. Screenshot Gallery Lightbox / Zoom Feature
    const galleryImages = document.querySelectorAll('.screenshot-gallery img');

    galleryImages.forEach(img => {
        img.style.cursor = 'zoom-in';
        img.style.transition = 'opacity 0.2s ease';

        img.addEventListener('click', () => {
            openLightbox(img.src, img.alt);
        });
    });

    function openLightbox(src, altText) {
        // Create lightbox overlay container
        const lightbox = document.createElement('div');
        lightbox.className = 'blue-corp-lightbox';
        
        Object.assign(lightbox.style, {
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(10, 10, 15, 0.9)',
            zIndex: '10000',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: '0',
            transition: 'opacity 0.3s ease'
        });

        lightbox.innerHTML = `
            <div style="position: relative; max-width: 85vw; max-height: 80vh;">
                <img src="${src}" alt="${altText}" style="max-width: 100%; max-height: 80vh; border-radius: 6px; border: 1px solid #00d2ff; box-shadow: 0 0 25px rgba(0,210,255,0.3);">
                <p style="color: #fff; text-align: center; margin-top: 12px; font-family: inherit; font-size: 0.95rem;">${altText}</p>
            </div>
            <button class="close-lightbox" style="position: absolute; top: 25px; right: 25px; background: #1a1a24; color: #00d2ff; border: 1px solid #00d2ff; padding: 8px 16px; border-radius: 4px; cursor: pointer; font-weight: bold;">[ ESC / CLOSE ]</button>
        `;

        document.body.appendChild(lightbox);

        requestAnimationFrame(() => {
            lightbox.style.opacity = '1';
        });

        // Close handlers
        const close = () => {
            lightbox.style.opacity = '0';
            setTimeout(() => lightbox.remove(), 300);
        };

        lightbox.querySelector('.close-lightbox').addEventListener('click', close);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) close();
        });
        document.addEventListener('keydown', function escHandler(e) {
            if (e.key === 'Escape') {
                close();
                document.removeEventListener('keydown', escHandler);
            }
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
            borderLeft: '4px solid #00d2ff',
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