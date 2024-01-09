const db = require("../db")
const catchAsync = require("../utils/catchAsync")

module.exports.getAllMovies = catchAsync(async (req, res, next) => {
	const [movies, error] = await db.findAll("movies")
	if (error) return next(new Error(error))
	res.status(200).json({ data: movies })
})

module.exports.findMovie = catchAsync(async (req, res, next) => {
	const { title } = req.query
	const [movie, error] = await db.find("movies", `title LIKE '%${title}%'`)
	if (error) return next(new Error(error))
	res.json({ data: movie })
})

module.exports.addMovie = catchAsync(async (req, res, next) => {
	const { title, description, release_year, genre, director } = req.body
	await db.insert("movies", {
		title,
		description,
		release_year,
		genre,
		director,
	})
	res.status(200).json({ message: "successfully added new movie!" })
})
