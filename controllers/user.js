const { body } = require("express-validator");
const middleware = require("./middleware");

module.exports = (app) => {
	app.post("/login",
		// Validate request
		body("email").isEmail().normalizeEmail().isLength({ max: 64 }),
		body("password").notEmpty().isLength({ min: 8, max: 64 }),
		middleware.checkForErrors,

		require("./user/login")
	);
	
	app.post("/register",
		// Validate request
		body("email").isEmail().normalizeEmail().isLength({ max: 64 }),
		body("password").notEmpty().isLength({ min: 8, max: 64 }),
		body("password_confirmation").custom((value, { req }) => {
			if (value != req.body.password) {
			  	throw new Error("Given passwords don't match");
			}
			return true;
		}),
		middleware.checkForErrors,

		require("./user/register")
	);

	app.post("/logout",
		middleware.verifyToken,
		require("./user/logout")
	);

	app.post("/update",
		middleware.verifyToken,
		require("./user/update")
	)

	app.post("/delete",
		middleware.verifyToken,
		require("./user/delete")
	)
}