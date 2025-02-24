const express = require("express");
const { registerPackage, viewPackage} = require('../controllers/packageController')

const router = express.Router();

router.post("/packages", registerPackage);
router.get("/packages", viewPackage);

module.exports = router;
