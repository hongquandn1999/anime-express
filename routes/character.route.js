var express = require("express");
var router = express.Router();
var middlewareAuth = require("../middleware/auth.middleware");

var controller = require("../controllers/character.controller");
var middlewareValidate = require("../middleware/validate");

router.get("/", controller.index);

router.get("/search", controller.search);

router.get("/create", controller.createGet);

router.post("/create", middlewareValidate.validate, controller.createPost);

router.get("/:id", controller.view);

module.exports = router;