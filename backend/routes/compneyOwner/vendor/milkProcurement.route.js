const express = require("express");
const router = express.Router();

const { createMilkProcurement, getAllMilkProcurements, updateMilkProcurement, deleteMilkProcurement } = require("../../../controller/compneyOwner/milkProcurement/milkProcurement.controller");
const verifyJWT = require("../../../middleware/auth.middleware");
const authorizeRoles = require("../../../middleware/role.middleware");

router.post("/", verifyJWT, authorizeRoles("Owner"), createMilkProcurement);
router.get("/", verifyJWT, authorizeRoles("Owner"), getAllMilkProcurements);
router.put("/:id", verifyJWT, authorizeRoles("Owner"), updateMilkProcurement);
router.delete("/:id", verifyJWT, authorizeRoles("Owner"), deleteMilkProcurement);
module.exports = router;