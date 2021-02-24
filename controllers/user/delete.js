const DB = require("../db");

module.exports = async (req, res) => {
	await DB.User.findByIdAndDelete(res.locals.user._id);

	await DB.Note.deleteMany({ user_id: res.locals.user._id });

	return res.json({
		msg: "Account successfully deleted"
	});
}