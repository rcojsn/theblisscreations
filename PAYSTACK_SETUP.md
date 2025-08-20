# Paystack Integration Setup Guide

## Overview
Your e-commerce site now uses Paystack for payment processing. Here's how to complete the setup and go live.

## 1. Get Your Paystack Keys

### Test Keys (for development)
1. Sign up at [https://paystack.com](https://paystack.com)
2. Go to Settings → API Keys & Webhooks
3. Copy your **Test Public Key** (starts with `pk_test_`)

### Live Keys (for production)
1. Complete Paystack account verification
2. Submit required business documents
3. Copy your **Live Public Key** (starts with `pk_live_`)

## 2. Update Configuration

### File: `src/components/Checkout.js` (Line 69)
```javascript
// Replace this line:
publicKey: 'pk_test_your_paystack_public_key_here',

// With your actual key:
publicKey: 'pk_test_abcdef1234567890', // Your test key
// OR for production:
publicKey: 'pk_live_abcdef1234567890', // Your live key
```

## 3. Currency Configuration

### Current Setup (Line 68)
```javascript
currency: 'NGN', // Nigerian Naira
```

### Supported Currencies
- `NGN` - Nigerian Naira
- `USD` - US Dollar
- `GHS` - Ghanaian Cedi
- `ZAR` - South African Rand
- `KES` - Kenyan Shilling

**Note**: Make sure your Paystack account supports your chosen currency.

## 4. Testing the Integration

### Test Cards for NGN
- **Successful Transaction**: `4084084084084081`
- **Insufficient Funds**: `4084084084084099`
- **Invalid PIN**: `4084084084084115`

### Test Process
1. Add items to cart
2. Go to checkout
3. Fill in customer details
4. Use test card numbers
5. Verify success page and order confirmation

## 5. Production Checklist

### Before Going Live:
- [ ] Switch to live public key
- [ ] Verify webhook endpoints (if using backend)
- [ ] Test with small amounts first
- [ ] Configure proper error handling
- [ ] Set up order confirmation emails
- [ ] Configure inventory management

### Security Notes:
- Never expose your secret key in frontend code
- Always validate payments on your backend
- Use HTTPS in production
- Implement proper session management

## 6. Advanced Features (Optional)

### Split Payments
```javascript
split: {
  type: "percentage",
  bearer_type: "account",
  subaccounts: [
    {
      subaccount: "ACCT_8f4s1eq7ml6rlzj",
      share: 20
    }
  ]
}
```

### Custom Fields
```javascript
custom_fields: [
  {
    display_name: "Cart ID",
    variable_name: "cart_id",
    value: "8393"
  }
]
```

## 7. Webhook Integration (Backend Required)

### Setup Webhook Endpoint
1. Create endpoint: `POST /webhook/paystack`
2. Verify webhook signature
3. Update order status in database
4. Send confirmation emails

### Example Webhook Handler
```javascript
app.post('/webhook/paystack', (req, res) => {
  const signature = req.headers['x-paystack-signature'];
  const body = JSON.stringify(req.body);
  
  if (signature !== crypto.createHmac('sha512', SECRET_KEY).update(body).digest('hex')) {
    return res.status(400).send('Invalid signature');
  }
  
  const event = req.body;
  if (event.event === 'charge.success') {
    // Update order status
    // Send confirmation email
  }
  
  res.status(200).send('OK');
});
```

## 8. Support & Resources

- **Documentation**: https://paystack.com/docs
- **API Reference**: https://paystack.com/docs/api
- **Support**: support@paystack.com
- **Status Page**: https://status.paystack.com

## 9. Current Implementation Features

✅ **Implemented**:
- Product catalog with cart functionality
- Shopping cart with quantity management  
- Customer information collection
- Paystack payment integration
- Order confirmation page
- Order history (mock data)
- Mobile responsive design

⏳ **Recommended Next Steps**:
- Backend API for order management
- Email confirmation system
- Inventory tracking
- User authentication
- Real-time order status updates

---

**Need Help?** Contact Paystack support or refer to their comprehensive documentation for additional features and troubleshooting.