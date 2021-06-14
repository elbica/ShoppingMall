import "./App.css"
import { BrowserRouter, Route } from "react-router-dom"
import Home from "./Pages/Home"
import Login from "./Pages/Login"
import Nav from "./Components/Nav"
import Board from "./Pages/Board"
import Product from "./Pages/Product"
import Register from "./Pages/Register"
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div className="nav">
          <Nav Version={false} />
        </div>

        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/board/:page" exact component={Board} />
        <Route path="/product" exact component={Product} />
        <Route path="/register" exact component={Register} />
        {/*
        <Route path="/cart" exact component={}></Route>
      <Route path="/admin" exact component={}></Route> 
      <Route path="/profile" exact component={}></Route> 
      */}
      </div>
    </BrowserRouter>
  )
}

export default App
