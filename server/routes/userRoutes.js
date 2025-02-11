const express = require("express");
const { registerUser, getAllUsers } = require("../controllers/userController");

const router = express.Router();

router.post("/register", registerUser);
router.get("/users", getAllUsers);

module.exports = router;
