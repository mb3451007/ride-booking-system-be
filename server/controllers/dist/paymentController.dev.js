"use strict";

var mongoose = require('mongoose');

var Stripe = require('stripe');

var stripe = Stripe('sk_test_51N2zfiBHAK3VyaqU5ttPNGD74utWUd4p3RoiSm2Jz8bu4wsRW1xSGHswuJWCMueQhnGbNbnMETQvUEj7sPwlqCR600iuHJVcNR');

exports.verifyPayment = function _callee(req, res) {
  var _req$body, amount, currency, paymentIntent;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, amount = _req$body.amount, currency = _req$body.currency;
          _context.next = 4;
          return regeneratorRuntime.awrap(stripe.paymentIntents.create({
            amount: amount,
            currency: currency,
            payment_method_types: ['card']
          }));

        case 4:
          paymentIntent = _context.sent;
          res.json({
            client_secret: paymentIntent.client_secret
          });
          _context.next = 11;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          res.status(500).json({
            error: _context.t0.message
          });

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 8]]);
};