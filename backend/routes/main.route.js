const express = require("express")
const router = express.Router()
// Auth   main  router 
router.use("/auth", require("./auth/auth.route"));
// supper-admin main  router 
router.use("/super-admin", require("./supperAdmin/index.route"));
// supper-admin main  router
router.use("/store", require("./compneyOwner/index.route"));
module.exports = router;