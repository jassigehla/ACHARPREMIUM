# Authentication Setup Guide for Achar Premium

## Overview
This guide covers JWT-based authentication for Achar Premium, including user signup, login, and token management.

## Prerequisites
- Node.js 14+
- MySQL 5.7+
- npm or yarn

## Installation

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Set Up Environment Variables

Create a `.env` file in the backend directory:

```env
# Database
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=achar_premium

# JWT
JWT_SECRET=your-super-secret-key-change-this
JWT_EXPIRE=30d

# Email
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password

# Server
PORT=5000
NODE_ENV=development
```

### 3. Create Database Schema

```bash
mysql -u root -p achar_premium < backend/database/schema.sql
```

Or manually:
```sql
CREATE DATABASE achar_premium;
USE achar_premium;
source backend/database/schema.sql;
```

## API Endpoints

### Sign Up
**POST** `/api/auth/signup`

```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "name": "John Doe"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

### Login
**POST** `/api/auth/login`

```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

## Frontend Implementation

### 1. Store Token

```javascript
const response = await fetch('/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password })
});

const data = await response.json();
localStorage.setItem('auth_token', data.token);
localStorage.setItem('user', JSON.stringify(data.user));
```

### 2. Use Token in Requests

```javascript
const token = localStorage.getItem('auth_token');

const response = await fetch('/api/orders', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify(orderData)
});
```

### 3. Handle Token Expiration

```javascript
const handleLogout = () => {
  localStorage.removeItem('auth_token');
  localStorage.removeItem('user');
  window.location.href = '/'; // Redirect to home
};

// Check if token is expired
const isTokenExpired = (token) => {
  try {
    const decoded = JSON.parse(atob(token.split('.')[1]));
    return decoded.exp * 1000 < Date.now();
  } catch (e) {
    return true;
  }
};
```

## Security Best Practices

1. **Password Security**
   - Use bcrypt for hashing (10+ salt rounds)
   - Enforce strong password requirements
   - Never log or expose passwords

2. **Token Security**
   - Store tokens in httpOnly cookies (preferred) or localStorage
   - Set short expiration times (15 min - 30 days)
   - Implement token refresh mechanism

3. **HTTPS**
   - Always use HTTPS in production
   - Use secure cookies (httpOnly, sameSite)

4. **Rate Limiting**
   - Limit login attempts (5 attempts per 15 minutes)
   - Implement CAPTCHA for repeated failures

5. **Input Validation**
   - Validate all inputs on server-side
   - Use Joi for schema validation

## Running the Server

```bash
# Development
npm run dev

# Production
npm start
```

Server will run on http://localhost:5000

## Testing

```bash
npm test
```

## Troubleshooting

### "Invalid credentials" error
- Check email and password spelling
- Ensure user exists in database
- Verify password hash is correct

### "No token provided" error
- Add Authorization header: `Authorization: Bearer <token>`
- Ensure token is stored correctly

### Database connection failed
- Check DB credentials in .env
- Verify MySQL is running
- Check database exists: `SHOW DATABASES;`

## Next Steps

1. Implement password reset functionality
2. Add two-factor authentication (2FA)
3. Set up OAuth (Google, GitHub)
4. Implement refresh tokens
5. Add user profile management
