import React from 'react';
import {render} from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Brow from './brow';
// import Test from './test'
// import Mui from './mui/Mui'
// import {ThemeProvider,createTheme} from "@material-ui/core";


// const theme = createTheme({
//   palette:{
//     primary:{
//       main:"#03f6cb"
//     },
//     secondary:{
//       main:"#ffa500"
//     }
//   }
// })

render(
  <BrowserRouter>
    <Brow/>
  </BrowserRouter>
  // <ThemeProvider theme={theme}>
  //   <Mui/>
  // </ThemeProvider>
  ,document.getElementById('root'))