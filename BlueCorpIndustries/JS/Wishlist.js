/**
 * Wishlist Matrix Interactivity - Blue Corp Industries
 * Handles simulated email alerts, dynamic DOM feedback, and filter/search operations.
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log("Blue Corp Wishlist Matrix Initialized. Cloud Node: ZA-South active.");

    // 1. Handle Simulate Email Alert Trigger Forms
    const alertForms = document.querySelectorAll('.wishlist-item-card form');

    alertForms.forEach((form, index) => {
        form.addEventListener('submit', (e) => {
            e.preventDefault(); // Stop standard form submission

            const card = form.closest('.wishlist-item-card');
            const gameTitle = card.querySelector('h3').textContent;
            const button = form.querySelector('button');

            // Temporarily update button state to show dispatch action
            const originalText = button.textContent;
            button.textContent = "Dispatching Alert...";
            button.disabled = true;
            button.style.opacity = "0.7";

            // Simulate network delay for cloud notification node dispatch
            setTimeout(() => {
                button.textContent = "Alert Dispatched ✓";
                button.style.backgroundColor = "var(--proposal-mint, #2ecc71)";
                button.style.color = "#000";

                // Trigger a simulated notification banner or log
                showNotification(`Automated notification triggered for: ${gameTitle}. Check your ZA-South registered inbox.`);

                // Reset button after 3 seconds
                setTimeout(() => {
                    button.textContent = originalText;
                    button.disabled = false;
                    button.style.backgroundColor = "";
                    button.style.color = "";
                }, 3000);
            }, 800);
        });
    });

    // 2. Dynamic Notification Toast System
    function showNotification(message) {
        // Check if a toast container already exists, otherwise create one
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
        
        // Style the toast matching a tech/cyber-industrial aesthetic
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

        // Fade in
        requestAnimationFrame(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translateY(0)';
        });

        // Remove after 4 seconds
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(10px)';
            setTimeout(() => toast.remove(), 300);
        }, 4000);
    }
});