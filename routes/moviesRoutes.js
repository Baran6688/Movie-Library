const express = require("express")
const router = express.Router()
const { showHome, showMovie } = require("../controller/moviesController")
const authController = require("../controller/authController")

// Protecting Routes
router.use(authController.protect)

// Showing Pages in HTML
router.get("/", showHome)
router.get("/:id", showMovie)

// Finish Them
router.get("/new")
router.get("/update")

module.exports = router
