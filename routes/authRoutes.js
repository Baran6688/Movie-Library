const express = require("express")
const router = express.Router()
const { showLogin } = require("../controller/authController")

// Showing Pages
router.get("/login", showLogin)

module.exports = router
