const express = require("express");
const router = express.Router();
const { createVendor, getAllVendors, updateVendor, deleteVendor } = require("../../../controller/compneyOwner/vendor/vendore.controller");
const verifyJWT = require("../../../middleware/auth.middleware");
const authorizeRoles = require("../../../middleware/role.middleware");
router.post("/", verifyJWT, authorizeRoles("Owner"), createVendor);
router.get("/", verifyJWT, authorizeRoles("Owner"), getAllVendors);
router.put("/:id", verifyJWT, authorizeRoles("Owner"), updateVendor);
router.delete("/:id", verifyJWT, authorizeRoles("Owner"), deleteVendor);

module.exports = router;