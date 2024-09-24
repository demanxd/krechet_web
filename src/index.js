import React from "react"
import * as ReactDOMClient from "react-dom/client"
// import App from "./app"
import Desk from "./js/desk/desk"
import "./css/main.css"

const app = ReactDOMClient.createRoot(document.getElementById("app"))

// console.log(Desk.state.tables)
app.render(<Desk />)