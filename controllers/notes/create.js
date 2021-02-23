const DB = require("../db");
const { getImportantDataFromNoteObject } = require("../functions");

module.exports = async (req, res) => {
	let note = new DB.Note({
		user_id: res.locals.user._id,
		title: req.body.title,
		content: req.body.content
	});

	await note.save(err => {
		if (err) {
			console.error(err);

			return res.status(500)
				.json({
					msg: "Server error"
				});
		}
	});

	return res.json(getImportantDataFromNoteObject(note));
}