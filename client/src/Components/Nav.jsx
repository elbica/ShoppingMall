import React from "react"
import { withRouter, Link, NavLink } from "react-router-dom"
import "../css/Nav.css"

export default function Nav(props) {
  return (
    <div className="nav_total">
      <div className="logo">
        <Link to="/">ELBI</Link>
        <span className="line"></span>
      </div>
      <div className="menu">
        <div className="control">
          {!props.Version ? (
            <NavLink to="/login" activeClassName="active" className="link">
              Login
            </NavLink>
          ) : (
            <NavLink to="/logout" activeClassName="active" className="link">
              Logout
            </NavLink>
          )}

          <NavLink to="/product" activeClassName="active" className="link">
            Product
          </NavLink>
          <NavLink to="/board/page1" activeClassName="active" className="link">
            {"Q&A"}
          </NavLink>
          <NavLink to="/profile" activeClassName="active" className="link">
            My Page
          </NavLink>
          <NavLink to="/cart" activeClassName="active" className="link">
            Cart
          </NavLink>
        </div>
      </div>
    </div>
  )
}
