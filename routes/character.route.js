var express = require("express");
var router = express.Router();

var db = require("../db");

var controller = require("../controllers/character.controller");

router.get("/", controller.index);

router.get("/search", controller.search);

router.get("/create", controller.createGet);

router.post("/create", controller.createPost);

router.get("/:id", controller.view);

module.exports = router;