import "./App.css"
import React, { useState, useEffect } from "react"
import { BrowserRouter, Route } from "react-router-dom"
import Home from "./Pages/Home"
import Login from "./Pages/Login"
import Nav from "./Components/Nav"
import Board from "./Pages/Board"
import Product from "./Pages/Product"
import ProductDetail from "./Pages/ProductDetail"
import Register from "./Pages/Register"
import BoardView from "./Pages/BoardView"
import Profile from "./Pages/Profile"
import Cart from "./Pages/Cart"
import Admin from "./Pages/Admin"
import axios from "axios"
import Write from "./Pages/write"
function App() {
  let [userState, setUserState] = useState({
    loginCheck: false,
    id: "",
    nickName: "",
  })
  // const changeState = (n, v) => {
  //   setUserState({ [n]: v })
  // }

  useEffect(async () => {
    axios
      .post("/")
      .then(res => {
        setUserState({
          id: res.data.id,
          nickName: res.data.nickName,
          loginCheck: res.data.loginCheck,
        })
        if (res.data.id) window.sessionStorage.setItem("id", res.data.id)
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
        <Route path="/product/:product_id" exact component={ProductDetail} />
        <Route path="/register" exact component={Register} />
        <Route
          path="/profile"
          exact
          render={props => <Profile array={userState} change={setUserState} {...props} />}
        />
        <Route path="/cart" exact render={props => <Cart array={userState} {...props} />} />
        <Route path="/admin" exact render={props => <Admin array={userState} {...props} />} />
        <Route
          path="/write"
          exact
          render={props =>
            <Write possible={userState.loginCheck} change={setUserState} {...props} />}
        />
        {/*
        <Route path="/cart" exact component={}></Route>
      */}
      </div>
    </BrowserRouter>
  )
}

export default App
