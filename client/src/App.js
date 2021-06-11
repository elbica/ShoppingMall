import "./App.css"
import { BrowserRouter, Route } from "react-router-dom"
import Home from "./Pages/Home"
import Nav from "./Components/Nav"
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div className="nav">
          <Nav Version={false} />
        </div>

        <Route path="/" exact component={Home} />
        {/* <Route path="/product" exact component={}></Route>
        <Route path="/login" exact component={}></Route>
        <Route path="/cart" exact component={}></Route>
        <Route path="/board" exact component={}></Route>
        <Route path="/manage" exact component={}></Route> */}
      </div>
    </BrowserRouter>
  )
}

export default App
