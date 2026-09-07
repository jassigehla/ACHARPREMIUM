const products = [
  { id: 'classic-mango', name: 'Classic Mango Achar', price: 12.0 },
  { id: 'garlic-lemon', name: 'Garlic Lemon Pickle', price: 13.0 },
  { id: 'chili-carrot', name: 'Chili Carrot Crunch', price: 11.0 },
  { id: 'green-chili', name: 'Green Chili Delight', price: 12.5 },
  { id: 'ginger-honey', name: 'Ginger Honey Pickle', price: 14.0 },
  { id: 'cumin-cauliflower', name: 'Cumin Cauliflower', price: 12.0 },
  { id: 'tangy-onion', name: 'Tangy Onion Mix', price: 10.5 },
  { id: 'spiced-eggplant', name: 'Spiced Eggplant', price: 13.5 },
  { id: 'mixed-veggie', name: 'Mixed Veggie Symphony', price: 15.0 },
  { id: 'beetroot-saffron', name: 'Beetroot Saffron Treat', price: 13.0 },
  { id: 'coconut-pepper', name: 'Coconut Pepper Bliss', price: 14.5 }
];

const productCategories = {
  'classic-mango': 'sweet',
  'garlic-lemon': 'traditional',
  'chili-carrot': 'spicy',
  'green-chili': 'spicy',
  'ginger-honey': 'sweet',
  'cumin-cauliflower': 'traditional',
  'tangy-onion': 'traditional',
  'spiced-eggplant': 'spicy',
  'mixed-veggie': 'traditional',
  'beetroot-saffron': 'sweet',
  'coconut-pepper': 'spicy'
};

const STORAGE_KEY = 'achar-premium-cart';

// ==================== CART MANAGEMENT ====================
class Cart {
  constructor() {
    this.items = this.loadCart();
  }

