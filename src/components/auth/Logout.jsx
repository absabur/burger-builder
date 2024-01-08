import React, { Component } from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { logout } from "../../redux/authAction";
import { Modal } from "reactstrap";

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
  };
};

export class Logout extends Component {
  state = {
    modal: true,
    navigate: false,
  };

  logout = () => {
    this.props.logout();
    this.setState({
      modal: false,
      navigate: true,
    });
  };

  nologout = () => {
    this.setState({
      modal: false,
      navigate: true,
    });
  };
  render() {
    return (
      <div className="container">
        <Modal isOpen={this.state.modal}>
          <h1 style={{ textAlign: "center" }}>Are You Sure To Logout?</h1>
          <div
            style={{
              padding: "1rem",
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <button
              className="btn btn-info"
              style={{ width: "40%" }}
              onClick={this.nologout}
            >
              No
            </button>
            <button
              className="btn btn-danger"
              style={{ width: "40%" }}
              onClick={this.logout}
            >
              Yes
            </button>
          </div>
        </Modal>
        {this.state.navigate && <Navigate replace to="/" />}
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(Logout);
