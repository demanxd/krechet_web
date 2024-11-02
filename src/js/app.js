import React from "react"
import { Route, Routes} from "react-router-dom"
import Desk from "./desk/desk"
import Authorizepage from "./auth/authorizepage"
import Login from "./auth/login"
import Register from "./auth/registration.js"
import { AuthProvider } from './context/AuthProvider.js';

export default function App() {
  return (
    <div>
        <AuthProvider>
            <Routes>
                <Route path="/" element={<Desk />} />
                <Route path="/auth2" element={<Authorizepage />} />
                <Route path="/auth" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </AuthProvider>
    </div>
  )
}