  loadCart() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  }

  saveCart() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.items));
  }

  addToCart(productOrId, quantity = 1) {
    const product = typeof productOrId === 'string'
      ? products.find((item) => item.id === productOrId)
      : productOrId;
    if (!product || !product.id || !product.name || !Number.isFinite(Number(product.price))) return;

    this.items[product.id] = this.items[product.id] || { ...product, quantity: 0 };
    this.items[product.id].quantity += quantity;
    this.saveCart();
    this.updateCartUI();
    this.showNotification(`${product.name} added to cart!`);
  }

  removeFromCart(productId) {
    delete this.items[productId];
    this.saveCart();
    this.updateCartUI();
  }

  updateQuantity(productId, quantity) {
    if (quantity <= 0) {
      this.removeFromCart(productId);
    } else if (this.items[productId]) {
      this.items[productId].quantity = quantity;
      this.saveCart();
      this.updateCartUI();
    }
  }

  getCartTotal() {
    return Object.values(this.items).reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  }

  getCartCount() {
    return Object.values(this.items).reduce((count, item) => count + item.quantity, 0);
  }

  clearCart() {
    this.items = {};
    this.saveCart();
    this.updateCartUI();
  }

  updateCartUI() {
    const cartItemsDiv = document.getElementById('cart-items');
    const cartTotalDiv = document.getElementById('cart-total');

    if (!cartItemsDiv || !cartTotalDiv) return;

    const items = Object.values(this.items);

    if (items.length === 0) {
      cartItemsDiv.innerHTML = '<p class="empty-cart">No items yet. Add a pickle to get started.</p>';
      cartTotalDiv.textContent = '$0.00';
      return;
    }

    cartItemsDiv.innerHTML = items.map(item => `
      <div class="cart-item">
        <div class="cart-item-info">
          <strong>${item.name}</strong>
          <span class="cart-item-price">$${item.price.toFixed(2)} each</span>
        </div>
        <div class="cart-item-controls">
          <button class="qty-btn" data-product-id="${item.id}" data-action="decrease">−</button>
          <input type="number" class="qty-input" value="${item.quantity}" min="1" data-product-id="${item.id}" />
          <button class="qty-btn" data-product-id="${item.id}" data-action="increase">+</button>
          <span class="cart-item-subtotal">$${(item.price * item.quantity).toFixed(2)}</span>
          <button class="remove-btn" data-product-id="${item.id}">Remove</button>
        </div>
      </div>
    `).join('');

    cartTotalDiv.textContent = `$${this.getCartTotal()}`;

    // Add event listeners to quantity controls
    document.querySelectorAll('.qty-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const productId = e.target.dataset.productId;
        const action = e.target.dataset.action;
        const item = this.items[productId];
        if (item) {
          const newQuantity = action === 'increase' ? item.quantity + 1 : item.quantity - 1;
          this.updateQuantity(productId, newQuantity);
        }
      });
    });

    document.querySelectorAll('.qty-input').forEach(input => {
      input.addEventListener('change', (e) => {
        const productId = e.target.dataset.productId;
        this.updateQuantity(productId, parseInt(e.target.value) || 1);
      });
    });

    document.querySelectorAll('.remove-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.removeFromCart(e.target.dataset.productId);
      });
    });
  }

  showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #4CAF50;
      color: white;
      padding: 15px 20px;
      border-radius: 4px;
      z-index: 1000;
      animation: slideIn 0.3s ease-out;
    `;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
  }
}

// ==================== AUTHENTICATION ====================
class Auth {
  constructor() {
    this.token = localStorage.getItem('auth_token');
    this.user = this.getUser();
  }

  async login(email, password) {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        const data = await response.json();
        this.setAuth(data.token, data.user);
        return { success: true, user: data.user };
      }
      return { success: false, error: 'Invalid credentials' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async signup(email, password, name) {
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name })
      });

      if (response.ok) {
        const data = await response.json();
        this.setAuth(data.token, data.user);
        return { success: true, user: data.user };
      }
      const error = await response.json();
      return { success: false, error: error.message };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  setAuth(token, user) {
    this.token = token;
    this.user = user;
    localStorage.setItem('auth_token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }

  logout() {
    this.token = null;
    this.user = null;
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
  }

  isAuthenticated() {
    return !!this.token;
  }

  getUser() {
    const user = localStorage.getItem('user');
    if (!user) return null;

    try {
      return JSON.parse(user);
    } catch {
      localStorage.removeItem('user');
      return null;
    }
  }

  getAuthHeader() {
    return this.token ? { 'Authorization': `Bearer ${this.token}` } : {};
  }
}

// ==================== CHECKOUT HANDLER ====================
class CheckoutHandler {
  constructor(cart, auth) {
    this.cart = cart;
    this.auth = auth;
    this.initializeCheckout();
  }

  initializeCheckout() {
    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) {
      checkoutForm.addEventListener('submit', (e) => this.handleSubmit(e));
    }
  }

  async handleSubmit(e) {
    e.preventDefault();

    if (Object.keys(this.cart.items).length === 0) {
      alert('Your cart is empty. Add a pickle before placing your order.');
      return;
    }

    const formData = {
      customer_name: document.getElementById('customer-name').value,
      customer_email: document.getElementById('customer-email').value,
      customer_address: document.getElementById('customer-address').value,
      payment_method: document.getElementById('payment-method').value,
      items: this.cart.items,
      total: this.cart.getCartTotal(),
      order_date: new Date().toISOString()
    };

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...this.auth.getAuthHeader()
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const result = await response.json();
        this.cart.showNotification('Order placed successfully!');
        this.cart.clearCart();
        document.getElementById('checkout-form').reset();
        window.location.href = `/order-confirmation?order_id=${result.order_id}`;
      } else {
        alert('Error placing order. Please try again.');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('An error occurred during checkout.');
    }
  }
}

// ==================== NEWSLETTER HANDLER ====================
class NewsletterHandler {
  constructor() {
    this.initializeNewsletter();
  }

  initializeNewsletter() {
    const newsForm = document.getElementById('signup-form');
    if (newsForm) {
      newsForm.addEventListener('submit', (e) => this.handleSubmit(e));
    }
  }

  async handleSubmit(e) {
    e.preventDefault();
    const emailInput = document.getElementById('newsletter-email') || document.getElementById('email');
    const email = emailInput?.value.trim();

    if (!email) {
      alert('Please enter a valid email address.');
      return;
    }

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      if (response.ok) {
        document.getElementById('signup-form').reset();
        alert('Thanks for joining! Watch your inbox for pickle updates and offers.');
      } else {
        alert('Error subscribing. Please try again.');
      }
    } catch (error) {
      console.error('Newsletter error:', error);
      alert('An error occurred. Please try again.');
    }
  }
}

// ==================== CUSTOMIZE FORM HANDLER ====================
class CustomizeHandler {
  constructor(cart) {
    this.cart = cart;
    this.initializeCustomize();
  }

  initializeCustomize() {
    const customizeForm = document.getElementById('customize-form');
    if (customizeForm) {
      customizeForm.addEventListener('submit', (e) => this.handleSubmit(e));
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    const vegChoice = document.getElementById('veg-choice').value;
    const spiceLevel = document.getElementById('spice-level').value;
    const oilChoice = document.getElementById('oil-choice').value;
    const jarSize = document.getElementById('jar-size').value;

    const customJarName = `Custom ${vegChoice} - ${spiceLevel} (${jarSize})`;
    const basePrice = 12.00;
    const sizeMultiplier = {
      '250ml': 1,
      '500ml': 1.3,
      '750ml': 1.6,
      '1L': 2
    };
    const customPrice = (basePrice * sizeMultiplier[jarSize]).toFixed(2);

    // Create custom product object
    const customProduct = {
      id: `custom-${Date.now()}`,
      name: customJarName,
      price: parseFloat(customPrice),
      quantity: 1,
      vegetable: vegChoice,
      spiceLevel: spiceLevel,
      oil: oilChoice,
      jarSize: jarSize
    };

    this.cart.addToCart(customProduct, 1);
    
    // Store custom order details in session
    const customOrder = {
      vegetable: vegChoice,
      spiceLevel: spiceLevel,
      oil: oilChoice,
      jarSize: jarSize,
      price: customPrice
    };
    sessionStorage.setItem('custom_order', JSON.stringify(customOrder));

    document.getElementById('customize-form').reset();
    document.getElementById('checkout').scrollIntoView({ behavior: 'smooth' });
  }
}

// ==================== PRODUCT FILTERING ====================
function initProductFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      filterButtons.forEach((btn) => btn.classList.toggle('active', btn === button));

      const selectedFilter = button.dataset.filter || 'all';
      productCards.forEach((card) => {
        const addButton = card.querySelector('.add-cart');
        const productId = addButton?.dataset.productId || '';
        const category = productCategories[productId] || 'traditional';
        const shouldShow = selectedFilter === 'all' || category === selectedFilter;
        card.classList.toggle('is-hidden', !shouldShow);
      });
    });
  });
}

// ==================== PRODUCT SLIDERS ====================
function initProductSliders() {
  document.querySelectorAll('.product-gallery').forEach((gallery) => {
    if (gallery.dataset.sliderInitialized === 'true') return;

    const slides = Array.from(gallery.querySelectorAll('img'));
    if (!slides.length) return;

    let currentIndex = 0;

    const controls = document.createElement('div');
    controls.className = 'product-slider-controls';
    controls.innerHTML = `
      <button type="button" class="slider-btn" data-direction="prev">‹</button>
      <button type="button" class="slider-btn" data-direction="next">›</button>
    `;

    gallery.appendChild(controls);
    gallery.dataset.sliderInitialized = 'true';

    const showSlide = () => {
      slides.forEach((slide, index) => {
        slide.classList.toggle('active', index === currentIndex);
      });
    };

    const changeSlide = (direction) => {
      currentIndex = (currentIndex + direction + slides.length) % slides.length;
      showSlide();
    };

    controls.querySelectorAll('.slider-btn').forEach((button) => {
      button.addEventListener('click', () => {
        changeSlide(button.dataset.direction === 'next' ? 1 : -1);
      });
    });

    showSlide();
  });
}

// ==================== ADD TO CART BUTTONS ====================
function initAddToCartButtons(cart) {
  const addCartButtons = document.querySelectorAll('.add-cart');
  addCartButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const productId = button.dataset.productId;
      cart.addToCart(productId);
      button.textContent = 'Added';
      button.disabled = true;
      setTimeout(() => {
        button.textContent = 'Add to cart';
        button.disabled = false;
      }, 1400);
    });
  });
}

// ==================== MOBILE MENU ====================
function initMobileMenu() {
  const mobileMenu = document.querySelector('.mobile-menu');
  const navToggle = document.querySelector('.nav-toggle');

  if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('show');
      const hidden = mobileMenu.getAttribute('aria-hidden') === 'true';
      mobileMenu.setAttribute('aria-hidden', String(!hidden));
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('show');
        mobileMenu.setAttribute('aria-hidden', 'true');
        navToggle.classList.remove('active');
      });
    });
  }
}

// ==================== JOURNEY PROGRESS ====================
function initJourneyProgress() {
  const journeySteps = document.querySelectorAll('.journey-step');
  const journeyProgressFill = document.querySelector('.journey-progress-fill');
  const journeySections = ['#home', '#catalog', '#customize', '#signup', '#checkout'];

  const updateJourneyStep = () => {
    const scrollPosition = window.scrollY + 180;
    let activeId = '#home';

    journeySections.forEach((sectionId) => {
      const section = document.querySelector(sectionId);
      if (!section) return;

      const top = section.offsetTop;
      if (scrollPosition >= top) {
        activeId = sectionId;
      }
    });

    journeySteps.forEach((step) => {
      const isActive = step.getAttribute('href') === activeId;
      step.classList.toggle('active', isActive);
      if (isActive) {
        step.setAttribute('aria-current', 'step');
      } else {
        step.removeAttribute('aria-current');
      }
    });

    const activeIndex = journeySections.indexOf(activeId);
    const progressPercent = journeySections.length > 1 ? (activeIndex / (journeySections.length - 1)) * 100 : 0;

    if (journeyProgressFill) {
      journeyProgressFill.style.width = `${progressPercent}%`;
    }
  };

  window.addEventListener('scroll', updateJourneyStep, { passive: true });
  window.addEventListener('load', updateJourneyStep);
}

// ==================== SMOOTH SCROLL ====================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// ==================== INITIALIZE ALL ====================
document.addEventListener('DOMContentLoaded', () => {
  const cart = new Cart();
  const auth = new Auth();

  // Initialize all features
  initProductFilters();
  initProductSliders();
  initAddToCartButtons(cart);
  initMobileMenu();
  initJourneyProgress();
  initSmoothScroll();

  // Initialize handlers
  new CheckoutHandler(cart, auth);
  new NewsletterHandler();
  new CustomizeHandler(cart);

  // Initial UI update
  cart.updateCartUI();

  // Make globally accessible
  window.cart = cart;
  window.auth = auth;
});
