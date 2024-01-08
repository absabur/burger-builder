import React, { Component } from "react";
import Header from "./header/Header";
import BurgerBuilder from "./burgerBuilder/BurgerBuilder";
import { Navigate, Route, Routes } from "react-router-dom";
import Orders from "./orders/Orders.jsx";
import Checkout from "./orders/checkout/Checkout.jsx";
import Auth from "./auth/Auth.jsx";
import { connect } from "react-redux";
import { authCheck } from "../redux/authAction.js";
import Logout from "./auth/Logout.jsx";
import LoadingPage from "./loading/LoadingPage.jsx";

const mapStateToProps = (state) => {
  return {
    token: state.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    auth: () => dispatch(authCheck()),
  };
};


class Main extends Component {
  state = {
    loaded: false,
  }
  componentDidMount = () => {
    this.props.auth();
    this.setState({
      loaded: true,
    })
  }
  render() {
    let routes = null;
    if (this.props.token === null) {
      routes = (
        <Routes>
          <Route path="/login" element={<Auth />} />
          <Route path="/" element={<Navigate to="/burger-builder" />} />
          <Route path="/burger-builder" element={<BurgerBuilder />} />
          <Route path="*" element={<Navigate to="/"/>} />
        </Routes>
      );
    } else {
      routes = (
        <Routes>
          <Route path="/" element={<Navigate to="/burger-builder" />} />
          <Route path="/burger-builder" element={<BurgerBuilder />} />
          <Route path="/order" element={<Orders />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<Navigate to="/"/>} />
        </Routes>
      );
    }
    return (
      <div>
        <Header />
        {this.state.loaded && routes}
        {!this.state.loaded && <LoadingPage />}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
