const cheerio = require("cheerio");
const axios = require("axios");

const db = require("../models")



app.post("/api/article", function (req, res) {
    db.Article.create({
        title: req.body.title,
        link: req.body.link,
        summary: req.body.summary
    }).then(function (result) {

        console.log(result);
        //####################################### COULD CAUSE BUG ############################
        res.send(result);

    }).catch(function (err) {
        // If an error occurred, log it
        console.log(err);
    });
})

app.get("/scrape", function (req, res) {
    // First, we grab the body of the html with axios
    axios.get("http://www.nytimes.com/").then(function (response) {
        // Then, we load that into cheerio and save it to $ for a shorthand selector
        const $ = cheerio.load(response.data);

        // Now, we grab every h2 within an article tag, and do the following:
        $("article h2").each(function (i, element) {
            // Save an empty result object
            const result = {};

            // Add the text and href of every link, and save them as properties of the result object
            result.title = $(this)
                .children("a")
                .text();
            result.link = $(this)
                .children("a")
                .attr("href");

            // Create a new Article using the `result` object built from scraping
            db.Article.create(result)
                .then(function (dbArticle) {
                    // View the added result in the console
                    console.log(dbArticle);
                })
                .catch(function (err) {
                    // If an error occurred, log it
                    console.log(err);
                });
        });

        // Send a message to the client
        res.send("Scrape Complete");
    });
});