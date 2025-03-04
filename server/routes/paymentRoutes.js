const express = require("express");
const { verifyPayment } =  require("../controllers/paymentController");

const router = express.Router();

router.post("/create-payment-intent", verifyPayment);

module.exports = router;
