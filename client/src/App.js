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
import axios from "axios"
function App() {
  let [userState, setUserState] = useState({
    loginCheck: false,
    id: "",
    nickName: "",
  })
  // const changeState = (n, v) => {
  //   setUserState({ [n]: v })
  // }
  useEffect(() => {
    axios
      .post("/")
      .then(res => {
        setUserState({
          id: res.data.id,
          nickName: res.data.nickName,
          loginCheck: res.data.loginCheck,
        })
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  return (
    <BrowserRouter>
      <div className="App">
        <div className="nav">
          <Nav Version={userState.loginCheck} />
        </div>

        <Route path="/" exact component={Home} />
        <Route path="/login" exact render={() => <Login change={setUserState} />} />
        <Route path="/board/:page" exact component={Board} />
        <Route path="/board/:page/:id" exact component={BoardView} />
        <Route path="/product" exact component={Product} />
        <Route path="/register" exact component={Register} />
        <Route
          path="/profile"
          exact
          render={props => <Profile array={userState} change={setUserState} {...props} />}
        />
        {/*
        <Route path="/cart" exact component={}></Route>
      <Route path="/admin" exact component={}></Route> 
      */}
      </div>
    </BrowserRouter>
  )
}

export default App
