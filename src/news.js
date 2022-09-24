import React,{useState,useEffect} from "react";
import { useLocation,Link} from "react-router-dom";
import "./App.css";
import axios from "axios";
import Footer from './footer';
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from '@mui/icons-material/Home';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import PersonIcon from '@mui/icons-material/Person';

const News = () => {
  // const navigate = useNavigate();
  const [news, setNews] = useState([])
  const [nav, setNav] = useState(true);

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
              <MenuIcon style={{ fontSize: "40px" }} />
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
                      <p className='dibbi-para'>{item.description.split('',200).join('').trim()}...</p>
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
            </div>
              <Footer/>
          </div>
        </div>
      )}
    </div>
  );
};

export default News;
