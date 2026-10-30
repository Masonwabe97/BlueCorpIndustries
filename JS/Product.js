/**
 * User Profile Matrix Interactivity - Blue Corp Industries
 * Handles inventory inspection, verification key copying, and logistics claims.
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log("Blue Corp User Profile Matrix Initialized. ZA-South Node active.");

    // 1. Handle Package Logistics Reimbursement Claim Form
    const logisticsForm = document.querySelector('#logistics form');
    if (logisticsForm) {
        logisticsForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const button = logisticsForm.querySelector('button');
            const transitState = document.querySelector('#logistics span');

            // Temporarily disable and update button state
            button.textContent = "Processing Reimbursement Node...";
            button.disabled = true;
            button.style.opacity = "0.7";

            // Simulate cloud settlement delay
            setTimeout(() => {
                button.textContent = "Reimbursement Credited ✓";
                button.style.backgroundColor = "var(--proposal-mint, #2ecc71)";
                button.style.color = "#000";

                if (transitState) {
                    transitState.textContent = "[ COMPENSATION APPLIED: 30% CREDITED ]";
                    transitState.style.color = "var(--proposal-mint, #2ecc71)";
                }

                showNotification("Success: 30% purchase compensation has been routed to your XP Credits balance.");

                // Keep final state active or reset after a long period
            }, 1000);
        });
    }

    // 2. Enhance Inventory Stash Items (Interactive Inspection & Key Copying)
    const stashSection = document.querySelector('#stash');
    if (stashSection) {
        // Clean up any stray literal hyphens left over in HTML paragraphs
        const paragraphs = stashSection.querySelectorAll('p');
        paragraphs.forEach(p => {
            // Style inventory items like interactive cards/nodes
            Object.assign(p.style, {
                background: 'rgba(255, 255, 255, 0.03)',
                padding: '12px 15px',
                borderLeft: '3px solid #00d2ff',
                borderRadius: '4px',
                marginBottom: '12px',
                transition: 'transform 0.2s ease, background 0.2s ease',
                cursor: 'pointer'
            });

            // Add hover effects for interactivity
            p.addEventListener('mouseenter', () => {
                p.style.background = 'rgba(0, 210, 255, 0.08)';
                p.style.transform = 'translateX(4px)';
            });
            p.addEventListener('mouseleave', () => {
                p.style.background = 'rgba(255, 255, 255, 0.03)';
                p.style.transform = 'translateX(0)';
            });

            // Click to copy simulated license/verification key info
            p.addEventListener('click', () => {
                const textToCopy = p.innerText;
                navigator.clipboard.writeText(textToCopy).then(() => {
                    showNotification(`Stash Item Data Copied to Clipboard.`);
                }).catch(err => {
                    console.error('Failed to copy text: ', err);
                });
            });
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