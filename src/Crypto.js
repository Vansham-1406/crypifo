import React,{useState,useEffect} from 'react'
import {useParams,useLocation } from 'react-router-dom'
import axios from 'axios';
import {round} from 'mathjs';


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import ReactHtmlParser from "react-html-parser";

import Footer from './footer'

function createData(
  name: string,
  calories: number,
) 
{
  return { name, calories };
}




const Crypto = () => {

  
  const [dat, setDat] = useState({})
  const [link, setLink] = useState([])
  const x = useParams().id;
  
  const q = new URLSearchParams(useLocation().search);
  const price = q.get("price");
  
  useEffect(() => {
    axios.get(`https://coinranking1.p.rapidapi.com/coin/${x}`,{
    params: {referenceCurrencyUuid: `${x}`, timePeriod: '24h'},
    headers: {
    'X-RapidAPI-Key': '7cf9598f86mshbf1d594046b0bbap174be7jsn287c463a1d1f',
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
  }
  })
  .then((response)=>{
    setDat(response.data.data.coin)
    setLink(response.data.data.coin.links)
  })
  .catch((error)=>{console.log('error', error)})
  }, [])

    const rows = [
      createData('Price to RS', `₹${price}`),
      createData('Rank', dat?.rank),
      createData('Market Cap',`${dat?.marketCap}`),
      createData('All-time-high(daily avg.)',`₹${dat?.allTimeHigh?.price*80}`)
    ];
  
    const cols = [
      createData('Number  Of Markets', `${dat?.numberOfMarkets}`),
      createData('Number Of Exchanges', dat?.numberOfExchanges),
      createData('Aprroved Supply',`${dat?.supply?.confirmed}` === "true" ? "Yes" : "No"),
      createData('Circulating Supply',`${dat?.supply?.circulating}`)
    ];
    
    console.log('dat', dat)

  return (

    <div>
    {
      useParams().id &&
      <div>
        <div className="mainNavBar">
          <div className="subPart">
            <div className="mainPage">
              <div className='cur'>
                <h2>{dat.name} (BTC) Price</h2>
                <p>{dat.name} live price in Indian Rupees (RS). View value statistics, market cap and supply.</p>
              </div>
              <div className='cur-table'>
                  <div className='cur-table1'>
                    <h3>{dat.name} value statistics</h3>
                    <p>An overview showing the statistics of {dat.name}, such as the base and quote currency, the rank, and trading volume.</p>
                    <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 200 }} aria-label="simple table">
                      <TableBody>
                        {
                        rows.map((row) => (
                          <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell component="th" scope="row">
                              {row.name}
                            </TableCell>
                            <TableCell align="right">{row.calories}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  </div>
                  <div className='cur-table2'>
                    <h3>Other Stats Info</h3>
                    <p>An overview showing the statistics of {dat.name}, such as the base and quote currency, the rank, and trading volume.</p>
                    <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 200 }} aria-label="simple table">
                      <TableBody>
                        {cols.map((row) => (
                          <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell component="th" scope="row">
                              {row.name}
                            </TableCell>
                            <TableCell align="right">{row.calories}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  </div>
              </div>
              <div className='info'>
                  <div className='info-dat'>
                    <h2>What is {dat.name}?</h2>
                      {ReactHtmlParser(dat.description)}
                  </div>
                  <div className='link'>
                    <h3>Ethereum Links</h3>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 500 }} aria-label="simple table">
                      <TableBody>
                        {
                        link.map((row,index) => (
                          <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell component="th" scope="row" ><span className="row1">{row.type}</span></TableCell>
                            <TableCell align="right"><a href={row.url} className="row2">{row.name}</a></TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  </div>
              </div>    
              <Footer/>
            </div>
          </div>
          </div>
      </div>

    }
    </div>
  )
}

export default Crypto