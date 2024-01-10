const express = require("express")
const {
	showActorProfile,
	showActorForm,
	showAllActors,
} = require("../controller/actorController")
const router = express.Router()
const authController = require("../controller/authController")

// Protecting Routes
router.use(authController.protect)

// GET All Actors
router.get("/", showAllActors)

// Get NEW Actor Form
router.get("/new", showActorForm)

// get actor profile
router.get("/:id", showActorProfile)

module.exports = router
