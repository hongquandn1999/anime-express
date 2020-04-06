var express = require("express");
var app = express();
var port = 3000;

// temple engine
app.set("view engine", "pug");
app.set("views", "./views");
// body
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

var characters = [
    { id: 1, name: "Mimosa" },
    { id: 2, name: "Noelle" },
];

app.get("/", function(req, res) {
    res.render("index");
});

app.get("/character", function(req, res) {
    res.render("character/index", {
        characters: characters,
    });
});

app.get("/character/search", function(req, res) {
    var q = req.query.q;

    var matchedCharacter = characters.filter(function(character) {
        return character.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
    res.render("character/index", {
        characters: matchedCharacter,
        valued: q,
    });
});

app.get("/character/create", function(req, res) {
    res.render("character/create");
});

app.post("/character/create", function(req, res) {
    characters.push(req.body);
    res.redirect("/character");
});

app.listen(port, function() {
    console.log(`Server listening on port ${port}`);
});