const express = require("express");
const router = express.Router();
const verifyJWT = require("../../middleware/auth.middleware");
const authorizeRoles = require("../../middleware/role.middleware");
const { getStockSummary } = require("../../controller/compneyOwner/dashboard.controller");
router.get("/stock", verifyJWT, authorizeRoles("owner"), getStockSummary);