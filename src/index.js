import React from "react"
import ReactDOM from "react-dom"

// Components
import App from "./App"

// Libraries
import { CssBaseline } from "@mui/material"
import { BrowserRouter } from "react-router-dom"

//Redux TKit
import { store } from './app/store'
import { Provider } from 'react-redux'



ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <CssBaseline />
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
)