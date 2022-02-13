"use strict";

var express = require("express");
var Article = require("../controllers/article");

var router = express.Router();

router.post("/save", Article.save);

router.get("/articles", Article.getArticles);

router.delete("/delete/:id", Article.delete);

module.exports = router;
