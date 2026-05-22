import { useEffect, useState } from "react";
import { getNews } from "../../api/external";
import style from "./Home.module.css";
import Loader from "../../commponents/Loader/Loader";

function Home() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    (async function newApiCall() {
      const response = await getNews();

      //   console.log("Articles", response) // TEST POINT
      setArticles(response);
    })();
    setArticles([]);
  }, []);

  const handleCardClick = (url) => {
    window.open(url, '_blank')
  }
    if(articles.length === 0){
        return <Loader text= "homepage"/>
    }
  return (
    <div className={style.main}>
      <div className={style.header}>Latest Articles</div>
      <div className={style.grid}>
        {articles.map((article, i) => (
          <div
            className={style.card}
            key={article.url}
            onClick={() => handleCardClick(article.url)}
          >
            <img src={article.urlToImage} alt={article.title} />
            <h3>{article.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Home;
