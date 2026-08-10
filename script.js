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

const cart = {};
const cartItemsEl = document.getElementById('cart-items');
const cartTotalEl = document.getElementById('cart-total');
const addCartButtons = document.querySelectorAll('.add-cart');
const mobileMenu = document.querySelector('.mobile-menu');
const navToggle = document.querySelector('.nav-toggle');

function formatPrice(value) {
  return `$${value.toFixed(2)}`;
}

function updateCart() {
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

  updateCart();
}

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

function handleFormSubmission(event, message) {
  event.preventDefault();
  alert(message);
  event.target.reset();
}

const customizeForm = document.getElementById('customize-form');
const signupForm = document.getElementById('signup-form');
const checkoutForm = document.getElementById('checkout-form');

customizeForm.addEventListener('submit', (event) => {
  handleFormSubmission(event, 'Your custom pickle recipe has been saved. Continue to checkout when ready!');
});

signupForm.addEventListener('submit', (event) => {
  handleFormSubmission(event, 'Thanks for joining! Watch your inbox for pickle updates and offers.');
});

checkoutForm.addEventListener('submit', (event) => {
  event.preventDefault();

  if (Object.keys(cart).length === 0) {
    alert('Your cart is empty. Add a pickle before placing your order.');
    return;
  }

  alert('Order received! We will contact you shortly with delivery details.');
  checkoutForm.reset();
  Object.keys(cart).forEach((key) => delete cart[key]);
  updateCart();
});

navToggle.addEventListener('click', () => {
  mobileMenu.classList.toggle('show');
  const hidden = mobileMenu.getAttribute('aria-hidden') === 'true';
  mobileMenu.setAttribute('aria-hidden', String(!hidden));
});

updateCart();
