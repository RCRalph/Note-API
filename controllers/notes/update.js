const DB = require("../db");
const { errorResponse, getImportantDataFromNoteObject } = require("../functions");

module.exports = async (req, res) => {
	const note = await DB.Note.findById(req.params.id);

	if (!note || note.user_id != res.locals.user._id) {
		return errorResponse(
			res,
			req.params.id,
			"Note not found",
			"id",
			"params"
		)
	}

	await DB.Note.findByIdAndUpdate(note._id, {
		title: req.body.title,
		content: req.body.content,
		updated_at: Date.now()
	}, { useFindAndModify: false });

	return res.json(getImportantDataFromNoteObject(await DB.Note.findById(note._id), req.body.hateoas));
}