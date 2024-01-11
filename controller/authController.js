const bcrypt = require("bcryptjs")
const db = require("../db")
const catchAsync = require("../utils/catchAsync")
const jwt = require("jsonwebtoken")
const renderHtml = require("../utils/renderHtml")

function generateAndSendToken(id, res) {
	const token = jwt.sign({ id }, process.env.SECRET, {
		expiresIn: "10d",
	})
	if (!token) throw new Error("Some thing went Wrong!")
	res.cookie("token", token, { expiresIn: 10 * 24 * 60 * 60 * 1000 }) // 10 days in milliseconds
	res.status(200).json({ token })
}

module.exports.showLogin = (req, res) => {
	renderHtml("login", res)
}

module.exports.showRegister = (req, res) => {
	renderHtml("register", res)
}

module.exports.register = catchAsync(async (req, res, next) => {
	const { username, password } = req.body
	if (!username || !password) return next(new Error("Cannot do it"))

	const hashedPassword = await bcrypt.hash(password, 12)
	const [{ insertId }, error] = await db.insert("users", {
		username: username,
		password: hashedPassword,
	})
	generateAndSendToken(insertId, res)
})

module.exports.login = catchAsync(async (req, res, next) => {
	const { username, password } = req.body
	if (!username || !password) return next(new Error("Please fill all fields!"))

	const [[user], error] = await db.find("users", `username='${username}'`)
	if (!user) return next(new Error("incorrect username or password!"))
	const isCorrect = await bcrypt.compare(password, user.password)
	if (!isCorrect) return next(new Error("incorrect username or password!"))
	generateAndSendToken(user.id, res)
})

module.exports.currentUser = catchAsync(async (req, res, next) => {
	res.status(200).json({ user: req.user })
})

module.exports.protect = catchAsync(async (req, res, next) => {
	const tokenFromHeaders = req.headers?.authorization?.split(" ")[1]
	const tokenFromCookies = req.cookies?.token

	const token = tokenFromHeaders || tokenFromCookies
	if (!token) return res.redirect("/auth/login")

	const { id } = jwt.verify(token, process.env.SECRET)
	if (!id) return next(new Error("not found ID!"))
	const [[user], error] = await db.find("users", `id='${id}'`)
	if (!user) return next(new Error("User does not exist!"))
	req.user = { username: user.username, id: user.id }
	next()
})
