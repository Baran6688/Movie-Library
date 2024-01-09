const express = require("express")
const router = express.Router()
const {
	getAllMovies,
	findMovie,
	addMovie,
	getOneMovie,
	showHome,
	showMovie,
} = require("../controller/moviesController")
const authController = require("../controller/authController")

router.use(authController.protect)
router.get("/pages/home", showHome)
router.get("/pages/movie/:id", showMovie)
router.get("/:id", getOneMovie)
router.get("/", getAllMovies)
router.get("/search", findMovie)
router.post("/", addMovie)

module.exports = router
