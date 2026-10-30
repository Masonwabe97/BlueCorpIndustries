/* ==========================================================================
   BLUE CORP INDUSTRIES - GLOBAL OPERATIONS COMPONENT CORE LAYER
   Handles Lightbox Modals, Smooth Navigation Scrolls, Form Telemetry 
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================================================
    // 1. UNIVERSAL COMPONENT ENGINE: LIGHTBOX IMAGE MODAL OVERLAY
    // ==========================================================================
    const overlay = document.getElementById('matrixLightboxOverlay');
    const lightboxImg = document.getElementById('matrixLightboxImage');
    const closeBtn = document.getElementById('matrixLightboxClose');
    
    const targetImages = document.querySelectorAll('.contact-col-item img, main section img');

    if (overlay && lightboxImg && closeBtn) {
        targetImages.forEach(img => {
            img.classList.add('lightbox-trigger');
            img.addEventListener('click', () => {
                lightboxImg.src = img.src;
                lightboxImg.alt = img.alt;
                overlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });

        const closeLightbox = () => {
            overlay.classList.remove('active');
            document.body.style.overflow = '';
            setTimeout(() => { lightboxImg.src = ''; }, 300);
        };

        closeBtn.addEventListener('click', closeLightbox);
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) closeLightbox();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && overlay.classList.contains('active')) closeLightbox();
        });
    }

    // ==========================================================================
    // 2. UNIVERSAL NAVIGATION ENGINE: SMOOTH SCROLL & ACTIVE SCROLL TRACKER
    // ==========================================================================
    const subNavLinks = document.querySelectorAll('.sub-nav-link');
    const sections = document.querySelectorAll('main > section, .contact-media-row');

    if (subNavLinks.length > 0) {
        subNavLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        const scrollTracker = () => {
            let currentSectionId = '';
            const scrollPos = window.scrollY + 150;

            sections.forEach(section => {
                const top = section.offsetTop;
                const height = section.offsetHeight;
                if (scrollPos >= top && scrollPos < top + height) {
                    if (section.classList.contains('contact-media-row')) {
                        currentSectionId = '#desk';
                    } else {
                        currentSectionId = '#' + section.getAttribute('id');
                    }
                }
            });

            subNavLinks.forEach(link => {
                if (link.getAttribute('href') === currentSectionId) {
                    link.classList.add('active-node');
                } else {
                    link.classList.remove('active-node');
                }
            });
        };

        window.addEventListener('scroll', scrollTracker);
        scrollTracker();
    }

    // ==========================================================================
    // 3. TARGET COMPONENT NODE: CONTACT HUB PAGE FORM (EMAILJS PIPELINE)
    // ==========================================================================
    const contactForm = document.getElementById('contactMatrixForm');
    const contactSubmitBtn = document.getElementById('submitBtn');
    const contactStatus = document.getElementById('formStatus');

    if (contactForm && contactSubmitBtn) {
        contactForm.setAttribute('novalidate', true);

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('contact-name').value.trim();
            const email = document.getElementById('contact-email').value.trim();
            const msg = document.getElementById('contact-msg').value.trim();

            if (!name || !email || !msg) {
                displayFormStatus(contactStatus, '⚠️ TRANSMISSION BLOCKED: All telemetry matrix input data fields are required.', 'error');
                return;
            }

            contactSubmitBtn.disabled = true;
            contactSubmitBtn.textContent = 'Uploading Core Parameters...';
            displayFormStatus(contactStatus, 'Connecting to EmailJS Network Node...', 'success');

            const serviceID = 'service_9b553fo'; 
            const templateID = 'template_epeerz7';

            emailjs.sendForm(serviceID, templateID, this)
                .then(() => {
                    displayFormStatus(contactStatus, `✔️ TRANSMISSION SUCCESSFUL: Data packet routed safely via EmailJS!`, 'success');
                    contactForm.reset();
                }, (error) => {
                    displayFormStatus(contactStatus, `❌ SYSTEM ERROR: ${error.text || 'Core connection dropped'}`, 'error');
                })
                .finally(() => {
                    contactSubmitBtn.disabled = false;
                    contactSubmitBtn.textContent = 'Submit Platform Message';
                });
        });
    }

    // ==========================================================================
    // 4. TARGET COMPONENT NODE: ENQUIRY MATRIX REALTIME COST MATRIX ESTIMATOR
    // ==========================================================================
    const enquiryForm = document.getElementById('enquiryMatrixForm');
    const serviceTier = document.getElementById('service-tier');
    const nodeQuantity = document.getElementById('node-quantity');
    const costDisplay = document.getElementById('costEstimateDisplay');
    const enquirySubmitBtn = document.getElementById('submitEnquiryBtn');
    const enquiryStatus = document.getElementById('enquiryStatus');

    if (enquiryForm) {
        enquiryForm.setAttribute('novalidate', true);

        const evaluateCostMatrix = () => {
            const selectedOption = serviceTier.options[serviceTier.selectedIndex];
            if (!selectedOption || selectedOption.value === "") {
                costDisplay.textContent = "R0.00";
                return;
            }

            const basePrice = parseFloat(selectedOption.getAttribute('data-base')) || 0;
            let quantity = parseInt(nodeQuantity.value) || 1;
            
            if (quantity < 1) {
                quantity = 1;
                nodeQuantity.value = 1;
            }

            const calculationResult = basePrice * quantity;
            costDisplay.textContent = `R${calculationResult.toLocaleString('en-ZA')}.00`;
        };

        serviceTier.addEventListener('change', evaluateCostMatrix);
        nodeQuantity.addEventListener('input', evaluateCostMatrix);

        enquiryForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('enquiry-name').value.trim();
            const email = document.getElementById('enquiry-email').value.trim();
            const tier = serviceTier.value;
            const specs = document.getElementById('enquiry-specs').value.trim();

            if (!name || !email || !tier || !specs) {
                displayFormStatus(enquiryStatus, '⚠️ TRANSMISSION BLOCKED: All allocation framework fields are required.', 'error');
                return;
            }

            enquirySubmitBtn.disabled = true;
            enquirySubmitBtn.textContent = 'Transmitting Allocation Packet...';
            displayFormStatus(enquiryStatus, 'Connecting to EmailJS Network Node...', 'success');

            const serviceID = 'service_9b553fo'; 
            const templateID = 'template_lbu0foj';

            emailjs.sendForm(serviceID, templateID, this)
                .then(() => {
                    displayFormStatus(enquiryStatus, `✔️ TRANSMISSION SUCCESSFUL: Enquiry package deployed and reference ticket generated!`, 'success');
                    enquiryForm.reset();
                    costDisplay.textContent = "R0.00";
                }, (error) => {
                    displayFormStatus(enquiryStatus, `❌ SYSTEM ERROR: ${error.text || 'Core connection dropped'}`, 'error');
                })
                .finally(() => {
                    enquirySubmitBtn.disabled = false;
                    enquirySubmitBtn.textContent = 'Submit Request Parameter';
                });
        });
    }

    function displayFormStatus(statusContainer, msg, className) {
        if (statusContainer) {
            statusContainer.className = `form-status-msg ${className}`;
            statusContainer.textContent = msg;
            
            statusContainer.style.animation = 'none';
            statusContainer.offsetHeight; 
            statusContainer.style.animation = 'formAlertFlash 0.4s ease-out 1';
        }
    }
});
