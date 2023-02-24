const express = require('express');
const Razorpay = require('razorpay');
const bodyParser = require('body-parser');


// razorpay instance 
const razorpay = new Razorpay({
  key_id: 'YOUR_RAZORPAY_API_KEY',
  key_secret: 'YOUR_RAZORPAY_API_SECRET',
});


// express app instance
const app = express();
app.use(bodyParser.json());


app.post('/api/payments', async (req, res) => {
  const amount = req.body.amount;
  const currency = req.body.currency;

  // Create a new Razorpay order
  const order = await razorpay.orders.create({
    amount: amount,
    currency: currency,
  });

  res.json({ order });
});

