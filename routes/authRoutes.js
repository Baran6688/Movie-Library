const express = require("express")
const router = express.Router()
const { register, login, showLogin } = require("../controller/authController")
router.get("/login", showLogin)
router.post("/register", register)
router.post("/login", login)

module.exports = router
