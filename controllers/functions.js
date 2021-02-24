const DB = require("./db");
const Crypto = require("crypto");
const cryptoRandomString = require("crypto-random-string");

const generateToken = async () => {
	let token;
	do {
		token = cryptoRandomString({ length: 32, type: "base64" });
	} while (await DB.User.exists({ token }));

	return token;
}

const errorResponse = (res, value, msg, param, location = "body") => {
	return res.status(422).json({
		errors: [{
			value,
			msg,
			param,
			location
		}]
	});
}

const hashPassword = password => {
	return Crypto
		.createHash("sha256")
		.update(password, "binary")
		.digest("hex");
}

const getImportantDataFromNoteObject = note => {
	return {
		id: note._id,
		title: note.title,
		content: note.content,
		created_at: note.created_at,
		updated_at: note.updated_at
	}
}

exports.generateToken = generateToken;
exports.errorResponse = errorResponse;
exports.hashPassword = hashPassword;
exports.getImportantDataFromNoteObject = getImportantDataFromNoteObject;