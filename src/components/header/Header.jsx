import React from "react";
import { Navbar, Nav, NavItem } from "reactstrap";
import { NavLink } from "react-router-dom";
import "./header.css";
import logo from "../../assets/logo.png";
import { connect } from "react-redux";
const mapStateToProps = (state) => {
  return {
    token: state.token,
  };
};

const Header = (props) => {
  let link = null;
  if (props.token === null) {
    link = (
      <Nav className="mr-md-5 m-auto">
        <NavItem>
          <NavLink className="NavLink" to="/burger-builder">
            Home
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/login">Log In</NavLink>
        </NavItem>
      </Nav>
    );
  } else {
    link = (
      <Nav className="mr-md-5 m-auto">
        <NavItem>
          <NavLink className="NavLink" to="/burger-builder">
            Home
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/order">Orders</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/logout">Logout</NavLink>
        </NavItem>
      </Nav>
    );
  }

  return (
    <div className="Navigation">
      <Navbar className="navbar">
        <NavLink className="m-auto ml-md-5 Brand" to="/">
          <img src={logo} alt="logo" className="logo" width={80} />
        </NavLink>
        {link}
      </Navbar>
    </div>
  );
};

export default connect(mapStateToProps)(Header);
