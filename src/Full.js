import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import axios from "axios";
import Footer from './footer';
import {round} from 'mathjs';

const Full = () => {
  const [coin, setCoin] = useState([]);
  const [search, setSearch] = useState("");
  const [tempSearch, setTempSearch] = useState([]);

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
              <Footer/>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Full;
