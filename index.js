var express = require("express");
var app = express();
var port = 3000;
var shortId = require("shortid");
// temple engine
app.set("view engine", "pug");
app.set("views", "./views");
// body
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// db
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("db.json");
const db = low(adapter);

db.defaults({ character: [] }).write();
//------------------------------------------------------------
app.get("/", function(req, res) {
    res.render("index");
});

app.get("/character", function(req, res) {
    res.render("character/index", {
        characters: db.get("character").value(),
    });
});

app.get("/character/search", function(req, res) {
    var q = req.query.q;

    var matchedCharacter = db
        .get("character")
        .value()
        .filter(function(character) {
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
    req.body.id = shortId.generate();
    db.get("character").push(req.body).write();
    res.redirect("/character");
});

app.get("/character/:id", function(req, res) {
    var id = parseInt(req.params.id);

    var character = db.get("character").find({ id: id }).value();
    res.render("character/view", {
        character: character,
    });
});

app.listen(port, function() {
    console.log(`Server listening on port ${port}`);
});