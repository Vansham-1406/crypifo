import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import axios from "axios";
import Footer from "./footer";
import { round } from "mathjs";
import "./responsive.css";
import MenuIcon from '@mui/icons-material/Menu';
import Brow from './brow'

const App = () => {
  const [coin, setCoin] = useState([]);
  const [stats, setStats] = useState({});
  const [news, setNews] = useState([]);

  const [nav, setNav] = useState(true)

  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("https://coinranking1.p.rapidapi.com/coins", {
        params: {
          referenceCurrencyUuid: "yhjMzLPhuIDl",
          timePeriod: "24h",
          orderBy: "marketCap",
          orderDirection: "desc",
          limit: "10",
          offset: "0",
        },
        headers: {
          "X-RapidAPI-Key":
            "7cf9598f86mshbf1d594046b0bbap174be7jsn287c463a1d1f",
          "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
        },
      })
      .then((response) => {
        setCoin(response.data.data.coins);
        setStats(response.data.data.stats);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("https://bing-news-search1.p.rapidapi.com/news/search", {
        params: {
          q: "cryptocurrency",
          count: "6",
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
  }, []);
  <Brow nav={nav}/>

  return (
    <div>
      <div className="mainNavBar">
        <div className="subPart">
          <div className="nav-mob">
            <div>
              <h1>CryptoCurrencies</h1>
            </div>
            <div className="icon" 
            onClick={()=>{
              setNav(!nav)
            }}>
              <MenuIcon style={{ fontSize: "40px" }} />
            </div>
          </div>
          <div className="mainPage">
            <h1>Global Crypto Currency Stats</h1>
            <div className="mainPage-sub">
              <div className="mainPage-box">
                <h3>Total CryptoCurrencies</h3>
                <p>{stats && stats.total}</p>
              </div>
              <div className="mainPage-box">
                <h3>Total Exchanges</h3>
                <p>{stats.totalExchanges}</p>
              </div>
              <div className="mainPage-box">
                <h3>Total Market Cap</h3>
                <p>1T</p>
              </div>
              <div className="mainPage-box">
                <h3>Total 24H Volume</h3>
                <p>67.6B</p>
              </div>
              <div className="mainPage-box">
                <h3>Total Markets</h3>
                <p>{stats.totalMarkets}</p>
              </div>
            </div>
            <div className="mainPage-cry">
              <h1>Top 10 Crypto Currencies</h1>
              <h3
                onClick={() => {
                  navigate("/Crypto");
                }}
              >
                Show More
              </h3>
            </div>
            <div className="dabba">
              {coin.map((item) => (
                <div
                  className="box"
                  key={item.id}
                  onClick={() => {
                    navigate(
                      `/Crypto/${item.uuid}?price=${round(item.price * 80, 2)}`
                    );
                  }}
                >
                  <div className="top-box">
                    <h3>{item.name}</h3>
                    <img
                      src={item.iconUrl}
                      height="50px"
                      width={"50px"}
                      alt="Crypto Currency"
                    />
                  </div>
                  <div className="bottom-box">
                    <p>
                      <i>Price</i> : ₹{round(item.price * 80, 2)}
                    </p>
                    <p>
                      <i>Market Cap </i>: {item.marketCap}
                    </p>
                    <p>
                      <i>Daily Change</i> : {item.change}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mainPage-cry">
              <h1>Latest Crypto News</h1>
              <h3
                onClick={() => {
                  navigate("/News");
                }}
              >
                Show More
              </h3>
            </div>
            <div className="mainDibbi">
              {news.map((item) => (
                <div>
                  <a href={item.url}>
                    <div className="dibbi">
                      <div className="dibbi-text">
                        <h4>{item.name}</h4>
                        <img
                          src={item?.image?.thumbnail?.contentUrl}
                          height="100px"
                          width={"100px"}
                          alt="author"
                        />
                      </div>
                      <div>
                        <p className="dibbi-para">{item.description}</p>
                      </div>
                      <div className="author">
                        <img
                          src={item?.provider[0]?.image?.thumbnail?.contentUrl}
                          alt="Author"
                          height={"40px"}
                          width="40px"
                        />
                        <p>
                          <b>{item.provider[0].name}</b>
                        </p>
                      </div>
                    </div>
                  </a>
                </div>
              ))}
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
