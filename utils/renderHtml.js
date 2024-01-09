const path = require("path")

module.exports = function renderHtml(fileName, res) {
	res
		.type("html")
		.status(200)
		.sendFile(`views/${fileName}.html`, { root: path.join(__dirname, "../") })
}
