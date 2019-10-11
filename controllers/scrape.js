
const express = require("express");
const cheerio = require("cheerio");
const axios = require("axios");

const db = require("../models");

const router = express.Router();

router.post("/api/article", function (req, res) {
    console.log(req.body);
    db.Article.create({
        title: req.body.title,
        link: req.body.link,
        summary: req.body.summary
    }).then(function (result) {

        console.log("logging result!" + result);
        //####################################### COULD CAUSE BUG ############################
        res.send(result);

    }).catch(function (err) {
        // If an error occurred, log it
        console.log(err);
    });
})

router.get("/db", function (req,res) {
    db.Article.find({}).then( function (dbarticle) {
        res.json(dbarticle)
    }).catch(function(err) {
        // If an error occurs, send it back to the client
        res.json(err);
      });
})

router.get("/scrape", function (req, res) {
    // First, we grab the body of the html with axios

    const BASE_URL = "http://www.nytimes.com/"
    axios.get(BASE_URL).then(function (response) {
        // Then, we load that into cheerio and save it to $ for a shorthand selector
        const $ = cheerio.load(response.data);

        // Now, we grab every h2 within an article tag, and do the following:
        $("article").each(function (i, element) {
            // Save an empty result object
            const result = {};
            // console.log(this)

            // Add the text and href of every link, and save them as properties of the result object
            result.title = $(this).find("h2").text();
            result.summary = $(this).find("p").text();
            result.link = BASE_URL + $(this).find("a").attr("href");
           

            // Create a new Article using the `result` object built from scraping
            // db.Article.create(result)
            //     .then(function (dbArticle) {
            //         // View the added result in the console
            //         console.log(dbArticle);
            //     })
            //     .catch(function (err) {
            //         // If an error occurred, log it
            //         console.log(err);
            //     });
            console.log("###########################################################")

            console.log(result)
        });

        // Send a message to the client
        res.send("Scrape Complete");
    });
});

module.exports = router;