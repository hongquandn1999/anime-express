var express = require("express");
var router = express.Router();

var db = require("../db");

var shortId = require("shortid");

router.get("/", function(req, res) {
    res.render("character/index", {
        characters: db.get("character").value(),
    });
});

router.get("/search", function(req, res) {
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

router.get("/create", function(req, res) {
    res.render("character/create");
});

router.post("/create", function(req, res) {
    req.body.id = shortId.generate();
    db.get("character").push(req.body).write();
    res.redirect("/character");
});

router.get("/:id", function(req, res) {
    var id = req.params.id;

    var character = db.get("character").find({ id: id }).value();
    res.render("character/view", {
        character: character,
    });
});

module.exports = router;