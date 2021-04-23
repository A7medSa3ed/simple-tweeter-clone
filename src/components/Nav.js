import React from "react";
import { NavLink } from "react-router-dom";
const Nav = () => {
  return (
    <nav className="nav">
      <ul>
        <li>
          <NavLink exact to="/" activeClassName="active">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/new" activeClassName="active">
            New Tweet
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
