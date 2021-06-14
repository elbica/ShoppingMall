import "./App.css"
import { BrowserRouter, Route } from "react-router-dom"
import Home from "./Pages/Home"
import Login from "./Pages/Login"
import Nav from "./Components/Nav"
import Board from "./Pages/Board"
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
        {/*
        <Route path="/product" exact component={Board} />
        <Route path="/cart" exact component={}></Route>
        <Route path="/manage" exact component={}></Route> 
        */}
      </div>
    </BrowserRouter>
  )
}

export default App
