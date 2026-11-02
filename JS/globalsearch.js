document.addEventListener("DOMContentLoaded", () => {
    // --- 1. GLOBAL SEARCH INDEX ---
    // Maps searchable items to their target URLs and metadata across the site ecosystem.
    const searchIndex = [
        // Games & Catalog
        { title: "Resident Evil Village", category: "Game / Catalog", url: "GameDetail.html#resident-evil", desc: "Capcom 2021 survival horror game. Price: R600." },
        { title: "God of War IV", category: "Game / Catalog", url: "GameDetail.html#god-of-war", desc: "Norse epic journey with Kratos and Atreus. Price: R700." },
        { title: "Peak", category: "Game / Catalog", url: "GameDetail.html#peak", desc: "Minimalist indie puzzle strategy title. Price: R330." },
        
        // Enquiry & Custom Configs
        { title: "PC Build Assistance (Beginners)", category: "Enquiry", url: "enquiry.html#intake", desc: "Beginner hardware guidance and configuration intake." },
        { title: "Solo Developer Program Enrollment", category: "Enquiry", url: "enquiry.html#intake", desc: "Program enrollment for independent creators and devs." },
        
        // Contact & Support
        { title: "Voice Support Desk", category: "Contact", url: "contact.html#desk", desc: "Local telemetry communication lines for live assistance." },
        { title: "Operational Base Map", category: "Contact", url: "contact.html#desk", desc: "32 Frere Rd, Vincent, KuGompo City, 5241." },
        
        // Community Hub & Workshop
        { title: "Community Discussions Feed", category: "Community", url: "CommunityHub-Workshop.html#discussions", desc: "Share ideas, review patches, and engage with developers." },
        { title: "Beginner Custom Overclocking Setup", category: "Guide", url: "CommunityHub-Workshop.html#guides", desc: "Hardware modification tutorials and optimization metrics." },
        { title: "Transaction Routing Debug Vectors", category: "Guide", url: "CommunityHub-Workshop.html#guides", desc: "Network optimization and transaction routing logs." },
        { title: "Tactical Alliance HD Texture Pack", category: "Workshop Mod", url: "CommunityHub-Workshop.html#mods", desc: "High-definition texture node file pack modification." },
        
        // Corporate & Account
        { title: "Operator Profile & Inventory", category: "Account", url: "UserProfile-Inventory.html#profile", desc: "View digital license keys and tier-1 clearance level." },
        { title: "About Us Mission & Vision", category: "Corporate", url: "AboutUs.html#mission", desc: "Helping game developers and making PC building accessible." }
    ];

    // --- 2. SEARCH DOM ELEMENTS ---
    const searchInput = document.getElementById("product-search");
    const searchSuggestions = document.getElementById("search-suggestions");
    const searchCount = document.getElementById("search-count");

    if (searchInput && searchSuggestions) {
        // Determine whether we are in the root directory or the /Pages/ directory
        // to prefix URLs correctly.
        const isInPagesDir = window.location.pathname.includes("/Pages/");

        searchInput.addEventListener("input", (e) => {
            const query = e.target.value.trim().toLowerCase();

            if (query.length === 0) {
                searchSuggestions.hidden = true;
                searchSuggestions.innerHTML = "";
                if (searchCount) searchCount.textContent = "";
                return;
            }

            // Filter index based on query matching title, category, or description
            const matches = searchIndex.filter(item => 
                item.title.toLowerCase().includes(query) || 
                item.category.toLowerCase().includes(query) || 
                item.desc.toLowerCase().includes(query)
            );

            // Update match count indicator
            if (searchCount) {
                searchCount.textContent = matches.length > 0 
                    ? `${matches.length} result${matches.length === 1 ? '' : 's'} found` 
                    : "No matching records";
            }

            // Render suggestions dropdown
            if (matches.length > 0) {
                searchSuggestions.innerHTML = matches.map(item => {
                    // Adjust path depending on current location
                    const targetUrl = isInPagesDir ? item.url : `Pages/${item.url}`;
                    return `
                        <a href="${targetUrl}" style="display: block; padding: 10px 12px; border-bottom: 1px solid rgba(0,210,255,0.1); text-decoration: none; color: #fff; transition: background 0.2s;">
                            <div style="font-size: 0.85rem; font-weight: bold; color: #00d2ff;">${item.title}</div>
                            <div style="font-size: 0.75rem; color: #94a3b8; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${item.desc}</div>
                        </a>
                    `;
                }).join('');
                
                // Add hover style effect to generated suggestion links
                searchSuggestions.querySelectorAll('a').forEach(link => {
                    link.addEventListener('mouseenter', () => link.style.background = 'rgba(0, 210, 255, 0.1)');
                    link.addEventListener('mouseleave', () => link.style.background = 'transparent');
                });

                searchSuggestions.hidden = false;
            } else {
                searchSuggestions.innerHTML = `<div style="padding: 10px 12px; font-size: 0.8rem; color: #94a3b8;">No ecosystem matches found.</div>`;
                searchSuggestions.hidden = false;
            }
        });

        // Hide suggestions when clicking outside search bar
        document.addEventListener("click", (e) => {
            if (!searchInput.contains(e.target) && !searchSuggestions.contains(e.target)) {
                searchSuggestions.hidden = true;
            }
        });

        // Show suggestions again if focusing input with existing text
        searchInput.addEventListener("focus", () => {
            if (searchInput.value.trim().length > 0) {
                searchSuggestions.hidden = false;
            }
        });
    }

    // --- 3. GLOBAL CART DRAWER HANDLER (Stub) ---
    // Prevents ReferenceError when clicking the Cart button in the header
    window.toggleCartDrawer = function(open) {
        console.log("Cart drawer toggle requested:", open);
        // Implement your cart drawer toggle logic here if needed
        alert("Cart Stash drawer functionality initialized. Items in cart: 0");
    };
});