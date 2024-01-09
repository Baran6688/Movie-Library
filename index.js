const express = require("express")
const app = express()
const path = require("path")
const db = require("./db")
const authRoutes = require("./routes/authRoutes")
const moviesRoutes = require("./routes/moviesRoutes")
require("dotenv").config()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use("/auth", authRoutes)
app.use("/movies", moviesRoutes)
app.use((err, req, res, next) => {
	console.error(err)
	const errorMessage = err.message || "Something went wrong!"
	const statusCode = err.statusCode || 500
	res.status(statusCode).json({ message: errorMessage })
})

app.listen(3000, () => {
	console.log("Listening")
})
