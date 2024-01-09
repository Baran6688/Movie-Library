const express = require("express")
const db = require("../db")
const catchAsync = require("../utils/catchAsync")
const router = express.Router()

const authController = require("../controller/authController")

router.use(authController.protect)
router.get(
	"/",
	catchAsync(async (req, res, next) => {
		const [movies, error] = await db.findAll("movies")
		if (error) return next(new Error("Error"))
		res.status(200).json({ data: movies })
	})
)

router.post(
	"/",
	catchAsync(async (req, res, next) => {
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
)

module.exports = router
