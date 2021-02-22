module.exports = (app) => {
	app.get("/", (req, res) => res.json({
		status: 200,
		message: "Welcome to Notes API, please read the README.md file for route description"
	}));
}