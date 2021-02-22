const { body, validationResult } = require("express-validator");
const Crypto = require("crypto");
const cryptoRandomString = require("crypto-random-string");
const DB = require("./database-schemas");
const middleware = require("./middleware");

module.exports = (app) => {
	app.post("/login", (req, res) => {

		}
	);
	
	app.post("/register",
		body("email").isEmail().normalizeEmail().isLength({ max: 64 }),
		body("password").not().isEmpty().isLength({ min: 8, max: 64 }),
		body("password-confirmation").custom((value, { req }) => {
			if (value != req.body.password) {
			  	throw new Error('Password confirmation does not match password');
			}
			return true;
		}),
		middleware.checkForErrors,
		async (req, res) => {
			// Check for existing email
			if (await DB.User.exists({ email: req.body.email })) {
				return res.status(422).json({
					errors: [
						{
							value: req.body.email,
							msg: "User already exists",
							param: "email",
							location: "body"
						}
					]
				});
			}

			// Generate token and enter into the document
			let token;
			do {
				token = cryptoRandomString({ length: 32, type: "base64" });
			} while (await DB.User.exists({ token }))

			let user = new DB.User({
				email: req.body.email,
				password: Crypto
					.createHash("sha256")
					.update(req.body.password, "binary")
					.digest("hex"),
				token
			});
		
			await user.save(err => {
				if (err) {
					console.error(err);

					return res.status(500).json({
						msg: "Server error"
					});
				}
			});

			return res.json({
				token
			});
		}
	);

	app.post("/logout",	
		body("token").not().isEmpty(),
		middleware.checkForErrors,
		async (req, res) => {
			if (!await DB.User.exists({ token: req.body.token })) {
				return res.status(422).json({
					errors: [
						{
							value: req.body.token,
							msg: "Invaid token",
							param: "token",
							location: "body"
						}
					]
				});
			}

			await DB.User.findOneAndUpdate({ token: req.body.token }, { token: null }, {
				useFindAndModify: true
			});

			return res.json({
				msg: "Successfully logged out."
			});
		}
	);
}