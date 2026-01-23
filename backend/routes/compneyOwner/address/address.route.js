const express = require("express");
const router = express.Router();
const { createAddress, getAllAddresses, updateAddress, deleteAddress } = require("../../../controller/compneyOwner/address/address.controller");

const verifyJWT = require("../../../middleware/auth.middleware");
const authorizeRoles = require("../../../middleware/role.middleware");
// router.get("/", verifyJWT, getAllAddresses);
router.get("/", getAllAddresses);
router.post("/", verifyJWT, authorizeRoles("Owner"), createAddress);
router.put("/:id", verifyJWT, authorizeRoles("Owner"), updateAddress);
router.delete("/:id", verifyJWT, authorizeRoles("Owner"), deleteAddress);

module.exports = router;