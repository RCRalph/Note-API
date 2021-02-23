// Require dependencies
const express = require("express");
const Mongoose = require("mongoose");

require("dotenv").config({ path: __dirname + "/.env" });

// Set up the app
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to database
Mongoose.connect(process.env.MONGODB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

// Add routes
require("./controllers/routes")(app);
require("./controllers/user")(app);
require("./controllers/notes")(app);

// Error 404
app.use((req, res) => res.sendStatus(404));

// Listening
const port = process.env.APP_PORT;
app.listen(port, () => {
	console.log(`App listening at http://localhost:${port}`);
});