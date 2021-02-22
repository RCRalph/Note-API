const DB = require("../db");

module.exports = async (req, res) => {
	DB.User.findOneAndUpdate({ token: req.body.token }, { token: null }, {
		useFindAndModify: false
	});

	return res.json({
		msg: "Successfully logged out."
	});
}