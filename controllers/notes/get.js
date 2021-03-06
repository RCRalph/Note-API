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

	return res.json(getImportantDataFromNoteObject(note, req.body.hateoas));
}