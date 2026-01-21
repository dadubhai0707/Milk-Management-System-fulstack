const express = require("express");
const router = express.Router();
const verifyJWT = require("../../middleware/auth.middleware");
const authorizeRoles = require("../../middleware/role.middleware");
const { createPlan, getPlans, getPlanById, updatePlan, deletePlan } = require("../../controller/supperAdmin/subscription.controller");
// 🔐 SUPER ADMIN ONLY
router.use(verifyJWT, authorizeRoles("super_admin"));
router.post("/", createPlan);
router.get("/", getPlans);
router.get("/:id", getPlanById);
router.put("/:id", updatePlan);
router.delete("/:id", deletePlan);
module.exports = router;