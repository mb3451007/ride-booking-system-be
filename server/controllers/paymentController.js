const mongoose = require('mongoose')
const Stripe = require('stripe');
const stripe = Stripe('sk_test_51N2zfiBHAK3VyaqU5ttPNGD74utWUd4p3RoiSm2Jz8bu4wsRW1xSGHswuJWCMueQhnGbNbnMETQvUEj7sPwlqCR600iuHJVcNR');

exports.verifyPayment =  async (req, res) => {
    try {
        const { amount, currency } = req.body;
    
        const paymentIntent = await stripe.paymentIntents.create({
          amount,
          currency,
          payment_method_types: ['card'],
        });
    
        res.json({
          client_secret: paymentIntent.client_secret
        });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
};
