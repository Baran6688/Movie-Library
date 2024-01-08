const express = require("express")
const router = express.Router()
const bcrypt = require("bcryptjs")
const db = require("../db")
const catchAsync = require("../utils/catchAsync")
const jwt = require("jsonwebtoken")

function generateAndSendToken(id, res) {
	const token = jwt.sign({ id: user.id }, process.env.SECRET, {
		expiresIn: "10d",
	})
	res.status(200).json({ user, error, isCorrect, token })
}

const protect = catchAsync(async (req, res, next) => {
	const token = req.headers.authorization.split(" ")[1]
	const { id } = jwt.verify(token, process.env.SECRET)
	const [[user], error] = await db.find("users", `id='${id}'`)
	if (!user) return next(new Error("User does not exist!"))
	req.user = user
	next()
})

router.post(
	"/register",
	catchAsync(async (req, res, next) => {
		const { username, password } = req.body
		console.log("HERE", username, password)
		if (!username || !password) return next(new Error("Cannot do it"))
		const hashedPassword = await bcrypt.hash(password, 12)
		const [result, error] = await db.insert("users", {
			username: username,
			password: hashedPassword,
		})
		res.status(200).json({ result })
	})
)

router.post(
	"/login",
	catchAsync(async (req, res, next) => {
		const { username, password } = req.body
		if (!username || !password) return next(new Error("Cannot do it"))

		const [[user], error] = await db.find("users", `username='${username}'`)
		const isCorrect = await bcrypt.compare(password, user.password)

		if (!isCorrect) return next(new Error("Password is not correct!"))
		generateAndSendToken(user.id, res)
	})
)

module.exports = router
