var db = require("../db");

module.exports.authLogin = function(req, res, next) {
    if (!req.signedCookies.userId) {
        res.redirect("/auth/login");
        return;
    }
    var user = db.get("character").find({ id: req.signedCookies.userId }).value();
    if (!user) {
        res.redirect("/auth/login");
        return;
    }
    res.locals.character = user;
    next();
};