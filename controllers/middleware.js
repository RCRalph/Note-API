const { validationResult } = require("express-validator");
const DB = require("./db");
const { errorResponse } = require("./functions"); 

const checkForErrors = (req, res, next) => {
	const validationErrors = validationResult(req);
	if (!validationErrors.isEmpty()) {
		res.status(422)
			.json({
				errors: validationErrors.array()
			});
	}
	else {
		next();
	}
}

const verifyToken = async (req, res, next) => {
	if (!await DB.User.exists({ token: req.body.token })) {
		errorResponse(
			res,
			req.body.token,
			"Invalid token",
			"token"
		)
	}
	else {
		next();
	}
}

exports.checkForErrors = checkForErrors;
exports.verifyToken = verifyToken;