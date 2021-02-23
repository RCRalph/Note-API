const DB = require("../db");
const { getImportantDataFromNoteObject } = require("../functions");

module.exports = async (req, res) => {
	let notes = await DB.Note.find({ user_id: res.locals.user._id }).exec();

	notes.forEach((item, i) => {
		notes[i] = getImportantDataFromNoteObject(item);
	});

	return res.json(notes);
}