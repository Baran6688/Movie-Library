const db = require("../db")
const catchAsync = require("../utils/catchAsync")
const path = require("path")

module.exports.showMovie = (req, res) => {
	const { id } = req.params
	console.log(id)
	res
		.type("html")
		.status(200)
		.sendFile("views/movieDetails.html", { root: path.join(__dirname, "../") })
}

module.exports.showHome = (req, res) => {
	res
		.type("html")
		.status(200)
		.sendFile("views/movies.html", { root: path.join(__dirname, "../") })
}

module.exports.getAllMovies = catchAsync(async (req, res, next) => {
	const [movies, error] = await db.findAll("movies")
	if (error) return next(new Error(error))
	res.status(200).json({ data: movies })
})

module.exports.getOneMovie = catchAsync(async (req, res, next) => {
	const { id } = req.params
	const [[movie], error] = await db._executeQuery(
		`SELECT
    movies.title,
    movies.release_year,
	movies.description,
	movies.director,
    GROUP_CONCAT(CONCAT(actors.name, ' from ',actors.country) ORDER BY actors.id SEPARATOR ', ') AS actors_list
	FROM
		movies
	LEFT JOIN
		movie_actor ON movies.id = movie_actor.movie_id
	LEFT JOIN
		actors ON movie_actor.actor_id = actors.id
	WHERE
		movies.id = ${id};`
	)

	if (!movie || !movie.title) return next(new Error("Not Found any movies!"))

	res.status(200).json({ data: movie })
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
