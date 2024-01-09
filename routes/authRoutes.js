const express = require("express")
const router = express.Router()
const { showLogin, showRegister } = require("../controller/authController")

// Showing Pages
router.get("/login", showLogin)
router.get("/register", showRegister)

module.exports = router
