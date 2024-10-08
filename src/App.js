import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {Link } from 'react-router-dom';
import "./App.css";
import axios from "axios";
import Footer from "./footer";
import { round } from "mathjs";
import "./responsive.css";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from '@mui/icons-material/Home';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import PersonIcon from '@mui/icons-material/Person';
import CloseIcon from '@mui/icons-material/Close';
import moment from 'moment';

const App = () => {
  const [coin, setCoin] = useState([]);
  const [stats, setStats] = useState({});
  const [news, setNews] = useState([]);

  const [nav, setNav] = useState(true);

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
      .get("https://cryptocurrency-news2.p.rapidapi.com/v1/coindesk", {
        headers: {
          "X-RapidAPI-Key":
            "7cf9598f86mshbf1d594046b0bbap174be7jsn287c463a1d1f",
          "X-RapidAPI-Host": "cryptocurrency-news2.p.rapidapi.com",
        },
      })
      .then((response) => {
        const newsData = response?.data?.data;
        if (newsData && newsData.length > 0) {
          setNews(newsData.slice(0, 6));
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);

  return (
    <div>
      <div className="mainNavBar">
          <div className="nav-mob">
            <div>
              <h1>CryptoCurrencies</h1>
            </div>
            <div
              className="icon"
              onClick={() => {
                setNav(!nav);
              }}
            >
              {
                nav ? 
                  <MenuIcon className="font-awe" />
                  :
                  <CloseIcon className="font-awe"/>
              }
            </div>
          </div>
        <div className={nav ? "navbar" : "navbar1"}>
            <h2>CRYPTO CURRENCY</h2>
            <ul>
              <li className='active'><Link to="/" className='tag'><HomeIcon className='icon'/>Home</Link></li>
              <li><Link to="/Crypto" className='tag'><ShowChartIcon className='icon'/>Crypto Currency</Link></li>
              <li><Link to="/News" className='tag'><LightbulbIcon className='icon'/>News</Link></li>
              <li><Link to="/About" className='tag'><PersonIcon className='icon'/>About</Link></li>
            </ul>
        </div>
        <div className="subPart">
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
              <h2>Top 10 Crypto Currencies</h2>
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
              <h2>Latest Crypto News</h2>
              <h3
                onClick={() => {
                  navigate("/News");
                }}
              >
                Show More
              </h3>
            </div>
            <div className="mainDibbi1">
              {
              news.map((item,index) => (
                <div key={index}>
                  <a href={item?.url}>
                    <div className="dibbi">
                      <div className="dibbi-text">
                        <h4>
                          {item?.title}
                        </h4>
                        <img
                          src={item?.thumbnail}
                          height="100px"
                          width={"100px"}
                          alt="author"
                        />
                      </div>
                      <div>
                        <p className="dibbi-para">
                          {item.description.split("", 140).join("").trim()}...
                        </p>
                      </div>
                      <div className="author">
                        <p>
                          <b>
                            {moment(item?.createdAt).format('ddd, DD MMM YYYY')}
                          </b>
                        </p>
                      </div>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>
            <Footer />
        </div>
      </div>
    </div>
  );
};

export default App;
