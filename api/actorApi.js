const express = require("express")
const {
	getAllActors,
	addActor,
	getOneActor,
	deleteOneActor,
	getActorMovies,
} = require("../controller/actorController")
const router = express.Router()
const authController = require("../controller/authController")

// Protecting Routes
router.use(authController.protect)

// GET ALL ACTORS
router.get("/", getAllActors)

// GET | ADD | DELETE Actor
router.post("/", addActor)
router.get("/:id", getOneActor)
router.delete("/:id", deleteOneActor)

// GET ACTOR MOVIES
router.get("/:id/movies", getActorMovies)

module.exports = router
