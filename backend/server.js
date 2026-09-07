// Achar Premium Backend Server
// Node.js + Express.js

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const db = require('./config/database');

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('../'));

// ==================== AUTHENTICATION MIDDLEWARE ====================
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// ==================== EMAIL SERVICE ====================
const emailService = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

const sendEmail = async (to, subject, template, data) => {
  const emailTemplates = require('./templates/emailTemplates');
  const html = emailTemplates[template](data);

  try {
    await emailService.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      html
    });
    return { success: true };
  } catch (error) {
    console.error('Email error:', error);
    return { success: false, error: error.message };
  }
};

// ==================== AUTH ROUTES ====================
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Validate input
    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check if user exists
    const existingUser = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (existingUser.length > 0) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const result = await db.query(
      'INSERT INTO users (email, password_hash, full_name, created_at) VALUES (?, ?, ?, NOW())',
      [email, hashedPassword, name]
    );

    const user = {
      id: result.insertId,
      email,
      name
    };

    // Generate JWT
    const token = jwt.sign(user, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '30d' });

    // Send welcome email
    await sendEmail(email, 'Welcome to Achar Premium!', 'welcome', { name });

    res.status(201).json({ token, user });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Signup failed' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    // Find user
    const users = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (users.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = users[0];

    // Verify password
    const passwordMatch = await bcrypt.compare(password, user.password_hash);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.full_name },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '30d' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.full_name
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// ==================== ORDER ROUTES ====================
app.post('/api/orders', authMiddleware, async (req, res) => {
  try {
    const { customer_name, customer_email, customer_address, payment_method, items, total } = req.body;
    const userId = req.user.id;

    // Validate input
    if (!customer_name || !customer_email || !customer_address || !items || items.length === 0) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Create order
    const orderResult = await db.query(
      `INSERT INTO orders (user_id, customer_name, customer_email, customer_address, 
       payment_method, total_amount, status, created_at) 
       VALUES (?, ?, ?, ?, ?, ?, 'pending', NOW())`,
      [userId, customer_name, customer_email, customer_address, payment_method, total]
    );

    const orderId = orderResult.insertId;

    // Add order items
    for (const item of items) {
      await db.query(
        `INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)`,
        [orderId, item.id || item.productId, item.quantity, item.price]
      );
    }

    // Send order confirmation email
    await sendEmail(customer_email, 'Order Confirmation', 'orderConfirmation', {
      orderId,
      customerName: customer_name,
      items,
      total
    });

    res.status(201).json({
      success: true,
      order_id: orderId,
      message: 'Order placed successfully'
    });
  } catch (error) {
    console.error('Order creation error:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

app.get('/api/orders/:orderId', authMiddleware, async (req, res) => {
  try {
    const { orderId } = req.params;
    const userId = req.user.id;

    // Get order
    const orders = await db.query(
      'SELECT * FROM orders WHERE id = ? AND user_id = ?',
      [orderId, userId]
    );

    if (orders.length === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }

    const order = orders[0];

    // Get order items
    const items = await db.query('SELECT * FROM order_items WHERE order_id = ?', [orderId]);

    res.json({ ...order, items });
  } catch (error) {
    console.error('Fetch order error:', error);
    res.status(500).json({ error: 'Failed to fetch order' });
  }
});

app.get('/api/orders', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await db.query(
      'SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC',
      [userId]
    );

    res.json(orders);
  } catch (error) {
    console.error('Fetch orders error:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// ==================== NEWSLETTER ROUTES ====================
app.post('/api/newsletter/subscribe', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email required' });
    }

    // Check if already subscribed
    const existing = await db.query('SELECT * FROM newsletter_subscribers WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(400).json({ error: 'Already subscribed' });
    }

    // Add subscriber
    await db.query(
      'INSERT INTO newsletter_subscribers (email, subscribed_at) VALUES (?, NOW())',
      [email]
    );

    // Send welcome email
    await sendEmail(email, 'Welcome to Achar Premium Newsletter', 'newsletterWelcome', { email });

    res.json({ success: true, message: 'Subscribed successfully' });
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    res.status(500).json({ error: 'Subscription failed' });
  }
});

// ==================== PRODUCTS ROUTES ====================
app.get('/api/products', async (req, res) => {
  try {
    const products = await db.query('SELECT * FROM products');
    res.json(products);
  } catch (error) {
    console.error('Fetch products error:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

app.get('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const products = await db.query('SELECT * FROM products WHERE id = ?', [id]);

    if (products.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(products[0]);
  } catch (error) {
    console.error('Fetch product error:', error);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

// ==================== ERROR HANDLING ====================
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({ error: err.message || 'Internal server error' });
});

// ==================== START SERVER ====================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Achar Premium server running on port ${PORT}`);
});

module.exports = app;
