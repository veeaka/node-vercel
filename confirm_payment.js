const express = require ('express');
const Razorpay = require ('razorpay');
const bodyParser = require ('body-parser');

// razorpay instance
const razorpay = new Razorpay ({
  key_id: 'rzp_test_Sih1MBM2KDbgmA',
  key_secret: 'mudKbxfk2RwKAXefp4q5m3uR',
});

PORT = 4000;

// express app instance
const app = express ();
app.use (bodyParser.json ());
app.listen (PORT, () => {
  console.log (`API listening on PORT ${PORT} `);
});
app.post ('/api/orders/:id/confirm', async (req, res) => {
  const orderId = req.params.id;

  try {
    // Fetch the order from Razorpay
    const order = await razorpay.orders.fetch (orderId, { expand: ['payments'] });
    console.log(order,'order');
    // Create a mock payment and associate it with the order
    const payment = await razorpay.payments.create({
      amount: order.amount,
      currency: order.currency,
      order_id: orderId,
      payment_capture: 1,
    });

    // Confirm the order with the mock payment
    await razorpay.payments.capture(payment.id, payment.amount, payment.currency);

    res.json({ status: 'success' });
  } catch (error) {
    console.error (error);
    res.status (500).json ({error: error.message});
  }
});

// Export the Express API
module.exports = app;
