import React from "react"
import * as ReactDOMClient from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import App from "./js/app"
import "./css/main.css"

const app = ReactDOMClient.createRoot(document.getElementById("app"))
app.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.querySelector("#root")
)