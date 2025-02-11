const express = require("express");
const { login, dashboard } = require("../controllers/authController");

const router = express.Router();

router.post("/login", login);
router.post("/dashboard", dashboard);

module.exports = router;
