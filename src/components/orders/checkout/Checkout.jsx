import axios from "axios";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { Button, Modal, ModalBody } from "reactstrap";
import LoadingPage from "../../loading/LoadingPage";
import { fetchOrders, resetIngredient, checkOut } from "../../../redux/action";

const mapStateToProps = (state) => {
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice,
    checkout: state.checkout,
    userId: state.userId,
    token: state.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    resetIngredient: () => dispatch(resetIngredient()),
    getOrders: (token, userId) => dispatch(fetchOrders(token, userId)),
    checkOut: () => dispatch(checkOut()),
  };
}

class Checkout extends Component {
  state = {
    values: {
      delivaryAddress: "",
      phone: "",
      paymentType: "cod",
    },
    goback: false,
    isLoading: false,
    modalOpen: false,
    modalMessage: "",
  };
  goback = () => {
    this.setState({
      goback: true,
    });
    this.props.checkOut();
  };
  handleChange = (e) => {
    this.setState({
      values: {
        ...this.state.values,
        [e.target.name]: e.target.value,
      },
    });
  };
  handleSubmit = (e) => {
    this.setState({
      isLoading: true,
    });
    e.preventDefault();
    const order = {
      ingredients: this.props.ingredients,
      customer: this.state.values,
      price: this.props.totalPrice,
      orderTime: new Date(),
      userId: this.props.userId,
    };
    axios
      .post(
        "https://bruger-builder-b7983-default-rtdb.firebaseio.com/orders.json?auth="+this.props.token,
        order
      )
      .then((res) => {
        if (res.status === 200) {
          this.props.resetIngredient()
          this.setState({
            isLoading: false,
            modalOpen: true,
            modalMessage: "Your order has been placed successfully!",
          });
          this.props.getOrders(this.props.token, this.props.userId)
        }else {
          this.setState({
            isLoading: false,
            modalOpen: true,
            modalMessage: "Unable to place order, please try again later!",
          });
        }
      })
      .catch((err) => {
        this.setState({
          isLoading: false,
          modalOpen: true,
          modalMessage: "Unable to place order"+err.message,
        });
      });
  };
  render() {
    return (
      <div className="container">
        {(!this.props.checkout || this.state.goback) && (
          <Navigate to="/" replace />
        )}
        {this.state.isLoading ? (
          <LoadingPage />
        ) : (
          <>
            <h1 style={{ textAlign: "center" }} className="mb-4">
              Address
            </h1>
            <form
              onSubmit={this.handleSubmit}
              className="mb-5 p-4"
              style={{ textAlign: "right", boxShadow: "0 0 5px #888888" }}
            >
              <textarea
                onChange={(e) => this.handleChange(e)}
                placeholder="Enter Full Address"
                className="form-control"
                name="delivaryAddress"
                value={this.state.values.delivaryAddress}
              ></textarea>
              <br />
              <input
                onChange={(e) => this.handleChange(e)}
                className="form-control"
                placeholder="Enter Phone Number"
                type="text"
                name="phone"
                value={this.state.values.phone}
              />
              <br />
              <select
                onChange={(e) => this.handleChange(e)}
                className="form-control"
                name="paymentType"
                value={this.state.values.paymentType}
              >
                <option value="cod">Cash On Delivary</option>
                <option value="bkash">Bkash</option>
                <option value="rocket">Rocket</option>
                <option value="nagad">Nagad</option>
              </select>
              <br />
              <br />
              <h3>Amount to pay: {this.props.totalPrice} BDT</h3>
              <br />
              <br />
              <Button className="btn-gray" onClick={this.goback}>
                Cancel
              </Button>
              <Button
                style={{ background: "tomato", margin: " 0 1rem" }}
                type="submit"
              >
                Place Order
              </Button>
            </form>
          </>
        )}
        <Modal isOpen={this.state.modalOpen}>
          <ModalBody>
            {this.state.modalMessage}
          </ModalBody>
          <Button color="primary" onClick={this.goback}>
            Close
          </Button>
        </Modal>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
