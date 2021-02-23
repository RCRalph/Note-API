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

const noteSchema = new Schema({
	user_id: {
		type: String,
		required: true
	},
	title: {
		type: String,
		required: false,
	},
	content: {
		type: String,
		required: false
	},
	created_at: {
		type: Date,
		default: Date.now,
		required: true
	},
	updated_at: {
		type: Date,
		default: Date.now,
		required: true
	}
});

exports.User = Mongoose.model("user", userSchema);
exports.Note = Mongoose.model("note", noteSchema);