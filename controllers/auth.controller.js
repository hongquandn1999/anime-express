var md5 = require("md5");
var db = require("../db");

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

    var hashedPassword = md5(password);

    if (user.password !== hashedPassword) {
        res.render("auth/login", {
            errors: ["Wrong Password!!!"],
        });
        return;
    }

    res.cookie("userId", user.id);
    res.redirect("/character");
};