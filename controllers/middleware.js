const { validationResult } = require("express-validator");

function checkForErrors(req, res, next) {
	const validationErrors = validationResult(req);
	if (!validationErrors.isEmpty()) {
		return res.status(422).json({
			errors: validationErrors.array()
		});
	}

	next();
}

exports.checkForErrors = checkForErrors;