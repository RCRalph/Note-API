const DB = require("./db");
const cryptoRandomString = require("crypto-random-string");

const generateToken = async () => {
	let token;
	do {
		token = cryptoRandomString({ length: 32, type: "base64" });
	} while (await DB.User.exists({ token }));

	return token;
}

const errorResponse = (res, value, msg, param) => {
	return res.status(422).json({
		errors: [{
			value,
			msg,
			param,
			location: "body"
		}]
	});
}

exports.generateToken = generateToken;
exports.errorResponse = errorResponse;