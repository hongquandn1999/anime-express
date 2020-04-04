var express = require("express");
var app = express();
var port = 3000;

// temple engine
app.set("view engine", "pug");
app.set("views", "./views");

app.get("/", function(req, res) {
    res.render("index");
});

app.get("/character", function(req, res) {
    res.render("character/index", {
        users: [
            { id: 1, name: "Mimosa" },
            { id: 2, name: "Noelle" },
        ],
    });
});

app.listen(port, function() {
    console.log(`Server listening on port ${port}`);
});