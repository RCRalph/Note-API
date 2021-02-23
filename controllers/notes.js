const { body } = require("express-validator");
const middleware = require("./middleware");

module.exports = (app) => {
	app.get("/notes",
		middleware.verifyToken,
		require("./notes/getAll")
	);

	app.post("/notes/create",
		// Validate request
		body("title").isLength({ max: 256 }),
		body("content").isLength({ max: 4294967296 }),
		middleware.checkForErrors,

		middleware.verifyToken,
		require("./notes/create")
	);

	app.route("/notes/:id")
		.get(
			middleware.verifyToken,
			require("./notes/get")
		)
		.patch(
			// Validate request
			body("title").isLength({ max: 256 }),
			body("content").isLength({ max: 4294967296 }),
			middleware.checkForErrors,

			middleware.verifyToken,
			require("./notes/update")
		)
		.delete(
			middleware.verifyToken,
			require("./notes/delete")
		);
}