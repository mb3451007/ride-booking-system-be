const express = require("express");
const { addSurcharge, getSurcharges, deleteSurcharge, disableSurcharge} = require('../controllers/surchargeController')

const router = express.Router();

router.post("/surcharges", addSurcharge);
router.get("/surcharges", getSurcharges);
router.patch("/surcharges/disable/:id", disableSurcharge);
router.delete("/surcharges/delete/:id", deleteSurcharge);

module.exports = router;
