const express = require("express");
const { addSurcharge, getSurcharges} = require('../controllers/surchargeController')

const router = express.Router();

router.post("/surcharges", addSurcharge);
router.get("/surcharges", getSurcharges);

module.exports = router;
