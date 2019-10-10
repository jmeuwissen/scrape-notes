const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");




const PORT = 3000;

// Initialize Express
const app = express();


app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));



// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/unit18Populater", { useNewUrlParser: true });



// Start the server
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });
  