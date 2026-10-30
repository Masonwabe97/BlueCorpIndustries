/**
 * Blue Corp Industries - Core Application Framework
 * Handles global navigation, sub-nav links, wishlist alerts, and interactive image lightboxes.
 */

(function() {
    // Initialize EmailJS with your Public Key if present in environment context
    if (typeof emailjs !== 'undefined') {
        emailjs.init("YOUR_PUBLIC_KEY");
    } else {
        console.warn("Blue Corp System: EmailJS SDK not detected in environment runtime.");
    }
})();

document.addEventListener("DOMContentLoaded", () => {
    // ==========================================
    // 1. GLOBAL NAVIGATION & LAYOUT HANDLERS
    // ==========================================
    const navTrigger = document.getElementById("nav-trigger");
    const navigationMenu = document.querySelector("nav");

    if (navTrigger && navigationMenu) {
        navTrigger.addEventListener("change", () => {
            if (navTrigger.checked) {
                navigationMenu.classList.add("nav-active");
                document.body.style.overflow = "hidden";
            } else {
                navigationMenu.classList.remove("nav-active");
                document.body.style.overflow = "auto";
            }
        });
    }

    // Smooth Scrolling & Sub-Nav Node Monitoring
    const subNavLinks = document.querySelectorAll(".sub-nav-bar a");
    subNavLinks.forEach(link => {
        link.addEventListener("click", (event) => {
            const targetId = link.getAttribute("href");
            if (targetId && targetId.startsWith("#")) {
                event.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
                    
                    // Toggle contextual node indicators
                    subNavLinks.forEach(l => l.classList.remove("active-node"));
                    link.classList.add("active-node");
                }
            }
        });
    });

    // ==========================================
    // 2. INTERACTIVE VISUAL LIGHTBOX MODULE
    // ==========================================
    const lightboxOverlay = document.getElementById("matrixLightboxOverlay");
    const lightboxImage = document.getElementById("matrixLightboxImage");
    const lightboxClose = document.getElementById("matrixLightboxClose");
    const triggerImages = document.querySelectorAll(".lightbox-trigger-img");

    if (lightboxOverlay && lightboxImage && lightboxClose) {
        // Open Lightbox
        triggerImages.forEach(image => {
            image.addEventListener("click", () => {
                lightboxImage.src = image.src;
                lightboxImage.alt = image.alt;
                lightboxOverlay.classList.add("active");
                document.body.style.overflow = "hidden"; // Trap document background scroll
            });
        });

        // Close functions grouped cleanly
        const closeMatrixLightbox = () => {
            lightboxOverlay.classList.remove("active");
            document.body.style.overflow = "auto";
            setTimeout(() => { lightboxImage.src = ""; }, 300); // Clear layout memory on complete fade out
        };

        lightboxClose.addEventListener("click", closeMatrixLightbox);
        
        // Close via structural backdrop target clicks
        lightboxOverlay.addEventListener("click", (e) => {
            if (e.target === lightboxOverlay) {
                closeMatrixLightbox();
            }
        });

        // Keyboard navigation fallback
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && lightboxOverlay.classList.contains("active")) {
                closeMatrixLightbox();
            }
        });
    } else {
        console.info("Blue Corp Lightbox: Visual matrix elements missing for this page node.");
    }

    // ==========================================
    // 3. WISHLIST MATRIX ALERT AUTOMATION
    // ==========================================
    const alertForms = document.querySelectorAll(".alert-trigger-form");

    alertForms.forEach(form => {
        form.addEventListener("submit", function(event) {
            event.preventDefault();

            const button = form.querySelector("button");
            const gameNameInput = form.querySelector('input[name="game_name"]');
            const priceStatusInput = form.querySelector('input[name="price_status"]');

            // Extraction validation checks to prevent initialization failures
            if (!button || !gameNameInput || !priceStatusInput) {
                console.error("Blue Corp Framework: Form elements incorrectly configured in document structure.");
                return;
            }

            const gameName = gameNameInput.value;
            const priceStatus = priceStatusInput.value;

            button.textContent = "Sending Alert...";
            button.disabled = true;

            const templateParams = {
                to_name: "Client",
                subject: `Flash Pricing Event Triggered: ${gameName}`,
                message: `Automated notification tracking event. Game: ${gameName} has reached state: ${priceStatus}.`,
                reply_to: "noreply@bluecorpindustries.co.za"
            };

            if (typeof emailjs !== 'undefined') {
                emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", templateParams)
                    .then(() => {
                        button.textContent = "Alert Triggered!";
                        button.style.backgroundColor = "var(--proposal-mint)";
                        alert(`Price matrix alert dispatched successfully for ${gameName}!`);
                    })
                    .catch((error) => {
                        console.error("EmailJS Error details:", error);
                        resetAlertButton(button);
                    });
            } else {
                console.warn("EmailJS context missing. Simulating interface completion trigger.");
                setTimeout(() => {
                    button.textContent = "Mock Alert Sent!";
                    button.style.backgroundColor = "var(--proposal-mint)";
                    alert(`[MOCK MODE] Price matrix alert generated for ${gameName}.`);
                }, 1000);
            }
        });
    });

    function resetAlertButton(button) {
        button.textContent = "Trigger Failed";
        button.style.backgroundColor = "#ff4d4d";
        button.disabled = false;
        alert("System failed to pass alert parameters through server context.");
    }

    console.log("Blue Corp Core Framework: Node ZA-South Operational with Lightbox Matrix Engine.");
});
