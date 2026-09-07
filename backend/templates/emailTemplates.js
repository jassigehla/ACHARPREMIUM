// Email Templates for Achar Premium

const templates = {
  welcome: (data) => `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: 'Inter', Arial, sans-serif; background-color: #f5f5f5; }
          .container { max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 8px; }
          .header { text-align: center; margin-bottom: 30px; }
          .header h1 { color: #2c3e50; margin: 0; }
          .content { line-height: 1.6; color: #555; }
          .cta-button { display: inline-block; background-color: #4CAF50; color: white; padding: 12px 30px; border-radius: 4px; text-decoration: none; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; color: #888; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Welcome to Achar Premium!</h1>
          </div>
          <div class="content">
            <p>Hello ${data.name},</p>
            <p>Thank you for joining our pickle lovers club! We're thrilled to have you on board.</p>
            <p>At Achar Premium, we believe in handcrafted excellence and personalized flavors. Our 11 signature pickle varieties are carefully curated to delight every palate.</p>
            <p>Start exploring our collection and create your perfect custom jar today.</p>
            <a href="https://acharpremium.com/#catalog" class="cta-button">Shop Now</a>
          </div>
          <div class="footer">
            <p>© 2026 Achar Premium. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `,

  orderConfirmation: (data) => `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: 'Inter', Arial, sans-serif; background-color: #f5f5f5; }
          .container { max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 8px; }
          .header { text-align: center; margin-bottom: 30px; }
          .order-number { background: #f0f0f0; padding: 15px; border-radius: 4px; font-size: 18px; font-weight: bold; color: #2c3e50; }
          .items-table { width: 100%; margin: 20px 0; border-collapse: collapse; }
          .items-table th, .items-table td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
          .items-table th { background: #f0f0f0; }
          .total { font-size: 18px; font-weight: bold; margin-top: 20px; text-align: right; }
          .footer { text-align: center; margin-top: 30px; color: #888; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Order Confirmation</h1>
          </div>
          <p>Dear ${data.customerName},</p>
          <p>Your order has been successfully placed! Here are the details:</p>
          <div class="order-number">Order ID: #${data.orderId}</div>
          <table class="items-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              ${data.items.map(item => `
                <tr>
                  <td>${item.name || item.productName}</td>
                  <td>${item.quantity}</td>
                  <td>$${item.price.toFixed(2)}</td>
                  <td>$${(item.price * item.quantity).toFixed(2)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          <div class="total">Total: $${data.total}</div>
          <p>Your order will be prepared and shipped within 2-3 business days. You'll receive tracking information via email.</p>
          <p>Thank you for shopping with Achar Premium!</p>
          <div class="footer">
            <p>© 2026 Achar Premium. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `,

  orderShipped: (data) => `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: 'Inter', Arial, sans-serif; background-color: #f5f5f5; }
          .container { max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 8px; }
          .header { text-align: center; margin-bottom: 30px; }
          .tracking { background: #e8f5e9; padding: 20px; border-radius: 4px; margin: 20px 0; }
          .cta-button { display: inline-block; background-color: #4CAF50; color: white; padding: 12px 30px; border-radius: 4px; text-decoration: none; }
          .footer { text-align: center; margin-top: 30px; color: #888; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Your Order is on the Way!</h1>
          </div>
          <p>Dear ${data.customerName},</p>
          <p>Great news! Your order #${data.orderId} has been shipped.</p>
          <div class="tracking">
            <p><strong>Tracking Number:</strong> ${data.trackingNumber}</p>
            <p><strong>Estimated Delivery:</strong> ${data.estimatedDelivery}</p>
          </div>
          <a href="${data.trackingLink}" class="cta-button">Track Your Order</a>
          <p>Thank you for your purchase!</p>
          <div class="footer">
            <p>© 2026 Achar Premium. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `,

  newsletterWelcome: (data) => `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: 'Inter', Arial, sans-serif; background-color: #f5f5f5; }
          .container { max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 8px; }
          .header { text-align: center; margin-bottom: 30px; }
          .content { line-height: 1.6; color: #555; }
          .footer { text-align: center; margin-top: 30px; color: #888; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Welcome to Our Newsletter!</h1>
          </div>
          <div class="content">
            <p>Thanks for joining our pickle lovers community!</p>
            <p>You'll now receive exclusive offers, seasonal launches, and delicious recipe ideas directly in your inbox.</p>
            <p>Stay tuned for our monthly specials and new pickle varieties!</p>
          </div>
          <div class="footer">
            <p>© 2026 Achar Premium. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `,

  reviewReminder: (data) => `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: 'Inter', Arial, sans-serif; background-color: #f5f5f5; }
          .container { max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 8px; }
          .header { text-align: center; margin-bottom: 30px; }
          .cta-button { display: inline-block; background-color: #4CAF50; color: white; padding: 12px 30px; border-radius: 4px; text-decoration: none; }
          .footer { text-align: center; margin-top: 30px; color: #888; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>We'd Love Your Feedback!</h1>
          </div>
          <p>Hi ${data.customerName},</p>
          <p>We hope you're enjoying your Achar Premium pickles! Please share your experience with us.</p>
          <p>Your review helps us improve and helps other pickle lovers discover their new favorite!</p>
          <a href="${data.reviewLink}" class="cta-button">Leave a Review</a>
          <div class="footer">
            <p>© 2026 Achar Premium. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `
};

module.exports = templates;
