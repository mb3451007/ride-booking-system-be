"use strict";

var express = require("express");

var _require = require("../controllers/paymentController"),
    verifyPayment = _require.verifyPayment;

var router = express.Router();
router.post("/create-payment-intent", verifyPayment);
module.exports = router;