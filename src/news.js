import React,{useState,useEffect} from "react";
import { useLocation} from "react-router-dom";
import "./App.css";
import axios from "axios";
import Footer from './footer';

const News = () => {
  // const navigate = useNavigate();
  const [news, setNews] = useState([])

  useEffect(() => {
    axios
    .get("https://bing-news-search1.p.rapidapi.com/news/search", {
      params: {
        q: "cryptocurrency",
        count: "15",
        freshness: "Day",
        textFormat: "Raw",
        safeSearch: "Off",
      },
      headers: {
        "X-BingApis-SDK": "true",
        "X-RapidAPI-Key":
          "d00cef50edmshebd666b51e7e5e2p144803jsnebecc2a2481c",
        "X-RapidAPI-Host": "bing-news-search1.p.rapidapi.com",
      },
    })
    .then((response) => {
      setNews(response.data.value);
    })
    .catch((error) => {
      console.log("error", error);
    });
  }, [])

  console.log('news', news)
  return (
    <div>
      {useLocation().pathname === "/News" && (
        <div className="mainNavBar">
          <div className="subPart">
            <div className="mainPage">
            <div className='mainDibbi'>
              {
                news.map((item)=>(
                    <div>
                    <a href={item.url}>
                  <div className='dibbi'>
                    <div className='dibbi-text'>
                      <h4>{item.name}</h4>
                      <img src={item?.image?.thumbnail?.contentUrl} height="100px" width={"100px"} alt="author"/>
                    </div>
                    <div>
                      <p className='dibbi-para'>{item.description}</p>
                    </div>
                    <div className='author'>
                      <img src={item?.provider[0]?.image?.thumbnail?.contentUrl} alt="Author" height={"40px"} width="40px"/>
                      <p><b>{item.provider[0].name}</b></p>
                    </div>
                  </div>
                  </a>
                  </div>
                ))
              }
              </div>
              <Footer/>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default News;
