const db = require("../db")
const catchAsync = require("../utils/catchAsync")
const renderHtml = require("../utils/renderHtml")

module.exports.showActorProfile = (req, res, next) => {
	renderHtml("actorProfile", res)
}

module.exports.showAllActors = (req, res) => {
	renderHtml("actors", res)
}

module.exports.showActorForm = (req, res) => {
	renderHtml("newActor", res)
}

module.exports.getAllActors = catchAsync(async (req, res, next) => {
	const [actors, error] = await db.findAll("actors")
	res.status(200).json({ data: actors })
})

module.exports.addActor = catchAsync(async (req, res, next) => {
	const { name, birth, country } = req.body

	const [{ insertId: actor_id }, err] = await db.insert("actors", {
		name,
		birth,
		country,
	})
	if (err) return next(new Error("Cannot insert!"))
	res.status(200).json({ actor_id, message: "done" })
})

module.exports.getOneActor = catchAsync(async (req, res, next) => {
	const { id } = req.params
	const [[actor], error] = await db.find("actors", `id=${id}`)
	res.status(200).json({ message: "Done", data: actor })
})

module.exports.deleteOneActor = catchAsync(async (req, res, next) => {
	const { id } = req.params
	const [result, error] = await db.deleteOne("actors", id)
	res.status(200).json({ message: "done" })
})

module.exports.getActorMovies = catchAsync(async (req, res, next) => {
	const { id: actor_id } = req.params

	const [result, error] = await db._executeQuery(`
	SELECT * FROM movie_actor
	LEFT JOIN movies ON movies.id = movie_actor.movie_id
	WHERE actor_id = ${actor_id}
	`)

	res.status(200).json({ data: result })
})
