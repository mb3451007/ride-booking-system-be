const express = require("express");
const { addDiscount, getDiscounts } = require("../controllers/discountController");

const router = express.Router();

router.post("/discounts", addDiscount);
router.get("/discounts", getDiscounts);

module.exports = router;
