const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");



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
mongoose.connect("mongodb://localhost/scrapedb", { useNewUrlParser: true });

const routes = require("./controllers/scrape.js");



app.use(routes);
// Start the server

// // Send every other request to the React app
// // Define any API routes before this runs
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "./client/build/index.html"));
// });
//## if i want to use react, it needs to go in a c-r-a 
//## there will be two package files, one in the react app and one in the parent server directory
//

app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });
  