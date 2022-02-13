import React, { useState, useEffect } from "react";
import axios from "axios";
import Global from "../Global";
import Article from "./Article";

const Articles = () => {
  const [articles, setArticles] = useState([]);

  const url = Global.url;

  useEffect(() => {
    getArticles();
    console.log(articles);
  }, [articles.length]);

  //Obtenemos todos los articulos
  const getArticles = () => {
    axios.get(url + "articles").then((res) => {
      setArticles(res.data.articles);
    });
  };
  //Eliminamos articulo por ID
  const delArticle = (id) => {
    const idArticle = articles[id]._id;
    axios.delete(url + "delete/" + idArticle).then((res) => {
      getArticles();
    });
  };
  return (
    <div className="publicaciones">
      <h1 className="mt-5">Articulos</h1>
      <div className="container">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-2">
          {articles.length > 0 ? (
            articles.map((article, i) => {
              return (
                <Article
                  key={i}
                  id={i}
                  articleData={article}
                  delArticle={delArticle}
                />
              );
            })
          ) : (
            <h3 className="mx-auto">No hay articulos que mostrar</h3>
          )}
        </div>
      </div>
    </div>
  );
};

export default Articles;
