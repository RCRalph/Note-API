// Require dependencies
const express = require("express");

require("dotenv").config({ path: __dirname + "/.env" });

const app = express();

// Add routes
require("./controllers/routes")(app);

// Error 404
app.use((req, res) => res.sendStatus(404));

// Listening
const port = process.env.APP_PORT;
app.listen(port, () => {
	console.log(`App listening at http://localhost:${port}`);
});