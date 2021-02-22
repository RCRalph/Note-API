const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const userSchema = new Schema({
	email: {
		type: "string",
		required: true,
		unique: true
	},
	password: {
		type: "string",
		required: true,
	},
	token: {
		type: "string",
		required: true,
		type: String,
		trim: true,
		index: {
			unique: true,
			partialFilterExpression: {
				token: {
					$type: "string"
				}
			}
		}
	}
});

exports.User = Mongoose.model("user", userSchema);