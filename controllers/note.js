module.exports = (app) => {
	app.get("/notes", (req, res) => {

		}
	);

	app.post("/notes/create", (req, res) => {

		}
	);

	app.route("/notes/:id")
		.get((req, res) => {
			
		})
		.patch((req, res) => {

		})
		.delete((req, res) => {

		});

}