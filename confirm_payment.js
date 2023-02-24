const express = require ('express');
const Razorpay = require ('razorpay');
const bodyParser = require ('body-parser');

// razorpay instance
const razorpay = new Razorpay ({
  key_id: 'rzp_test_Sih1MBM2KDbgmA',
  key_secret: 'mudKbxfk2RwKAXefp4q5m3uR',
});

// express app instance
const app = express ();
app.use (bodyParser.json ());

app.post ('/api/orders/:id/confirm', async (req, res) => {
  const orderId = req.params.id;

  try {
    // Fetch the order from Razorpay
    const order = await razorpay.orders.fetch (orderId);

    // Confirm the order
    await razorpay.payments.capture (
      order.payments[0].id,
      order.amount,
      order.currency
    );

    res.json ({status: 'success'});
  } catch (error) {
    console.error (error);
    res.status (500).json ({error: error.message});
  }
});
