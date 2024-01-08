const express = require("express")
const router = express.Router()
const { register, login, protect } = require("../controller/authController")

router.post("/register", register)
router.post("/login", login)

module.exports = router
