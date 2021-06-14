import "./App.css"
import React, { useState, useEffect } from "react"
import { BrowserRouter, Route } from "react-router-dom"
import Home from "./Pages/Home"
import Login from "./Pages/Login"
import Nav from "./Components/Nav"
import Board from "./Pages/Board"
import Product from "./Pages/Product"
import Register from "./Pages/Register"
import BoardView from "./Pages/BoardView"
import Profile from "./Pages/Profile"
function App() {
  let [userState, setUserState] = useState({
    loginCheck: true,
    id: "tesdfs",
    nickName: "dfs",
  })
  const changeState = (n, v) => {
    setUserState({ [n]: v })
  }
  return (
    <BrowserRouter>
      <div className="App">
        <div className="nav">
          <Nav Version={userState.loginCheck} />
        </div>

        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/board/:page" exact component={Board} />
        <Route path="/board/:page/:id" exact component={BoardView} />
        <Route path="/product" exact component={Product} />
        <Route path="/register" exact component={Register} />
        <Route path="/profile" exact render={props => <Profile array={userState} {...props} />} />
        {/*
        <Route path="/cart" exact component={}></Route>
      <Route path="/admin" exact component={}></Route> 
      */}
      </div>
    </BrowserRouter>
  )
}

export default App
