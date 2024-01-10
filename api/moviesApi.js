const express = require("express")
const router = express.Router()
const {
	getAllMovies,
	findMovie,
	addMovie,
	getOneMovie,
	deleteMovie,
	updateMovie,
	getMovieActors,
	addActorToMovie,
	deleteActorFromMovie,
	addCommentToMovie,
	deleteComment,
	getLikes,
	addLike,
	deleteLike,
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
router.get("/:id/actors", getMovieActors)
router.post("/:id/actors", addActorToMovie)
router.delete("/:id/actors", deleteActorFromMovie)

//  ADD COMMENT | DELETE COMMENT
router.post("/comments/:id", addCommentToMovie)
router.delete("/comments/:id", deleteComment)

// GET LIKE | ADD LIKE | DELETE LIKE
router.get("/:id/likes", getLikes)
router.post("/:id/likes", addLike)
router.delete("/:id/likes/", deleteLike)

module.exports = router
