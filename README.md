# Blue Corp Industries

Blue Corp Industries is a front-end gaming and PC hardware ecosystem website. The project brings together a game catalogue, product and PC-building information, community resources, customer support, enquiries, a wishlist, and a user inventory in one website.

The website is built with **HTML, CSS, and JavaScript**, with a dark cyber-inspired interface and responsive page layouts.

## Project Overview

The platform is intended to make it easier for customers to:
- Explore featured PC and console games and view game information, screenshots, and system requirements.
- Browse products and PC-building assistance.
- Add displayed products to a shopping cart.
- Save items to a wishlist and view sale-monitoring information.
- Find community discussions, guides, and workshop content.
- Contact the business or submit a PC-building and developer-program enquiry.
- View a sample user profile and digital inventory.

## Website Pages

| Page | Description |
| --- | --- |
| `index.html` | Homepage with featured games, product highlights, and site navigation. |
| `Pages/AboutUs.html` | Company background, mission, vision, and values. |
| `Pages/contact.html` | Contact information and customer support form. |
| `Pages/enquiry.html` | Enquiry form for PC-building assistance and solo developer programme requests. |
| `Pages/GameDetail.html` | Game catalogue with descriptions, system requirements, and gameplay screenshots. |
| `Pages/Products.html` | Products, services, user-profile and package-tracking content. |
| `Pages/wishlist.html` | Wishlist items and sale-alert interface. |
| `Pages/UserProfile-Inventory.html` | User profile, digital inventory, and account information. |
| `Pages/CommunityHub-Workshop.html` | Community discussions, guides, member information, and workshop content. |
| `Pages/Menu.html` | Directory of the website's main sections. |

## Main Features

### Search and navigation
- Shared navigation and responsive page layouts.
- JavaScript-powered search suggestions for games, services, support information, community content, and other site sections.
- Search results can direct users to relevant sections of the website.

### Game catalogue and media
- Game descriptions and system requirement information.
- Gameplay screenshot galleries.
- Image lightbox for viewing supported images at a larger size.

### Shopping cart
- Add-to-cart controls on supported product cards.
- Cart drawer with item quantities and removal controls.
- Cart contents are stored in the browser using `localStorage`, so they remain available in that browser between page visits.

### Wishlist and account content
- Wishlist cards with sale-monitoring and alert interface elements.
- User profile and digital inventory display.
- Package-tracking and purchase-compensation example content.

### Contact and enquiry forms
- Required-field validation for the contact and enquiry forms.
- EmailJS integration for form submission.
- On-page status and notification feedback.

### Community and workshop
- Community discussion and member sections.
- Hardware guides and workshop/mod content.
- Supporting images and visual resources.

> **Note:** Some website content demonstrates proposed or simulated platform workflows. For example, wishlist sale alerts and package-tracking examples should not be interpreted as confirmation of a live notification or courier service. EmailJS form delivery also depends on the configured EmailJS service, template, public key, and account settings.

## Technology Stack

- **HTML5** – page structure and content.
- **CSS3** – styling, responsive layouts, and visual effects.
- **JavaScript** – search, lightbox, cart interactions, form validation, and interface feedback.
- **EmailJS** – contact and enquiry form delivery.
- **Browser localStorage** – client-side shopping cart persistence.

## Project Structure

The main website files are organised as follows:

```text
BlueCorpIndustries/
├── index.html
├── css/
│   └── style.css
├── JS/
│   ├── GameDetail.js
│   ├── Product.js
│   ├── UserProfile-Inventory.js
│   ├── Wishlist.js
│   ├── contact.js
│   ├── enquiry.js
│   ├── globalsearch.js
│   └── script.js
├── Assets/
│   └── images/
└── Pages/
    ├── AboutUs.html
    ├── CommunityHub-Workshop.html
    ├── GameDetail.html
    ├── Menu.html
    ├── Products.html
    ├── UserProfile-Inventory.html
    ├── contact.html
    ├── enquiry.html
    └── wishlist.html
```

The repository also contains a `BlueCorpIndustries/` subfolder with a secondary copy of project resources, including sitemap and crawler configuration files. Check the paths referenced by each page when working with either copy.

## Running the Website Locally

1. Clone or download this repository.
2. Open the project folder in Visual Studio Code or another code editor.
3. Open `index.html` in a browser, or use the Live Server extension in Visual Studio Code.
4. Navigate through the website using the page navigation.
5. If you make changes to CSS, JavaScript, or images, refresh the browser to view the updates.

For contact and enquiry email delivery, ensure the EmailJS SDK and account configuration are valid before testing form submissions.

## Recent Updates

Recent commits (30 October – 2 November 2026) include:

- Updated the layouts and presentation across the homepage and the main website pages.
- Added and refined shopping cart functionality on the homepage, wishlist, and user profile/inventory experience.
- Added and updated JavaScript files for page interactions and global search suggestions.
- Improved the search experience to help visitors find games, services, support information, and community content across the website.
- Added sitemap and crawler configuration resources.
- Updated the About Us and Community Hub pages with revised layouts and content.
- Improved the contact and enquiry forms, including required-field validation.
- Updated game catalogue content and gameplay screenshots.
- Added image assets and refined the shared visual presentation.

## Project Purpose

This project demonstrates the design and front-end development of a gaming marketplace and PC hardware support website. It combines product discovery, community information, customer contact, and account-style interfaces into one connected website experience.
