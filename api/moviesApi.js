const express = require("express")
const router = express.Router()
const {
	getAllMovies,
	findMovie,
	addMovie,
	getOneMovie,
	deleteMovie,
	updateMovie,
} = require("../controller/moviesController")
const authController = require("../controller/authController")

// Protecting Routes
router.use(authController.protect)

// ADD  | GET ALL | SEARCH
router.post("/", addMovie)
router.get("/", getAllMovies)
router.get("/search", findMovie)

// READ | DELETE | UPDATE
router.get("/:id", getOneMovie)
router.delete("/:id", deleteMovie)
router.put("/:id", updateMovie)

// ADD LIKE | ADD COMMENT
router.patch("/like/:id")
router.post("/comment/:id")

module.exports = router
