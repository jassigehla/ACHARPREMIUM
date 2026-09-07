# ACHARPREMIUM

> **Gourmet pickles, tailored for your taste.**

ACHARPREMIUM is a modern e-commerce platform for handcrafted vegetable pickles with fully customizable flavors, premium packaging, and an intuitive online shopping experience. This project showcases a complete product showcase and ordering system with features like product browsing, customization, cart management, and secure checkout.

---

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Repository Structure](#repository-structure)
- [Installation](#installation)
- [Usage Guide](#usage-guide)
- [Key Sections](#key-sections)
- [Product Catalog](#product-catalog)
- [Customization System](#customization-system)
- [Cart & Checkout](#cart--checkout)
- [Responsive Design](#responsive-design)
- [JavaScript Functionality](#javascript-functionality)
- [Contributing Guidelines](#contributing-guidelines)
- [License](#license)

---

## 🎯 Project Overview

**ACHARPREMIUM** delivers handcrafted gourmet pickles with:
- **11 signature vegetable pickle varieties** - from classic mango to coconut pepper bliss
- **100% customizable recipes** - choose vegetables, spice levels, oils, and jar sizes
- **Premium user experience** - intuitive navigation, smooth animations, and responsive design
- **Complete e-commerce flow** - browse, customize, sign up, and checkout

This is a frontend-focused web application built with HTML, CSS, and vanilla JavaScript, featuring a dark-themed modern design with a 5-step customer journey system.

---

## ✨ Features

### 🛍️ Core Features
- **Product Catalog**: Browse 11 handcrafted pickle varieties
- **Product Filtering**: Filter by category (All, Spicy, Sweet, Traditional)
- **Product Image Sliders**: View multiple product images with navigation controls
- **Shopping Cart**: Add items to cart with real-time price calculation
- **Local Storage**: Cart persistence using browser localStorage
- **Custom Pickle Builder**: Full customization form with options for:
  - Vegetable base (11 options)
  - Spice level (Mild, Medium, Hot, Extra Hot)
  - Oil type (Mustard, Sesame, Sunflower, Olive)
  - Jar size (250ml, 500ml, 750ml, 1L)

### 📱 User Experience
- **Journey Progress Bar**: Visual 5-step progress indicator (Start → Browse → Customize → Sign Up → Checkout)
- **Responsive Navigation**: Desktop and mobile-optimized menus
- **Smooth Scrolling**: Smooth page navigation and scroll behavior
- **Testimonials Section**: Customer reviews and feedback
- **FAQ Section**: Answers to common customer questions
- **Newsletter Signup**: Email collection for marketing
- **Checkout Form**: Complete order placement with customer details

### 🎨 Design Features
- **Dark Theme**: Modern dark color scheme with cyan and blue accents
- **Gradient Backgrounds**: Radial and linear gradients for visual depth
- **Animations**: Smooth fade and slide transitions
- **Glassmorphism**: Frosted glass effects with backdrop blur
- **Mobile Responsive**: Fully responsive from 560px to 1440px+

---

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| **HTML5** | Semantic markup and page structure |
| **CSS3** | Styling, animations, and responsive design |
| **JavaScript (ES6)** | Dynamic functionality and interactivity |
| **localStorage** | Client-side cart persistence |
| **Google Fonts** | Inter font family for typography |

**No frameworks or external dependencies** - Pure vanilla JavaScript for maximum performance.

---

## 📁 Repository Structure

```
ACHARPREMIUM/
├── index.html           # Main homepage with all sections
├── about.html          # About page (supplementary)
├── signup.html         # Signup page (supplementary)
├── checkout.html       # Checkout page (supplementary)
├── styles.css          # Main stylesheet with responsive design
├── script.js           # JavaScript for cart, filters, and interactions
├── assets/             # Product images and media
│   ├── pickle-01.svg   # Classic Mango Achar
│   ├── pickle-02.svg   # Garlic Lemon Pickle
│   ├── pickle-03.svg   # Chili Carrot Crunch
│   ├── pickle-04.svg   # Green Chili Delight
│   ├── pickle-05.svg   # Ginger Honey Pickle
│   ├── pickle-06.svg   # Cumin Cauliflower
│   ├── pickle-07.svg   # Tangy Onion Mix
│   ├── pickle-08.svg   # Spiced Eggplant
│   ├── pickle-09.svg   # Mixed Veggie Symphony
│   ├── pickle-10.svg   # Beetroot Saffron Treat
│   ├── pickle-11.svg   # Coconut Pepper Bliss
│   └── pickle-hero.svg # Hero section image
├── .github/            # GitHub-specific files
├── .vscode/            # VS Code settings
├── .gitattributes      # Git attributes
└── .hintrc            # Web hint configuration

```

---

## 📥 Installation

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Text editor (VS Code, Sublime, etc.) for development
- Git for version control

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/jassigehla/ACHARPREMIUM.git
   cd ACHARPREMIUM
   ```

2. **Open in browser (Local Development)**
   - **Option A**: Double-click `index.html`
   - **Option B**: Use a local server
     ```bash
     # Using Python 3
     python -m http.server 8000
     
     # Using Python 2
     python -m SimpleHTTPServer 8000
     
     # Using Node.js (with http-server installed)
     npx http-server
     ```
   - Then navigate to `http://localhost:8000`

3. **Deploy to GitHub Pages**
   - Merge or push the project to the `main` branch.
   - The included **Deploy storefront to GitHub Pages** workflow publishes the static storefront automatically.
   - In repository **Settings → Pages**, set the source to **GitHub Actions**.
   - The public URL will be shown in the workflow run and Pages settings.

> The browser storefront is static and can be hosted on GitHub Pages. The optional Express/MySQL backend in `backend/` needs a separate Node.js host and database; configure `backend/.env` from `.env.example` before using accounts, newsletter persistence, or live orders.

---

## 🚀 Usage Guide

### Customer Journey

#### **Step 1: Home / Start**
- View hero section with product overview
- See key statistics (12K+ orders, 5-star reviews, 100% customizable)
- Access quick action buttons: "Shop Pickles" and "Customize Your Jar"

#### **Step 2: Browse / Catalog**
- View all 11 pickle varieties
- **Filter by category**: Click filter buttons (All, Spicy, Sweet, Traditional)
- **View product details**: Each product shows:
  - Product number badge
  - Image gallery with slider controls
  - Product name and description
  - Price in USD
  - "Add to cart" button
- Products added to cart appear in the cart summary

#### **Step 3: Customize**
- **Build your custom pickle jar** using the customization form:
  - **Vegetable base**: Choose from 11 options
  - **Spice level**: Select intensity (Mild to Extra Hot)
  - **Oil style**: Choose oil type (Mustard, Sesame, Sunflower, Olive)
  - **Jar size**: Select volume (250ml to 1L)
- Click "Save my custom recipe" to confirm
- Recipe is saved for reference during checkout

#### **Step 4: Sign Up**
- **Join the Pickle Lovers Club**: Enter email address
- Click "Join now" to subscribe
- Receive exclusive offers, seasonal launches, and recipe ideas

#### **Step 5: Checkout**
- **Review cart**: View all added items with quantities and prices
- **Enter customer details**:
  - Full name
  - Email address
  - Delivery address
- **Select payment method**:
  - Credit card
  - UPI
  - Cash on delivery (COD)
- **Place order**: Click "Place order" to complete purchase
- Order summary and delivery information sent via email

### Navigation Options
- **Main navigation**: Top nav bar with links to all sections
- **Journey bar**: Click any step to jump to that section
- **Mobile menu**: Hamburger menu on devices < 760px
- **Smooth scrolling**: All links scroll smoothly to target sections

### Cart Management
- **Add products**: Click "Add to cart" button on any product
- **View cart**: Scroll to checkout section to see cart summary
- **Track total**: Real-time price calculation updated
- **Persistent cart**: Cart data saved to localStorage, survives page reload
- **Clear cart**: Placed orders automatically clear the cart

---

## 🥒 Key Sections

### **Hero Section**
- Bold headline: "AsliAchar brings premium pickles to a beautiful shopfront"
- Product showcase with statistics
- Call-to-action buttons for shopping and customization

### **Product Catalog (Browse Section)**
- Dynamic grid of 11 products
- Category filtering system
- Image slider per product
- Price display and add-to-cart functionality

### **Customization Section**
- Form for building personalized pickle jars
- 4 main customization options
- Feature list highlighting customization benefits

### **About Us Section**
- Brand story and mission
- Information boxes about handmade batches and custom recipes
- Media card with process overview

### **Testimonials Section**
- 3-card grid of customer reviews
- Real customer testimonials
- Social proof for credibility

### **FAQ Section**
- 4 common questions and answers
- Topics: custom recipes, delivery time, preservatives, gift orders

### **Newsletter Signup**
- Email collection form
- Promise of exclusive offers and seasonal launches
- Branded as "Pickle Lovers Club"

### **Checkout Section**
- Cart summary with item details
- Customer information form
- Payment method selection
- Order submission functionality

---

## 🎨 Product Catalog

| # | Product Name | Description | Price | Category |
|---|---|---|---|---|
| 1 | Classic Mango Achar | Sweet, tangy, fenugreek & mustard seeds | $12.00 | Sweet |
| 2 | Garlic Lemon Pickle | Bright citrus, roasted garlic, black pepper | $13.00 | Traditional |
| 3 | Chili Carrot Crunch | Spicy crunchy carrots, sesame & chili oil | $11.00 | Spicy |
| 4 | Green Chili Delight | Bold green chili, garlic, lemon, tangy spices | $12.50 | Spicy |
| 5 | Ginger Honey Pickle | Warm ginger, honey sweetness, saffron | $14.00 | Sweet |
| 6 | Cumin Cauliflower | Earthy cumin, turmeric, rich cauliflower | $12.00 | Traditional |
| 7 | Tangy Onion Mix | Red onions, vinegar, jaggery, aromatic seeds | $10.50 | Traditional |
| 8 | Spiced Eggplant | Velvety eggplant, mustard, chili, kasuri methi | $13.50 | Spicy |
| 9 | Mixed Veggie Symphony | Carrot, chili, cauliflower, mango fusion | $15.00 | Traditional |
| 10 | Beetroot Saffron Treat | Sweet beetroot, saffron, cardamom, citrus | $13.00 | Sweet |
| 11 | Coconut Pepper Bliss | Crisp coconut, black pepper, curry leaf, lime | $14.50 | Spicy |

### Category Distribution
- **Spicy**: 4 products (Chili Carrot, Green Chili, Spiced Eggplant, Coconut Pepper)
- **Sweet**: 3 products (Classic Mango, Ginger Honey, Beetroot Saffron)
- **Traditional**: 4 products (Garlic Lemon, Cumin Cauliflower, Tangy Onion, Mixed Veggie)

---

## ⚙️ Customization System

### Available Options

**Vegetable Base** (11 choices):
- Mango, Carrot, Garlic, Chili, Cauliflower, Onion, Eggplant, Beetroot, Coconut, Mixed Veg, Ginger

**Spice Level** (4 intensities):
- Mild, Medium, Hot, Extra Hot

**Oil Style** (4 types):
- Mustard Oil, Sesame Oil, Sunflower Oil, Olive Oil

**Jar Size** (4 volumes):
- 250ml (single serve), 500ml (small), 750ml (medium), 1L (large)

### Customization Process
1. Select desired options from dropdowns
2. Click "Save my custom recipe"
3. Confirmation message displays
4. Form resets for next customization
5. Custom recipe saved for reference during checkout

---

## 🛒 Cart & Checkout

### Cart Features
- **Real-time updates**: Prices calculated instantly
- **Local storage**: Cart persists across sessions
- **Item tracking**: Shows quantity × price per item
- **Total calculation**: Running sum of all items
- **Empty state**: Displays message when no items added

### Checkout Process
1. **Customer details**:
   - Full name
   - Email address
   - Delivery address (textarea format)

2. **Payment methods**:
   - Credit card
   - UPI (Unified Payments Interface)
   - Cash on Delivery (COD)

3. **Order validation**:
   - Prevents checkout with empty cart
   - Shows alert if cart is empty

4. **Order confirmation**:
   - Success message displayed
   - Form resets
   - Cart clears automatically

### Delivery Information
- **Standard shipping**: 3-5 business days
- **Express options**: Available during checkout
- **Delivery address**: Supports full address format

---

## 📱 Responsive Design

### Breakpoints

| Device | Width | Layout Changes |
|--------|-------|-----------------|
| Desktop | > 960px | Full grid layouts (2-3 columns) |
| Tablet | 760px - 960px | Single column for hero, grids collapse |
| Mobile | < 760px | Mobile menu, full-width buttons |
| Small Mobile | < 560px | Single column for all grids |

### Mobile Optimizations
- **Hamburger menu**: Navigation toggle for screens < 760px
- **Touch-friendly**: Larger tap targets (≥1rem for buttons)
- **Full-width forms**: Input fields span 100% on mobile
- **Stack layouts**: All grids become single column
- **Adjusted padding**: Reduced spacing on small screens

### CSS Media Queries
```css
@media (max-width: 960px)  /* Tablets */
@media (max-width: 760px)  /* Phones */
@media (max-width: 560px)  /* Small phones */
```

---

## ⚡ JavaScript Functionality

### Core Functions

#### **Cart Management**
- `loadCart()` - Retrieves cart from localStorage
- `saveCart()` - Persists cart to localStorage
- `updateCart()` - Updates UI with current cart contents
- `addToCart(productId)` - Adds product to cart, increments quantity
- `formatPrice(value)` - Formats numbers as USD currency

#### **Product Filtering**
- `initProductFilters()` - Sets up category filter buttons
- Filters products by category: all, spicy, sweet, traditional
- Dynamically shows/hides product cards

#### **Product Sliders**
- `initProductSliders()` - Initializes image sliders for each product
- Creates prev/next buttons for gallery navigation
- Tracks current image index
- Displays active image with fade animation

#### **Navigation & Journey**
- `updateJourneyStep()` - Updates journey bar based on scroll position
- Tracks active section as user scrolls
- Updates progress bar width percentage
- Sets aria-current attribute for accessibility

#### **Form Handling**
- `handleFormSubmission(event, message)` - Generic form handler
- Prevents default submission
- Shows confirmation alert
- Resets form fields
- Handles customize, signup, and checkout forms differently

#### **Mobile Menu**
- Hamburger toggle for navigation
- Shows/hides mobile menu
- Updates aria-hidden attribute

### Event Listeners
- **Cart buttons**: "Add to cart" click handlers
- **Filter buttons**: Category filter clicks
- **Slider controls**: Previous/next image navigation
- **Form submissions**: Customize, signup, checkout
- **Scroll events**: Journey bar progress updates
- **Mobile toggle**: Menu visibility toggle

### Data Structures

**Products Array**:
```javascript
const products = [
  { id: 'classic-mango', name: 'Classic Mango Achar', price: 12.0 },
  // ... 11 products total
];
```

**Product Categories**:
```javascript
const productCategories = {
  'classic-mango': 'sweet',
  'garlic-lemon': 'traditional',
  // ... mapping for all 11 products
};
```

**Cart Structure**:
```javascript
cart = {
  'product-id': { id, name, price, quantity },
  // ... multiple items
}
```

---

## 🎨 Design System

### Color Palette
| Variable | Color | Usage |
|----------|-------|-------|
| `--bg` | #07111f | Background |
| `--surface` | #0f1d31 | Cards, panels |
| `--surface-2` | #13243d | Secondary surfaces |
| `--text` | #f4f7fb | Primary text |
| `--muted` | #b8c7db | Secondary text |
| `--accent` | #7c9cff | Blue accent |
| `--accent-2` | #6ee7c6 | Cyan accent |

### Typography
- **Font**: Inter (Google Fonts)
- **Weights**: 400, 500, 600, 700, 800
- **Responsive sizing**: Using `clamp()` for fluid typography
- **Line height**: 1.6

### Components
- **Buttons**: Primary (gradient), Secondary (outline), Tertiary (subtle)
- **Cards**: Rounded corners (1.25rem), subtle borders, background surfaces
- **Forms**: Full-width inputs, rounded fields, clear labels
- **Badges**: Circular numbered badges for products

---

## 🤝 Contributing Guidelines

### How to Contribute

1. **Fork the repository**
   ```bash
   git clone https://github.com/yourusername/ACHARPREMIUM.git
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Follow existing code style
   - Update documentation if needed
   - Test on multiple screen sizes

4. **Commit with clear messages**
   ```bash
   git commit -m "Add feature: description of changes"
   ```

5. **Push to your branch**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Submit a pull request**
   - Describe changes clearly
   - Reference any related issues
   - Wait for code review

### Code Style Guidelines
- **HTML**: Use semantic tags, proper indentation
- **CSS**: Follow the existing color scheme, use CSS variables
- **JavaScript**: Use ES6+ syntax, add comments for complex logic
- **Naming**: Use descriptive names for functions and variables

### Areas for Contribution
- [ ] Add product image assets to `/assets`
- [ ] Implement backend order processing
- [ ] Add payment gateway integration (Stripe, PayPal)
- [ ] Create admin dashboard for inventory management
- [ ] Add user authentication system
- [ ] Implement email notifications
- [ ] Add product reviews and ratings
- [ ] Create order tracking system
- [ ] Add internationalization (i18n)
- [ ] Optimize performance and accessibility

---

## 📄 License

This project is licensed under the **MIT License** - feel free to use it for personal and commercial projects.

### Copyright
© 2026 Achar Premium Pickles. All rights reserved.

---

## 📞 Support & Questions

- **GitHub Issues**: Report bugs and request features
- **Discussions**: Ask questions and share ideas
- **Email**: Contact through GitHub profile

---

## 🚀 Future Enhancements

- [ ] Backend API integration for real orders
- [ ] User authentication and profiles
- [ ] Order history and tracking
- [ ] Wishlist functionality
- [ ] Product reviews and ratings
- [ ] Search functionality
- [ ] Advanced filtering options
- [ ] Bulk order discounts
- [ ] Subscription service
- [ ] Mobile app version
- [ ] Multi-language support
- [ ] Analytics dashboard

---

## 📚 Additional Resources

- [HTML5 Specification](https://html.spec.whatwg.org/)
- [CSS3 Guide](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [JavaScript Fundamentals](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [Web Accessibility (WCAG)](https://www.w3.org/WAI/WCAG21/quickref/)
- [Responsive Web Design](https://web.dev/responsive-web-design-basics/)

---

## 🎉 Thank You!

Thank you for visiting ACHARPREMIUM! We hope you enjoy our handcrafted gourmet pickles. If you have any questions or suggestions, feel free to reach out.

**Happy pickling! 🥒**
