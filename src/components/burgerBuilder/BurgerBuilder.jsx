import React, { Component } from "react";
import Burger from "./burger/Burger";
import Controls from "./controls/Controls";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Button,
  Alert,
} from "reactstrap";
import Summary from "./summary/Summary";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import {
  addIngredient,
  removeIngredient,
  handleCheckOut,
  resetIngredient,
} from "../../redux/action";
import { authCheck } from "../../redux/authAction";

const mapStateToProps = (state) => {
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice,
    ingredPrice: state.ingredPrice,
    checkout: state.checkout,
    userId: state.userId,
    maxLimit: state.maxLimit,
  };
};

const mapDispatcherToProps = (dispatch) => {
  return {
    addIngredient: (ingredient) => dispatch(addIngredient(ingredient)),
    removeIngredient: (ingredient) => dispatch(removeIngredient(ingredient)),
    handleCheckOut: () => dispatch(handleCheckOut()),
    resetIngredient: () => dispatch(resetIngredient()),
    authCheck: () => dispatch(authCheck()),
  };
};

export class BurgerBuilder extends Component {
  state = {
    modalOpen: false,
  };

  modalToggle = () => {
    this.setState({ modalOpen: !this.state.modalOpen });
  };
  render() {
    let alert = null;
    if (this.props.maxLimit) {
      alert = (
        <Alert style={{ textAlign: "center" }} color="danger">
          {this.props.maxLimit}
        </Alert>
      );
    }
    return (
      <>
        {alert}
        <h1 style={{ width: "100%", textAlign: "center" }}>Build a burger</h1>
        <div className="container d-flex flex-md-row flex-column">
          <Burger ingredients={this.props.ingredients} />
          <Controls
            add={this.props.addIngredient}
            remove={this.props.removeIngredient}
            reset={this.props.resetIngredient}
            totalPrice={this.props.totalPrice}
            toggle={this.modalToggle}
            disable={this.props.ingredients.length === 0}
          />
        </div>
        <Modal isOpen={this.state.modalOpen}>
          <ModalHeader
            tag={"h3"}
            toggle={() => this.setState({ modalOpen: !this.state.modalOpen })}
          >
            Your Order
          </ModalHeader>
          <ModalBody style={{zIndex:"0"}}>
            <Summary
              ingredPrice={this.props.ingredPrice}
              ingredients={this.props.ingredients}
            />
            <h5 style={{ textAlign: "right", fontSize: "28px" }}>
              Total Price: <strong>{this.props.totalPrice.toFixed(0)}</strong>{" "}
              BDT
            </h5>
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={this.props.handleCheckOut}
              style={{
                background: "tomato",
                color: "white",
                fontWeight: "700",
              }}
            >
              Continue Shopping
            </Button>
            <Button color="danger" onClick={this.modalToggle}>
              Cancel
            </Button>
          </ModalFooter>
          {this.state.modalOpen && !this.props.userId && (
            <Navigate to="/login" replace />
          )}
          {this.props.checkout && <Navigate to="/checkout" replace />}
        </Modal>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatcherToProps)(BurgerBuilder);
