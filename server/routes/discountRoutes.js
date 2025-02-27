const express = require("express");
const { addDiscount, getDiscounts, deleteDiscount, disableDiscount } = require("../controllers/discountController");

const router = express.Router();

router.post("/discounts", addDiscount);
router.get("/discounts", getDiscounts);
router.delete("/discounts/delete/:id", deleteDiscount);
router.patch("/discounts/disable/:id", disableDiscount);

module.exports = router;
