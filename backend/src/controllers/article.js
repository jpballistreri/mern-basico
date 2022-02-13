"use strict";

var Article = require("../models/article");

var controller = {
  //Metodo guardar un articulo
  save: (req, res) => {
    var params = req.body;
    var article = new Article();
    //Asignamos valores
    article.title = params.title;
    article.content = params.content;
    article.author = params.author;
    //Guardar articulo
    article.save((err, articleStored) => {
      if (err || !articleStored) {
        return res.status(404).send({
          status: "error",
          message: "El articulo no se ha guardado",
        });
      }
      return res.status(200).send({
        status: "success",
        articleStored,
      });
    });
  },
  //Metodo para listar articulos
  getArticles: (req, res) => {
    var query = Article.find({});
    query.sort("-date").exec((err, articles) => {
      if (err) {
        return res.status(500).send({
          status: "error",
          message: "Error al extraer los datos",
        });
      }
      if (!articles) {
        return res.status(404).send({
          staus: "error",
          message: "No hay articulos para mostrar",
        });
      }
      return res.status(200).send({
        status: "success",
        articles,
      });
    });
  },
  //Metodo para eliminar articulo
  delete: (req, res) => {
    var articleId = req.params.id;
    console.log(articleId);
    Article.findOneAndDelete({ _id: articleId }, (err, articleRemoved) => {
      if (err) {
        return res.status(500).send({
          status: "error",
          message: "Error al eliminar un articulo",
        });
      }
      if (!articleRemoved) {
        return res.status(404).send({
          status: "Error",
          message: "No se ha encontrado el articulo a eliminar",
        });
      }
      return res.status(200).send({
        status: "success",
        article: articleRemoved,
      });
    });
  },
};

module.exports = controller;
