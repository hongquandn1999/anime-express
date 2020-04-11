var db = require("../db");
var shortId = require("shortid");
module.exports.login = function(req, res) {
    res.render("auth/login");
};

module.exports.postLogin = function(req, res) {
    var email = req.body.email;
    var password = req.body.password;

    var user = db.get("character").find({ email: email }).value();
    if (!user) {
        res.render("auth/login", {
            errors: ["User does not exist!"],
        });
        return;
    }

    if (user.password !== password) {
        res.render("auth/login", {
            errors: ["Wrong Password!!!"],
        });
        return;
    }

    res.cookie("userId", user.id);
    res.redirect("/character");
};