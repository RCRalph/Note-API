const DB = require("../db");

module.exports = async (req, res) => {
	await DB.User.findByIdAndUpdate(res.locals.user._id, { token: null }, {
		useFindAndModify: false
	});

	return res.json({
		msg: "Successfully logged out."
	});
}