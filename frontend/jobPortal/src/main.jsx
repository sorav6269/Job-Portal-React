import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { createContext } from 'react'

export const Context = createContext({
  isAuthorized:false,
})

const AppWrapper = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [user, setUser] = useState({});
  return (
    <Context.Provider value={{ isAuthorized, setIsAuthorized, user, setUser }}>
    <App/>
    </Context.Provider>
  )
}
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AppWrapper />

  </BrowserRouter>
);
