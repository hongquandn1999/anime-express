var db = require("../db");
var shortId = require("shortid");
module.exports.index = function(req, res) {
    res.render("character/index", {
        characters: db.get("character").value(),
    });
};

module.exports.search = function(req, res) {
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
};

module.exports.createGet = function(req, res) {
    res.render("character/create", {
        values: req.body,
    });
};

module.exports.createPost = function(req, res) {
    req.body.id = shortId.generate();

    db.get("character").push(req.body).write();
    res.redirect("/character");
};

module.exports.view = function(req, res) {
    var id = req.params.id;

    var character = db.get("character").find({ id: id }).value();
    res.render("character/view", {
        character: character,
    });
};