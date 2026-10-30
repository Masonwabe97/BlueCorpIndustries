/**
 * Enquiry Desk Interactivity - Blue Corp Industries
 * Handles custom configuration intake form submission, validation feedback, and cloud node routing.
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log("Blue Corp Enquiry Desk Initialized. ZA-South Node active.");

    const enquiryForm = document.querySelector('#intake form');

    if (enquiryForm) {
        enquiryForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent traditional form submission

            // Grab field values for customized feedback
            const nameInput = document.getElementById('name').value.trim();
            const projectType = document.getElementById('project-type');
            const selectedProjectText = projectType.options[projectType.selectedIndex]?.text || "Custom Configuration";
            const submitButton = enquiryForm.querySelector('button[type="submit"]');

            // Save original button state
            const originalText = submitButton.textContent;

            // Temporarily update button state to show secure transmission
            submitButton.textContent = "Routing Enquiry Parameter...";
            submitButton.disabled = true;
            submitButton.style.opacity = "0.7";

            // Simulate secure cloud dispatch delay (ZA-South node response)
            setTimeout(() => {
                submitButton.textContent = "Enquiry Dispatched ✓";
                submitButton.style.backgroundColor = "var(--proposal-mint, #2ecc71)";
                submitButton.style.color = "#000";

                // Trigger toast notification
                showNotification(`Transmission Successful: ${selectedProjectText} request logged for ${nameInput}.`);

                // Reset form fields
                enquiryForm.reset();

                // Restore button state after 4 seconds
                setTimeout(() => {
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                    submitButton.style.backgroundColor = "";
                    submitButton.style.color = "";
                    submitButton.style.opacity = "1";
                }, 4000);
            }, 1200);
        });
    }

    // Dynamic Notification Toast System
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
        }, 4500);
    }
});