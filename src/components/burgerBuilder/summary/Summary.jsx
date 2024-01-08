import React from "react";
import Burger from "../burger/Burger";
import './summary.css'

const Summary = (props) => {
  let b = [];

  props.ingredients.forEach((item) => {
    let existingItem = b.find((i) => i.type === item.type);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      b.push({ type: item.type, quantity: 1 });
    }
  });

  let summary = b.map((item, index) => {
    return (
        <tr key={index}>
            <td>{item.type.toUpperCase()}</td>
            <td>{item.quantity}</td>
            <td>{props.ingredPrice[item.type]}</td>
            <td>{item.quantity * props.ingredPrice[item.type]} BDT</td>
        </tr>
    );
  });

  return (
    <div>
      <Burger ingredients={props.ingredients} />
      <table style={{width: "100%", margin: "1rem 0"}}>
        <thead>
          <tr>
            <th>Item</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>BUN</th>
            <th>1</th>
            <th>80</th>
            <th>80 BDT</th>
          </tr>
          {summary}
        </tbody>
      </table>
    </div>
  );
};

export default Summary;
