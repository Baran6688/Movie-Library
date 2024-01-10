const db = require("../db")
const catchAsync = require("../utils/catchAsync")
const renderHtml = require("../utils/renderHtml")

module.exports.showMovie = (req, res) => {
	renderHtml("movieDetails", res)
}

module.exports.showUpdateMovie = (req, res) => {
	renderHtml("updateMovie", res)
}

module.exports.showHome = (req, res) => {
	renderHtml("movies", res)
}

module.exports.showNewMovie = (req, res) => {
	renderHtml("newMovie", res)
}

module.exports.showMovieActors = (req, res) => {
	renderHtml("movieActors", res)
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
		movies.genre,
		movies.director,
		JSON_ARRAYAGG(
			JSON_OBJECT(
				'id', actors.id,
				'name', actors.name,
				'country', actors.country
			) 
			ORDER BY actors.id
		) AS actors_list,
		JSON_ARRAYAGG(
			JSON_OBJECT(
				'id', comments.id,
				'content', comments.content,
				'username', users.username
			)
		) as comments

		FROM
			movies
		LEFT JOIN
			movie_actor ON movies.id = movie_actor.movie_id
		LEFT JOIN
			actors ON movie_actor.actor_id = actors.id
		LEFT JOIN
			comments ON comments.movie_id = movies.id
	    LEFT JOIN 
			users ON comments.user_id = users.id
		WHERE
			movies.id = ${id};`
	)
	console.log(req.user)
	if (!movie || !movie.title) return next(new Error("Not Found any movies!"))

	res.status(200).json({ data: movie, user: req.user })
})

module.exports.findMovie = catchAsync(async (req, res, next) => {
	const { title } = req.query
	const [movie, error] = await db.find("movies", `title LIKE '%${title}%'`)
	if (error) return next(new Error(error))
	res.json({ data: movie })
})

module.exports.addMovie = catchAsync(async (req, res, next) => {
	const { title, description, release_year, genre, director, actor_id } =
		req.body
	const [{ insertId: movie_id }] = await db.insert("movies", {
		title,
		description,
		release_year,
		genre,
		director,
	})
	await db.insert("movie_actor", { actor_id, movie_id })
	res
		.status(200)
		.json({ message: "successfully added new movie!", id: movie_id })
})

module.exports.deleteMovie = catchAsync(async (req, res, next) => {
	const { id } = req.params
	await db.deleteOne("movies", id)
	res.status(200).json({ data: "DELETED" })
})

module.exports.updateMovie = catchAsync(async (req, res, next) => {
	const { title, director, release_year, genre, description } = req.body
	const { id } = req.params
	const [updated, error] = await db.updateOne(
		"movies",
		`title='${title}',
		 description='${description}',
		 director='${director}',
		 release_year='${release_year}',
		 genre='${genre}'`,
		id
	)
	if (error) return next(new Error("Something went wrong.."))
	res.status(200).json({ message: "Successfull Updated!" })
})

module.exports.getMovieActors = catchAsync(async (req, res, next) => {
	const { id } = req.params
	const [result, error] = await db._executeQuery(
		`SELECT movies.title, movie_actor.actor_id, actors.name, actors.country, movie_actor.id as entry_id, actors.birth FROM movies
		 JOIN movie_actor ON movies.id = movie_actor.movie_id
		 JOIN actors ON actors.id = movie_actor.actor_id
		 WHERE movies.id=${id}
		 ORDER BY actors.id
		 `
	)
	console.log(result)
	const title = result[0].title
	const actors = result.map(actor => {
		return {
			id: actor.actor_id,
			name: actor.name,
			birth: actor.birth,
			country: actor.country,
			entry_id: actor.entry_id,
		}
	})

	res.status(200).json({ actors, title })
})

module.exports.addActorToMovie = catchAsync(async (req, res, next) => {
	const { id: movie_id } = req.params
	const { actor_id } = req.body
	const [{ insertId }, error] = await db.insert("movie_actor", {
		actor_id: actor_id,
		movie_id: movie_id,
	})
	if (error) return next(new Error("Not Found!"))
	res.status(200).json({ message: "Successfully Added an actor!", insertId })
})

module.exports.deleteActorFromMovie = catchAsync(async (req, res) => {
	const { id } = req.params
	await db.deleteOne("movie_actor", id)
	res.status(200).json({ message: "Successfully Deleted!" })
})
