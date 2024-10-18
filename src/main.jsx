import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {createTheme, ThemeProvider} from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: '#e61d1d'
    }
  },
  // components: {
  //   MuiSwitch: {
  //     styleOverrides: {
  //       switchBase: {
  //         // Controls default (unchecked) color for the thumb
  //         color: "#fff"
  //       },
  //       colorPrimary: {
  //         "&.Mui-checked": {
  //           // Controls checked color for the thumb
  //           color: "#fcf2f2"
  //         }
  //       },
  //       track: {
  //         // Controls default (unchecked) color for the track
  //         opacity: 0.2,
  //         backgroundColor: "#fff",
  //         ".Mui-checked.Mui-checked + &": {
  //           // Controls checked color for the track
  //           opacity: 0.7,
  //           backgroundColor: "#fff"
  //         }
  //       }
  //     }
  //   }
  // }
});


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App/>
    </ThemeProvider>
  </React.StrictMode>,
)
