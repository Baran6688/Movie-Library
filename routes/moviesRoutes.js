const express = require("express")
const router = express.Router()
const {
	showHome,
	showMovie,
	showNewMovie,
	showUpdateMovie,
} = require("../controller/moviesController")
const authController = require("../controller/authController")

// Protecting Routes
router.use(authController.protect)

// Finish Them
router.get("/new", showNewMovie)
router.get("/update/:id", showUpdateMovie)

// Showing Pages in HTML
router.get("/", showHome)
router.get("/:id", showMovie)
module.exports = router
