const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");




const PORT = 3000;

// Initialize Express
const app = express();


app.use(logger("dev"));
// Serve static content for the app from the "public" directory in the application directory.

app.use(express.static("public"));
// Parse application body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());




// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/unit18Populater", { useNewUrlParser: true });

const routes = require("./controllers/scrape.js");

app.use(routes);
// Start the server
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });
  