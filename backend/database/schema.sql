-- Achar Premium Database Schema

-- Users Table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  profile_picture_url VARCHAR(500),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_created_at (created_at)
);

-- Products Table
CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_id VARCHAR(100) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  category VARCHAR(100),
  vegetable_base VARCHAR(100),
  spice_level VARCHAR(50),
  image_url VARCHAR(500),
  stock_quantity INT DEFAULT 100,
  is_available BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_category (category),
  INDEX idx_product_id (product_id)
);

-- Orders Table
CREATE TABLE IF NOT EXISTS orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_number VARCHAR(50) UNIQUE,
  user_id INT NOT NULL,
  customer_name VARCHAR(255) NOT NULL,
  customer_email VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(20),
  customer_address TEXT NOT NULL,
  city VARCHAR(100),
  postal_code VARCHAR(20),
  payment_method VARCHAR(50),
  payment_status VARCHAR(50) DEFAULT 'pending',
  total_amount DECIMAL(10, 2) NOT NULL,
  discount_amount DECIMAL(10, 2) DEFAULT 0,
  final_amount DECIMAL(10, 2) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  tracking_number VARCHAR(100),
  delivery_date DATETIME,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_id (user_id),
  INDEX idx_status (status),
  INDEX idx_created_at (created_at),
  INDEX idx_order_number (order_number)
);

-- Order Items Table
CREATE TABLE IF NOT EXISTS order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  product_id VARCHAR(100),
  product_name VARCHAR(255),
  quantity INT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  subtotal DECIMAL(10, 2) NOT NULL,
  customization_details JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  INDEX idx_order_id (order_id)
);

-- Customers Table (for unauthenticated checkout)
CREATE TABLE IF NOT EXISTS customers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  address TEXT,
  city VARCHAR(100),
  postal_code VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email)
);

-- Newsletter Subscribers Table
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  status VARCHAR(50) DEFAULT 'active',
  subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  unsubscribed_at DATETIME,
  INDEX idx_email (email),
  INDEX idx_status (status)
);

-- Order Tracking Table
CREATE TABLE IF NOT EXISTS order_tracking (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  status VARCHAR(50) NOT NULL,
  status_label VARCHAR(255),
  status_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  notes TEXT,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  INDEX idx_order_id (order_id),
  INDEX idx_status_date (status_date)
);

-- Customizations Table
CREATE TABLE IF NOT EXISTS customizations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  name VARCHAR(255),
  vegetable_base VARCHAR(100),
  spice_level VARCHAR(50),
  oil_type VARCHAR(100),
  jar_size VARCHAR(50),
  extra_ingredients JSON,
  price DECIMAL(10, 2),
  is_saved BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_id (user_id)
);

-- Reviews Table
CREATE TABLE IF NOT EXISTS reviews (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT,
  user_id INT,
  product_id VARCHAR(100),
  rating INT CHECK (rating >= 1 AND rating <= 5),
  title VARCHAR(255),
  comment TEXT,
  verified_purchase BOOLEAN DEFAULT FALSE,
  helpful_count INT DEFAULT 0,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  INDEX idx_product_id (product_id),
  INDEX idx_rating (rating)
);

-- Insert sample products
INSERT INTO products (product_id, name, description, price, category, vegetable_base, spice_level, stock_quantity) VALUES
('classic-mango', 'Classic Mango Achar', 'Sweet, tangy, and perfectly spiced with fenugreek and mustard seeds.', 12.00, 'sweet', 'Mango', 'Medium', 100),
('garlic-lemon', 'Garlic Lemon Pickle', 'Bright citrus notes with roasted garlic and black pepper.', 13.00, 'traditional', 'Garlic', 'Medium', 100),
('chili-carrot', 'Chili Carrot Crunch', 'Spicy, crunchy carrots with sesame and chili oil.', 11.00, 'spicy', 'Carrot', 'Hot', 100),
('green-chili', 'Green Chili Delight', 'A bold green chili blend with garlic, lemon, and tangy spices.', 12.50, 'spicy', 'Green Chili', 'Extra Hot', 100),
('ginger-honey', 'Ginger Honey Pickle', 'Warm ginger balanced with honey sweetness and saffron.', 14.00, 'sweet', 'Ginger', 'Mild', 100),
('cumin-cauliflower', 'Cumin Cauliflower', 'Earthy cumin and turmeric bring out rich cauliflower flavors.', 12.00, 'traditional', 'Cauliflower', 'Mild', 100),
('tangy-onion', 'Tangy Onion Mix', 'Red onions marinated in vinegar, jaggery, and aromatic seeds.', 10.50, 'traditional', 'Onion', 'Medium', 100),
('spiced-eggplant', 'Spiced Eggplant', 'Velvety eggplant with mustard, chili, and kasuri methi.', 13.50, 'spicy', 'Eggplant', 'Hot', 100),
('mixed-veggie', 'Mixed Veggie Symphony', 'Carrot, chilli, cauliflower, and mango in a complex fusion jar.', 15.00, 'traditional', 'Mixed', 'Medium', 100),
('beetroot-saffron', 'Beetroot Saffron Treat', 'Sweet beetroot with saffron, cardamom, and a citrus finish.', 13.00, 'sweet', 'Beetroot', 'Mild', 100),
('coconut-pepper', 'Coconut Pepper Bliss', 'Crisp coconut with crushed black pepper, curry leaf, and lime.', 14.50, 'spicy', 'Coconut', 'Hot', 100);
