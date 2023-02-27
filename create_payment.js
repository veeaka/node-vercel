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
PORT = 4000;
app.listen (PORT, () => {
  console.log (`API listening on PORT ${PORT} `);
});
app.use(cors({
  origin: '*'
}));
app.post ('/api/payments', async (req, res) => {
  console.log(req)
  const amount = req.body.amount;
  const currency = req.body.currency;
  console.log ('service');
  // Create a new Razorpay order
  try {
    const order = await razorpay.orders.create ({
      amount: amount,
      currency: currency,
    });
    console.log(order)
    res.json ({order});
  } catch (err) {
    console.log (err);
  }
});

// Export the Express API
module.exports = app;
