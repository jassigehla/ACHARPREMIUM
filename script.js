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

function loadCart() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    const parsed = saved ? JSON.parse(saved) : {};

    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      return {};
    }

    return Object.entries(parsed).reduce((validCart, [productId, item]) => {
      const product = products.find((candidate) => candidate.id === productId);

      if (product && item && Number.isInteger(item.quantity) && item.quantity > 0) {
        validCart[productId] = { ...product, quantity: item.quantity };
      }

      return validCart;
    }, {});
  } catch {
    return {};
  }
}

const cart = loadCart();
const cartItemsEl = document.getElementById('cart-items');
const cartTotalEl = document.getElementById('cart-total');
const addCartButtons = document.querySelectorAll('.add-cart');
const mobileMenu = document.querySelector('.mobile-menu');
const navToggle = document.querySelector('.nav-toggle');
const customizeForm = document.getElementById('customize-form');
const signupForm = document.getElementById('signup-form');
const checkoutForm = document.getElementById('checkout-form');
const journeySteps = document.querySelectorAll('.journey-step');
const journeyProgressFill = document.querySelector('.journey-progress-fill');
const journeySections = ['#home', '#catalog', '#customize', '#signup', '#checkout'];

function formatPrice(value) {
  return `$${value.toFixed(2)}`;
}

function saveCart() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
}

function updateCart() {
  if (!cartItemsEl || !cartTotalEl) return;

  const items = Object.values(cart);
  cartItemsEl.innerHTML = '';

  if (!items.length) {
    cartItemsEl.innerHTML = '<p class="empty-cart">No items yet. Add a pickle to get started.</p>';
    cartTotalEl.textContent = '$0.00';
    return;
  }

  let total = 0;

  items.forEach((item) => {
    total += item.price * item.quantity;
    const itemEl = document.createElement('div');
    itemEl.className = 'cart-item';
    itemEl.innerHTML = `
      <div>
        <strong>${item.name}</strong>
        <span>${item.quantity} × ${formatPrice(item.price)}</span>
      </div>
      <strong>${formatPrice(item.price * item.quantity)}</strong>
    `;
    cartItemsEl.appendChild(itemEl);
  });

  cartTotalEl.textContent = formatPrice(total);
}

function addToCart(productId) {
  const product = products.find((item) => item.id === productId);
  if (!product) return;

  cart[productId] = cart[productId] || { ...product, quantity: 0 };
  cart[productId].quantity += 1;
  saveCart();
  updateCart();
}

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

if (addCartButtons.length) {
  addCartButtons.forEach((button) => {
    button.addEventListener('click', () => {
      addToCart(button.dataset.productId);
      button.textContent = 'Added';
      button.disabled = true;
      setTimeout(() => {
        button.textContent = 'Add to cart';
        button.disabled = false;
      }, 1400);
    });
  });
}

function handleFormSubmission(event, message) {
  event.preventDefault();
  alert(message);
  event.target.reset();
}

if (customizeForm) {
  customizeForm.addEventListener('submit', (event) => {
    handleFormSubmission(event, 'Your custom pickle recipe has been saved. Continue to checkout when ready!');
  });
}

if (signupForm) {
  signupForm.addEventListener('submit', (event) => {
    handleFormSubmission(event, 'Thanks for joining! Watch your inbox for pickle updates and offers.');
  });
}

if (checkoutForm) {
  checkoutForm.addEventListener('submit', (event) => {
    event.preventDefault();

    if (Object.keys(cart).length === 0) {
      alert('Your cart is empty. Add a pickle before placing your order.');
      return;
    }

    alert('Order received! We will contact you shortly with delivery details.');
    checkoutForm.reset();
    Object.keys(cart).forEach((key) => delete cart[key]);
    saveCart();
    updateCart();
  });
}

if (navToggle && mobileMenu) {
  navToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('show');
    const hidden = mobileMenu.getAttribute('aria-hidden') === 'true';
    mobileMenu.setAttribute('aria-hidden', String(!hidden));
  });
}

function updateJourneyStep() {
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
}

window.addEventListener('scroll', updateJourneyStep, { passive: true });
window.addEventListener('load', updateJourneyStep);

initProductFilters();
initProductSliders();
updateCart();
updateJourneyStep();
