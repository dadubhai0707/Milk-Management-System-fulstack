const express = require("express");
const router = express.Router();
const { Register, Login, Logout } = require("../../controller/auth/auth.controller");
const verifyJWT = require("../../middleware/auth.middleware");
router.post("/register", Register);
router.post("/login", Login);
router.post("/logout", verifyJWT, Logout);
module.exports = router;