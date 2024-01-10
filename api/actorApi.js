const express = require("express")
const {
	getAllActors,
	addActor,
	getOneActor,
	deleteOneActor,
} = require("../controller/actorController")
const router = express.Router()
const authController = require("../controller/authController")

// Protecting Routes
router.use(authController.protect)


//
router.get("/", getAllActors)
router.post("/", addActor)
router.get("/:id", getOneActor)
router.delete("/:id", deleteOneActor)

module.exports = router
