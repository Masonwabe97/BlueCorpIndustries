/* ==========================================================
   BLUE CORP INDUSTRIES - GLOBAL CORE SCRIPT & CART ENGINE
   ========================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    /* 1. GLOBAL LIGHTBOX ENGINE */
    const lightboxOverlay = document.getElementById('matrixLightboxOverlay');
    const lightboxImage = document.getElementById('matrixLightboxImage');
    const lightboxClose = document.getElementById('matrixLightboxClose');

    if (lightboxOverlay && lightboxImage) {
        document.querySelectorAll('.lightbox-trigger-img, .profile-visual, .stash-preview-img, .directory-thumb, .showroom-card img, .screenshot-gallery img').forEach(img => {
            img.style.cursor = 'zoom-in';
            img.addEventListener('click', () => {
                lightboxImage.src = img.src;
                lightboxImage.alt = img.alt || "Enlarged Telemetry Visual Matrix";
                lightboxOverlay.classList.add('active');
            });
        });

        const closeLightbox = () => lightboxOverlay.classList.remove('active');
        if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
        lightboxOverlay.addEventListener('click', (e) => {
            if (e.target === lightboxOverlay) closeLightbox();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeLightbox();
        });
    }

    /* 2. LIVE PRODUCT SEARCH ENGINE */
    const searchInput = document.getElementById('globalProductSearch');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            
            // Target product cards across Showroom, Wishlist, Menu, etc.
            const cards = document.querySelectorAll('.showroom-card, .wishlist-item-card, .guide-col-item');
            
            cards.forEach(card => {
                const textContent = card.textContent.toLowerCase();
                if (textContent.includes(query) || query === '') {
                    card.style.display = '';
                    card.style.animation = 'matrixFadeIn 0.4s ease-out forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    /* 3. E-COMMERCE CART ENGINE */
    let cart = JSON.parse(localStorage.getItem('bci_cart')) || [];

    // Inject Cart Drawer HTML into body if not present
    if (!document.getElementById('bciCartDrawer')) {
        const cartDrawerHTML = `
            <div id="bciCartOverlay" style="position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(10,10,15,0.85);z-index:99999;display:none;align-items:center;justify-content:flex-end;opacity:0;transition:opacity 0.3s ease;">
                <div id="bciCartDrawer" style="width:100%;max-width:400px;height:100%;background:#0d111c;border-left:1px solid rgba(0,210,255,0.3);box-shadow:-5px 0 30px rgba(0,0,0,0.5);display:flex;flex-direction:column;padding:2rem;box-sizing:border-box;color:#fff;transform:translateX(100%);transition:transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);">
                    <div style="display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid rgba(255,255,255,0.1);padding-bottom:1rem;margin-bottom:1.5rem;">
                        <h3 style="margin:0;color:#00d2ff;font-size:1.2rem;">🛒 Shopping Cart Stash</h3>
                        <button id="bciCartClose" style="background:none;border:none;color:#fff;font-size:1.5rem;cursor:pointer;">&times;</button>
                    </div>
                    <div id="bciCartItemsList" style="flex:1;overflow-y:auto;display:flex;flex-direction:column;gap:1rem;padding-right:4px;">
                        <!-- Cart items populate dynamically -->
                    </div>
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

    // Function to open/close cart drawer
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

    // Add To Cart global trigger handler
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
            showToast(`Added "${name}" to your cart stash!`);
            toggleCartDrawer(true);
        }

        // Remove item
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
                showToast("Your cart is empty. Add items before checking out.");
                return;
            }
            checkoutBtn.textContent = "Processing Secure Transaction...";
            checkoutBtn.disabled = true;
            setTimeout(() => {
                showToast("Checkout Successful! Order node logged to ZA-South server.");
                cart = [];
                saveAndSyncCart();
                renderCartItems();
                checkoutBtn.textContent = "Proceed to Secure Checkout";
                checkoutBtn.disabled = false;
                toggleCartDrawer(false);
            }, 1500);
        });
    }

    // Initialize badge count on load
    updateCartBadgeCount();

    function showToast(message) {
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