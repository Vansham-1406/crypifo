import React, { useEffect, useState } from "react";
import { useLocation, useNavigate,Link } from "react-router-dom";
import "./App.css";
import axios from "axios";
import Footer from './footer';
import {round} from 'mathjs';
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from '@mui/icons-material/Home';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import PersonIcon from '@mui/icons-material/Person';

const Full = () => {
  const [coin, setCoin] = useState([]);
  const [search, setSearch] = useState("");
  const [tempSearch, setTempSearch] = useState([]);
  const [nav, setNav] = useState(true);

  const navigate = useNavigate();
  

  const apiFunc= ()=>{
    axios
      .get("https://coinranking1.p.rapidapi.com/coins", {
        params: {
          referenceCurrencyUuid: "yhjMzLPhuIDl",
          timePeriod: "24h",
          orderBy: "marketCap",
          orderDirection: "desc",
          limit: "100",
          offset: "0",
        },
        headers: {
          "X-RapidAPI-Key":
            "d00cef50edmshebd666b51e7e5e2p144803jsnebecc2a2481c",
          "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
        },
      })
      .then((response) => {
        setCoin(response.data.data.coins);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }

  useEffect(() => {
    apiFunc()
  }, []);


  return (
    <div>
      {useLocation().pathname === "/Crypto" && (
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
              <div className="inp">
                <input
                  type="text"
                  placeholder="Search Here"
                  className="mainInp"
                  onChange={(e) => {
                    if (e.target.value) {
                      const save = coin.filter((item)=> item.name.toLowerCase().includes(e.target.value.toLowerCase()))
                      setCoin(save)
                    }
                    else
                    {
                      apiFunc();
                    }
                  }}
                />
              </div>
              <div className="dabba">
                {tempSearch &&
                  coin.map((item) => (
                    <div
                      className="box"
                      key={item.uuid}
                      onClick={() => {
                        navigate(`/Crypto/${item.uuid}?price=${round(item.price*80,2)}`);
                      }}
                    >
                      <div className="top-box">
                        <h3>{item.name}</h3>
                        <img
                          src={item.iconUrl}
                          height="30px"
                          width={"30px"}
                          alt="Crypto Currency"
                          style={{ marginTop: "10px" }}
                        />
                      </div>
                      <div className="bottom-box">
                        <p>
                          <i>Price</i> : ₹{round(item.price*80,2)}
                        </p>
                        <p>
                          <i>Market Cap </i>: {item.marketCap}
                        </p>
                        <p>
                          <i>Daily Change</i> : {item.change}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
              <Footer/>
          </div>
        </div>
      )}
    </div>
  );
};

export default Full;
