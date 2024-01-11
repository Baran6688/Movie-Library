const express = require("express")
const router = express.Router()
const {
	register,
	login,
	protect,
	currentUser,
} = require("../controller/authController")

// API Routes
router.post("/login", login)
router.post("/register", register)

// Current User Check
router.get("/", protect, currentUser)

module.exports = router
