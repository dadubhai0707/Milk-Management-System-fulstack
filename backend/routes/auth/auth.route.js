const express = require("express");
const router = express.Router();
const { Register, Login, Logout, refreshAccessToken } = require("../../controller/auth/auth.controller");
const verifyJWT = require("../../middleware/auth.middleware");
router.post("/register", Register);
router.post("/login", Login);
router.post("/logout", verifyJWT, Logout);
router.post("/refresh-token", refreshAccessToken);
module.exports = router;