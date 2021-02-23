const DB = require("../db");
const { errorResponse, generateToken, hashPassword } = require("../functions");
const Crypto = require("crypto");

module.exports = async (req, res) => {
	const user = await DB.User.findOne({ email: req.body.email }).exec();

	if (!user) {
		return errorResponse(
			res,
			req.body.email,
			"User not found",
			"email"
		)
	}
	
	if (hashPassword(req.body.password) != user.password) {
		return errorResponse(
			res,
			null,
			"Incorrect password",
			"password"
		)
	}

	const token = await generateToken();
	await DB.User.findByIdAndUpdate(user._id, { token }, {
		useFindAndModify: false
	})

	return res.json({
		token
	})
}