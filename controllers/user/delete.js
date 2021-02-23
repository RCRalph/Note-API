const DB = require("../db");

module.exports = async (req, res) => {
	await DB.User.findByIdAndDelete(res.locals.user._id);

	// Also delete every note of the user

	return res.json({
		msg: "Account successfully deleted"
	});
}