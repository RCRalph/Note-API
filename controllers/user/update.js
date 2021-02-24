const DB = require("../db");
const emailValidator = require("email-validator");
const { errorResponse, hashPassword } = require("../functions");

module.exports = async (req, res) => {
	if (!req.body.email && !req.body.password) {
		return errorResponse(
			res,
			"",
			"Nothing to update",
			""
		)
	}

	if (req.body.email && typeof req.body.email == "string") {
		if (!emailValidator.validate(req.body.email) || req.body.email.length > 64) {
			return errorResponse(
				res,
				req.body.email,
				"Invalid email",
				"email"
			);
		}

		await DB.User.findByIdAndUpdate(
			res.locals.user._id,
			{ email: req.body.email },
			{ useFindAndModify: false }
		);
	}

	if (req.body.password && typeof req.body.password == "string") {
		if (req.body.password.length < 8 || req.body.password.length > 64) {
			return errorResponse(
				res,
				null,
				"Invalid password",
				"password"
			);
		}

		if (hashPassword(req.body.previous_password) != res.locals.user.password) {
			return errorResponse(
				res,
				null,
				"Invalid previous password",
				"previous_password"
			);
		}

		if (req.body.password != req.body.password_confirmation) {
			return errorResponse(
				res,
				null,
				"Given passwords don't match",
				"password_confirmation"
			);
		}

		await DB.User.findByIdAndUpdate(
			res.locals.user._id,
			{ password: hashPassword(req.body.password) },
			{ useFindAndModify: false }
		);
	}

	return res.json({
		msg: "Account successfully updated"
	})
}