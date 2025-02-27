const express = require("express");
const { registerPackage, viewPackage, disablePackage, deletePackage} = require('../controllers/packageController')

const router = express.Router();

router.post("/packages", registerPackage);
router.get("/packages", viewPackage);
router.patch("/packages/disable/:id", disablePackage);
router.delete("/packages/delete/:id", deletePackage);

module.exports = router;