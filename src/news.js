import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import "./App.css";
import axios from "axios";
import Footer from "./footer";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import PersonIcon from "@mui/icons-material/Person";
import CloseIcon from "@mui/icons-material/Close";
import moment from "moment";

const News = () => {
  // const navigate = useNavigate();
  const [news, setNews] = useState([]);
  const [nav, setNav] = useState(true);

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
        setNews(response?.data?.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);

  return (
    <div>
      {useLocation().pathname === "/News" && (
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
              {nav ? (
                <MenuIcon className="font-awe" />
              ) : (
                <CloseIcon className="font-awe" />
              )}
            </div>
          </div>
          <div className={nav ? "navbar" : "navbar1"}>
            <h2>CRYPTO CURRENCY</h2>
            <ul>
              <li className="active">
                <Link to="/" className="tag">
                  <HomeIcon className="icon" />
                  Home
                </Link>
              </li>
              <li>
                <Link to="/Crypto" className="tag">
                  <ShowChartIcon className="icon" />
                  Crypto Currency
                </Link>
              </li>
              <li>
                <Link to="/News" className="tag">
                  <LightbulbIcon className="icon" />
                  News
                </Link>
              </li>
              <li>
                <Link to="/About" className="tag">
                  <PersonIcon className="icon" />
                  About
                </Link>
              </li>
            </ul>
          </div>
          <div className="subPart">
            <div className="mainPage">
              <div className="mainDibbi">
                {news.map((item, index) => (
                  <div key={index}>
                    <a href={item?.url}>
                      <div className="dibbi">
                        <div className="dibbi-text">
                          <h4>{item?.title}</h4>
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
                              {moment(item?.createdAt).format(
                                "ddd, DD MMM YYYY"
                              )}
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
      )}
    </div>
  );
};

export default News;
