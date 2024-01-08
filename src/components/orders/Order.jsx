import React, { useState } from "react";
import Burger from "../burgerBuilder/burger/Burger";
import { Modal, ModalHeader } from "reactstrap";

const Order = ({ order }) => {
  const [modal, setmodal] = useState(false);
  let b = [];

  order.ingredients.forEach((item) => {
    let existingItem = b.find((i) => i.type === item.type);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      b.push({ type: item.type, quantity: 1 });
    }
  });

  return (
    <div
      style={{
        margin: "1rem 0",
        boxShadow: "0 0 5px black",
        padding: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        height: "300px",
      }}
    >
      <div>
        <p>Order Id: {order.id}</p>
        <p>Order Time: {order.orderTime}</p>
        <div
          style={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            justifyContent: "space-around",
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              padding: "5px",
              border: "1px solid black",
              borderRadius: "5px",
              margin: "2px",
            }}
          >
            1x BUN
          </span>
          {b.map((item, index) => {
            return (
              <span
                style={{
                  padding: "5px",
                  border: "1px solid black",
                  borderRadius: "5px",
                  margin: "2px",
                }}
                key={index}
              >
                {item.quantity}x {item.type.toUpperCase()}
              </span>
            );
          })}
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-around",
            padding: "10px",
          }}
        >
          <p>
            <strong>Price: {order.price}</strong>
          </p>
          <button
            onClick={() => setmodal(true)}
            className="btn"
            style={{ boxShadow: "0 0 5px black", background: "tomato", color:"white", fontWeight: "600" }}
          >
            See Preview
          </button>
        </div>
      </div>
      <Modal isOpen={modal}>
        <ModalHeader onClick={() => setmodal(false)}>Order Id: {order.id}</ModalHeader>
        <div style={{ padding: "10px" }}>
          <Burger ingredients={order.ingredients} />
        </div>
        <button
          onClick={() => setmodal(false)}
          className="btn btn-dark form-control"
          style={{ boxShadow: "0 0 5px black" }}
        >
          Close Preview
        </button>
      </Modal>
    </div>
  );
};

export default Order;
