module.exports.validate = function(req, res, next) {
    var errors = [];
    if (!req.body.name) {
        errors.push("Name is required !!!");
    }
    if (!req.body.age) {
        errors.push("Age is required");
    }
    if (!req.body.anime) {
        errors.push("Anime is required");
    }
    if (errors.length) {
        res.render("character/create", {
            error: errors,
        });
        return;
    }
    next();
};