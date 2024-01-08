const mysql = require("mysql")

function createDatabaseConnection(config) {
	const con = mysql.createConnection(config)

	con.connect(function (err) {
		if (err) throw err
		console.log("Connected!")
	})

	return {
		async find(table, condition) {
			const query = `SELECT * FROM ${table} WHERE ${condition}`
			return this._executeQuery(query)
		},

		async findAll(table) {
			const query = `SELECT * FROM ${table}`
			return this._executeQuery(query)
		},

		async insert(table, data) {
			const keys = Object.keys(data).join(",")
			const values = Object.values(data)
				.map(value => `'${value}'`)
				.join(",")
			const query = `INSERT INTO ${table} (${keys}) VALUES (${values})`
			return this._executeQuery(query)
		},

		async _executeQuery(query) {
			return new Promise(resolve => {
				con.query(query, (err, results) => {
					if (err) {
						resolve([null, err.message])
					} else {
						resolve([results, null])
					}
				})
			})
		},
	}
}

const db = createDatabaseConnection({
	host: "127.0.0.1",
	user: "root",
	password: "1234",
	database: "mysql",
})

module.exports = db
