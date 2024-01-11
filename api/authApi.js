const express = require("express")
const router = express.Router()
const {
	register,
	login,
	protect,
	currentUser,
	logout,
} = require("../controller/authController")

// API Routes
router.post("/login", login)
router.post("/register", register)
router.get("/logout", logout)

// Current User Check
router.get("/", protect, currentUser)

module.exports = router
