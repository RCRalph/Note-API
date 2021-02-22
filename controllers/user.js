const { body } = require("express-validator");
const middleware = require("./middleware");

module.exports = (app) => {
	app.post("/login",
		// Validate request
		body("email").isEmail().normalizeEmail().isLength({ max: 64 }),
		body("password").not().isEmpty().isLength({ min: 8, max: 64 }),
		middleware.checkForErrors,

		require("./user/login")
	);
	
	app.post("/register",
		// Validate request
		body("email").isEmail().normalizeEmail().isLength({ max: 64 }),
		body("password").not().isEmpty().isLength({ min: 8, max: 64 }),
		body("password-confirmation").custom((value, { req }) => {
			if (value != req.body.password) {
			  	throw new Error('Password confirmation does not match password');
			}
			return true;
		}),
		middleware.checkForErrors,

		require("./user/register")
	);

	app.post("/logout",
		// Validate request
		body("token").not().isEmpty(),
		middleware.checkForErrors,

		middleware.verifyToken,
		require("./user/logout")
	);
}