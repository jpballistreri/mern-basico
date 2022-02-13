"use strict";

const express = require("express");

const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const port = 3900;

const dotenv = require("dotenv");
dotenv.config();

const url = process.env.URL_MONGO_ATLAS;

mongoose.Promise = global.Promise;

var article_routes = require("./routes/article");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-Key, Origin, X-Requested-With, Content-type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-ControlAllow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

app.use("/api", article_routes);

mongoose.connect(url, { useNewUrlParser: true }).then(() => {
  console.log("Conexion a la bd realizada con exito");
  app.listen(port, () => {
    console.log("hola en el puerto " + port);
  });
});
