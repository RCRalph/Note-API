const DB = require("../db");
const Crypto = require("crypto");
const { generateToken } = require("../functions");

module.exports = async (req, res) => {
	if (await DB.User.exists({ email: req.body.email })) {
		return errorResponse(
			res,
			req.body.email,
			"User already exists",
			"email"
		);
	}

	const token = await generateToken();
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

			return res.status(500)
				.json({
					msg: "Server error"
				});
		}
	});

	return res.json({
		token
	});
}