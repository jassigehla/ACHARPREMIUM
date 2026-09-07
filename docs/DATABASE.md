# Database Schema Documentation

## Overview
Achar Premium uses MySQL to store users, products, orders, and related data.

## Tables

### 1. Users
Stores user account information.

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  profile_picture_url VARCHAR(500),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

**Indexes:**
- `idx_email` - For quick email lookups during login
- `idx_created_at` - For user analytics

---

### 2. Products
Stores pickle product information.

```sql
CREATE TABLE products (
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
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

**Categories:** sweet, spicy, traditional
**Spice Levels:** Mild, Medium, Hot, Extra Hot

---

### 3. Orders
Stores customer orders.

```sql
CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_number VARCHAR(50) UNIQUE,
  user_id INT NOT NULL,
  customer_name VARCHAR(255) NOT NULL,
  customer_email VARCHAR(255) NOT NULL,
  customer_address TEXT NOT NULL,
  payment_method VARCHAR(50),
  payment_status VARCHAR(50) DEFAULT 'pending',
  total_amount DECIMAL(10, 2) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

**Order Statuses:**
- `pending` - Order received
- `processing` - Being prepared
- `shipped` - In transit
- `delivered` - Completed
- `cancelled` - Cancelled

**Payment Methods:**
- `card` - Credit/Debit card (via Stripe)
- `upi` - UPI payment
- `cod` - Cash on delivery

---

### 4. Order Items
Stores individual items in each order.

```sql
CREATE TABLE order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  product_id VARCHAR(100),
  product_name VARCHAR(255),
  quantity INT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  subtotal DECIMAL(10, 2) NOT NULL,
  customization_details JSON,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
);
```

**Customization JSON Example:**
```json
{
  "vegetable": "Mango",
  "spiceLevel": "Medium",
  "oilType": "Mustard Oil",
  "jarSize": "500ml",
  "extraIngredients": ["Extra Garlic", "Kasuri Methi"]
}
```

---

### 5. Newsletter Subscribers
Stores newsletter subscription data.

```sql
CREATE TABLE newsletter_subscribers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  status VARCHAR(50) DEFAULT 'active',
  subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  unsubscribed_at DATETIME
);
```

---

### 6. Customizations
Stores saved custom pickle recipes.

```sql
CREATE TABLE customizations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  name VARCHAR(255),
  vegetable_base VARCHAR(100),
  spice_level VARCHAR(50),
  oil_type VARCHAR(100),
  jar_size VARCHAR(50),
  price DECIMAL(10, 2),
  is_saved BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

---

### 7. Reviews
Stores product reviews and ratings.

```sql
CREATE TABLE reviews (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT,
  user_id INT,
  product_id VARCHAR(100),
  rating INT CHECK (rating >= 1 AND rating <= 5),
  title VARCHAR(255),
  comment TEXT,
  verified_purchase BOOLEAN DEFAULT FALSE,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
);
```

---

### 8. Order Tracking
Stores order status history.

```sql
CREATE TABLE order_tracking (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  status VARCHAR(50) NOT NULL,
  status_label VARCHAR(255),
  status_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  notes TEXT,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
);
```

---

## Relationships

```
users (1) --> (M) orders
users (1) --> (M) reviews
users (1) --> (M) customizations

orders (1) --> (M) order_items
orders (1) --> (M) order_tracking
orders (1) --> (M) reviews

products (1) --> (M) order_items
```

## Queries

### Get user's orders
```sql
SELECT o.*, COUNT(oi.id) as item_count, SUM(oi.quantity) as total_quantity
FROM orders o
LEFT JOIN order_items oi ON o.id = oi.order_id
WHERE o.user_id = ?
GROUP BY o.id
ORDER BY o.created_at DESC;
```

### Get order details with items
```sql
SELECT o.*, oi.product_name, oi.quantity, oi.price, oi.customization_details
FROM orders o
LEFT JOIN order_items oi ON o.id = oi.order_id
WHERE o.id = ?;
```

### Get product with reviews
```sql
SELECT p.*, AVG(r.rating) as avg_rating, COUNT(r.id) as review_count
FROM products p
LEFT JOIN reviews r ON p.product_id = r.product_id
WHERE p.product_id = ?
GROUP BY p.id;
```

## Best Practices

1. **Always use prepared statements** to prevent SQL injection
2. **Index foreign keys** for faster joins
3. **Use transactions** for multi-table operations
4. **Archive old data** to keep tables performant
5. **Regular backups** - Daily backups to secure storage
