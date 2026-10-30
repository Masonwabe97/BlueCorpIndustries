/**
 * Blue Corp Industries - Global Core Script & Engine
 * Handles navigation, lightbox inspection, live search, suggestions, cart stash, and EmailJS form dispatch with validation.
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log("Blue Corp Core Framework Initialized. ZA-South Node active.");

    /* ==========================================================
       1. GLOBAL LIGHTBOX INSPECTION ENGINE
       ========================================================== */
    const lightboxOverlay = document.getElementById('matrixLightboxOverlay');
    const lightboxImage = document.getElementById('matrixLightboxImage');
    const lightboxClose = document.getElementById('matrixLightboxClose');

    // Inject global lightbox overlay if not present in HTML
    if (!lightboxOverlay) {
        const globalLightboxHTML = `
            <div id="matrixLightboxOverlay" style="position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(10,10,15,0.92);z-index:100000;display:none;align-items:center;justify-content:center;opacity:0;transition:opacity 0.3s ease;">
                <button id="matrixLightboxClose" style="position:absolute;top:25px;right:25px;background:#1a1a24;color:#00d2ff;border:1px solid #00d2ff;padding:8px 16px;border-radius:4px;cursor:pointer;font-weight:bold;font-size:1rem;">[ ESC / CLOSE ]</button>
                <img id="matrixLightboxImage" src="" alt="Enlarged Telemetry Visual Matrix" style="max-width:85vw;max-height:80vh;border-radius:6px;border:1px solid #00d2ff;box-shadow:0 0 30px rgba(0,210,255,0.3);object-fit:contain;background:#000;">
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', globalLightboxHTML);
    }

    const activeOverlay = document.getElementById('matrixLightboxOverlay');
    const activeImage = document.getElementById('matrixLightboxImage');
    const activeClose = document.getElementById('matrixLightboxClose');

    document.querySelectorAll('.lightbox-trigger-img, .profile-visual, .stash-preview-img, .directory-thumb, .showroom-card img, .screenshot-gallery img, .contact-col-item img, #discussions img, .guide-col-item img, .member-profile-card img, main section img').forEach(img => {
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', (e) => {
            if (e.target.tagName === 'BUTTON') return;
            if (activeImage && activeOverlay) {
                activeImage.src = img.src;
                activeImage.alt = img.alt || "Enlarged Telemetry Visual Matrix";
                activeOverlay.style.display = 'flex';
                requestAnimationFrame(() => { activeOverlay.style.opacity = '1'; });
            }
        });
    });

    const closeLightbox = () => {
        if (activeOverlay) {
            activeOverlay.style.opacity = '0';
            setTimeout(() => { activeOverlay.style.display = 'none'; }, 300);
        }
    };

    if (activeClose) activeClose.addEventListener('click', closeLightbox);
    if (activeOverlay) activeOverlay.addEventListener('click', (e) => {
        if (e.target === activeOverlay) closeLightbox();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeLightbox();
    });


    /* ==========================================================
       2. LIVE PRODUCT SEARCH & SUGGESTIONS ENGINE
       ========================================================== */
    const searchInput = document.getElementById('product-search');
    const searchSuggestions = document.getElementById('search-suggestions');
    const searchCount = document.getElementById('search-count');

    if (searchInput) {
        const searchableItems = Array.from(document.querySelectorAll('.showroom-card, .wishlist-item-card, .guide-col-item, .contact-col-item, .featured-card')).map(card => {
            const titleEl = card.querySelector('h3, h4');
            const linkEl = card.querySelector('a');
            return {
                element: card,
                title: titleEl ? titleEl.textContent.trim() : 'Telemetry Item',
                text: card.textContent.toLowerCase(),
                url: linkEl ? linkEl.href : '#'
            };
        });

        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            let matchCount = 0;

            searchableItems.forEach(item => {
                if (item.text.includes(query) || query === '') {
                    item.element.style.display = '';
                    item.element.style.animation = 'matrixFadeIn 0.4s ease-out forwards';
                    matchCount++;
                } else {
                    item.element.style.display = 'none';
                }
            });

            if (searchCount) {
                searchCount.textContent = query === '' ? '' : `Found ${matchCount} matching telemetry node${matchCount === 1 ? '' : 's'}.`;
            }

            if (searchSuggestions) {
                if (query.length < 2) {
                    searchSuggestions.hidden = true;
                    searchSuggestions.innerHTML = '';
                } else {
                    const matches = searchableItems.filter(item => item.text.includes(query)).slice(0, 5);
                    if (matches.length > 0) {
                        searchSuggestions.hidden = false;
                        searchSuggestions.innerHTML = matches.map(m => `
                            <div class="search-suggestion-item" style="padding: 10px 15px; cursor: pointer; border-bottom: 1px solid rgba(0,210,255,0.1); transition: background 0.2s;" onmouseover="this.style.background='rgba(0,210,255,0.1)'" onmouseout="this.style.background='transparent'" onclick="window.location.href='${m.url}'">
                                <strong style="color: #00d2ff; display: block; font-size: 0.9rem;">${m.title}</strong>
                            </div>
                        `).join('');
                    } else {
                        searchSuggestions.hidden = false;
                        searchSuggestions.innerHTML = `<div style="padding: 10px 15px; color: #94a3b8; font-size: 0.85rem;">No matching nodes found.</div>`;
                    }
                }
            }
        });

        document.addEventListener('click', (e) => {
            if (!searchInput.contains(e.target) && searchSuggestions && !searchSuggestions.contains(e.target)) {
                searchSuggestions.hidden = true;
            }
        });
    }


    /* ==========================================================
       3. E-COMMERCE CART STASH ENGINE
       ========================================================== */
    let cart = JSON.parse(localStorage.getItem('bci_cart')) || [];

    if (!document.getElementById('bciCartDrawer')) {
        const cartDrawerHTML = `
            <div id="bciCartOverlay" style="position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(10,10,15,0.85);z-index:999999;display:none;align-items:center;justify-content:flex-end;opacity:0;transition:opacity 0.3s ease;">
                <div id="bciCartDrawer" style="width:100%;max-width:400px;height:100%;background:#0d111c;border-left:1px solid rgba(0,210,255,0.3);box-shadow:-5px 0 30px rgba(0,0,0,0.5);display:flex;flex-direction:column;padding:2rem;box-sizing:border-box;color:#fff;transform:translateX(100%);transition:transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);">
                    <div style="display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid rgba(255,255,255,0.1);padding-bottom:1rem;margin-bottom:1.5rem;">
                        <h3 style="margin:0;color:#00d2ff;font-size:1.2rem;">🛒 Shopping Cart Stash</h3>
                        <button id="bciCartClose" style="background:none;border:none;color:#fff;font-size:1.5rem;cursor:pointer;">&times;</button>
                    </div>
                    <div id="bciCartItemsList" style="flex:1;overflow-y:auto;display:flex;flex-direction:column;gap:1rem;padding-right:4px;"></div>
                    <div style="border-top:1px solid rgba(255,255,255,0.1);padding-top:1.5rem;margin-top:auto;">
                        <div style="display:flex;justify-content:space-between;margin-bottom:1rem;font-size:1.1rem;font-weight:bold;">
                            <span>Total Stash Value:</span>
                            <span id="bciCartTotalPrice" style="color:#2ecc71;">R0</span>
                        </div>
                        <button id="bciCheckoutBtn" style="width:100%;background:#00d2ff;color:#000;border:none;padding:12px;border-radius:4px;font-weight:bold;cursor:pointer;text-transform:uppercase;letter-spacing:0.05em;transition:background 0.2s;">Proceed to Secure Checkout</button>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', cartDrawerHTML);
    }

    const cartOverlay = document.getElementById('bciCartOverlay');
    const cartDrawer = document.getElementById('bciCartDrawer');
    const cartClose = document.getElementById('bciCartClose');
    const cartItemsList = document.getElementById('bciCartItemsList');
    const cartTotalPrice = document.getElementById('bciCartTotalPrice');
    const checkoutBtn = document.getElementById('bciCheckoutBtn');

    window.toggleCartDrawer = function(open = true) {
        if (!cartOverlay || !cartDrawer) return;
        if (open) {
            cartOverlay.style.display = 'flex';
            requestAnimationFrame(() => {
                cartOverlay.style.opacity = '1';
                cartDrawer.style.transform = 'translateX(0)';
            });
            renderCartItems();
        } else {
            cartOverlay.style.opacity = '0';
            cartDrawer.style.transform = 'translateX(100%)';
            setTimeout(() => { cartOverlay.style.display = 'none'; }, 300);
        }
    };

    if (cartClose) cartClose.addEventListener('click', () => toggleCartDrawer(false));
    if (cartOverlay) cartOverlay.addEventListener('click', (e) => {
        if (e.target === cartOverlay) toggleCartDrawer(false);
    });

    document.body.addEventListener('click', (e) => {
        if (e.target.classList.contains('bci-add-to-cart-btn')) {
            const name = e.target.getAttribute('data-name');
            const price = parseFloat(e.target.getAttribute('data-price'));
            const image = e.target.getAttribute('data-image') || '';

            const existingItem = cart.find(item => item.name === name);
            if (existingItem) {
                existingItem.qty += 1;
            } else {
                cart.push({ name, price, image, qty: 1 });
            }

            saveAndSyncCart();
            showNotification(`Added "${name}" to your cart stash!`);
            toggleCartDrawer(true);
        }

        if (e.target.classList.contains('bci-cart-item-remove')) {
            const index = parseInt(e.target.getAttribute('data-index'));
            cart.splice(index, 1);
            saveAndSyncCart();
            renderCartItems();
        }
    });

    function saveAndSyncCart() {
        localStorage.setItem('bci_cart', JSON.stringify(cart));
        updateCartBadgeCount();
    }

    function updateCartBadgeCount() {
        const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);
        document.querySelectorAll('.bci-cart-counter-badge').forEach(badge => {
            badge.textContent = totalCount;
            badge.style.display = totalCount > 0 ? 'inline-block' : 'none';
        });
    }

    function renderCartItems() {
        if (!cartItemsList) return;
        if (cart.length === 0) {
            cartItemsList.innerHTML = `<p style="color:#94a3b8;text-align:center;margin-top:2rem;">Your cart stash is currently empty.</p>`;
            if (cartTotalPrice) cartTotalPrice.textContent = 'R0';
            return;
        }

        let total = 0;
        cartItemsList.innerHTML = cart.map((item, index) => {
            const itemTotal = item.price * item.qty;
            total += itemTotal;
            return `
                <div style="display:flex;align-items:center;background:rgba(20,25,40,0.6);border:1px solid rgba(0,210,255,0.15);border-radius:6px;padding:10px;gap:10px;">
                    ${item.image ? `<img src="${item.image}" style="width:50px;height:50px;object-fit:contain;background:#000;border-radius:4px;padding:2px;" alt="">` : ''}
                    <div style="flex:1;">
                        <h4 style="margin:0 0 4px 0;font-size:0.95rem;color:#fff;">${item.name}</h4>
                        <p style="margin:0;font-size:0.85rem;color:#00d2ff;">R${item.price} &times; ${item.qty}</p>
                    </div>
                    <button class="bci-cart-item-remove" data-index="${index}" style="background:none;border:none;color:#ff5252;cursor:pointer;font-size:1.1rem;font-weight:bold;" title="Remove">&times;</button>
                </div>
            `;
        }).join('');

        if (cartTotalPrice) cartTotalPrice.textContent = `R${total}`;
    }

    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (cart.length === 0) {
                showNotification("Your cart is empty. Add items before checking out.");
                return;
            }
            checkoutBtn.textContent = "Processing Secure Transaction...";
            checkoutBtn.disabled = true;
            setTimeout(() => {
                showNotification("Checkout Successful! Order node logged to ZA-South server.");
                cart = [];
                saveAndSyncCart();
                renderCartItems();
                checkoutBtn.textContent = "Proceed to Secure Checkout";
                checkoutBtn.disabled = false;
                toggleCartDrawer(false);
            }, 1500);
        });
    }

    updateCartBadgeCount();


    /* ==========================================================
       4. EMAILJS FORM INTEGRATION & EMPTY FIELD VALIDATION
       ========================================================== */
    if (typeof emailjs !== 'undefined') {
        emailjs.init("SO9F5KEvIMHjvswWH");
    }

    const contactForm = document.getElementById('contactForm');
    const enquiryForm = document.getElementById('enquiryForm');

    [contactForm, enquiryForm].forEach(form => {
        if (form) {
            form.addEventListener('submit', function(event) {
                event.preventDefault();

                // Check for empty required fields manually
                const requiredFields = form.querySelectorAll('[required]');
                let isValid = true;

                requiredFields.forEach(field => {
                    if (!field.value.trim()) {
                        isValid = false;
                        field.style.borderColor = '#ff5252'; // Highlight empty field in red
                    } else {
                        field.style.borderColor = 'rgba(0,210,255,0.3)';
                    }
                });

                if (!isValid) {
                    showNotification("Error: Please complete all required telemetry parameters before dispatch.");
                    return; // Stop form execution if empty
                }

                // Proceed with EmailJS dispatch if valid
                const submitBtn = form.querySelector('button[type="submit"]');
                const originalText = submitBtn ? submitBtn.textContent : 'Submit';

                if (submitBtn) {
                    submitBtn.textContent = "Routing Telemetry Packet...";
                    submitBtn.disabled = true;
                    submitBtn.style.opacity = "0.7";
                }

                emailjs.sendForm('service_9b553fo', 'template_epeerz7', this)
                    .then(() => {
                        showNotification("Success: Message routed successfully to Blue Corp Operations!");
                        form.reset();

                        // Reset field border styles
                        requiredFields.forEach(field => {
                            field.style.borderColor = 'rgba(0,210,255,0.3)';
                        });

                        if (submitBtn) {
                            submitBtn.textContent = "Dispatched ✓";
                            submitBtn.style.backgroundColor = "#2ecc71";
                            submitBtn.style.color = "#000";

                            setTimeout(() => {
                                submitBtn.textContent = originalText;
                                submitBtn.disabled = false;
                                submitBtn.style.backgroundColor = "";
                                submitBtn.style.color = "";
                                submitBtn.style.opacity = "1";
                            }, 3000);
                        }
                    }, (error) => {
                        console.error('EmailJS Error:', error);
                        showNotification("Transmission Error: Failed to dispatch parameters.");

                        if (submitBtn) {
                            submitBtn.textContent = originalText;
                            submitBtn.disabled = false;
                            submitBtn.style.opacity = "1";
                        }
                    });
            });
        }
    });

    // Showroom Card Smooth Scrolling
    const showroomCards = document.querySelectorAll('.showroom-card');
    showroomCards.forEach((card, index) => {
        const targets = ['#resident-evil', '#god-of-war', '#peak'];
        const targetId = targets[index];

        card.addEventListener('click', (e) => {
            if (e.target.tagName === 'BUTTON') return;
            const titleElement = card.querySelector('h3');
            const title = titleElement ? titleElement.textContent : 'Game Showroom';
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                showNotification(`Loaded tactical specs for: ${title}`);
            }
        });
    });


    /* ==========================================================
       5. DYNAMIC NOTIFICATION TOAST SYSTEM
       ========================================================== */
    function showNotification(message) {
        let toastContainer = document.querySelector('.toast-container');
        if (!toastContainer) {
            toastContainer = document.createElement('div');
            toastContainer.className = 'toast-container';
            Object.assign(toastContainer.style, {
                position: 'fixed',
                bottom: '20px',
                right: '20px',
                zIndex: '999999',
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