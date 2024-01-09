// Initializing Express
const express = require("express")
const app = express()

// Dependancies
const path = require("path")
const cookieParser = require("cookie-parser")

// requriring Routes and API Endpoints
const authRoutes = require("./routes/authRoutes")
const authApi = require("./api/authApi")
const moviesRoutes = require("./routes/moviesRoutes")
const moviesApi = require("./api/moviesApi")

// Middleware
app.use((req, res, next) => {
	console.log(req.method, req.path)
	next()
})

// to access environment variables
require("dotenv").config()

// To pass req.body through routes
app.use(express.urlencoded({ extended: true }))

// to access json format
app.use(express.json())

// to access the public folder for static files
app.use(express.static(path.join(__dirname, "public")))

// To parse cookies for Authentication
app.use(cookieParser())

// Defining Routes
// ---
app.use("/api/auth", authApi)
app.use("/auth", authRoutes)

app.use("/movies", moviesRoutes)
app.use("/api/movies", moviesApi)
// ---

// Catch all Undefined Routes
app.get("*", (req, res, next) => {
	res.send("<h1>Route not defined! </h1>")
})

// Catch all errors
app.use((err, req, res, next) => {
	console.error(err)
	const errorMessage = err.message || "Something went wrong!"
	const statusCode = err.statusCode || 500
	res.status(statusCode).json({ message: errorMessage })
})

// Listening on Port
app.listen(3000, () => {
	console.log("Listening")
})
