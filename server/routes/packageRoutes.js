const express = require("express");
const { registerPackage, viewPackage, disablePackage} = require('../controllers/packageController')

const router = express.Router();

router.post("/packages", registerPackage);
router.get("/packages", viewPackage);
router.patch("/packages/disable/:id", disablePackage);

module.exports = router;
