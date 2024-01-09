import React from "react";
import Ingredient from "../ingredient/Ingredient";
import "./burger.css";

const Burger = (props) => {
  let ingredientArray = props.ingredients.map((item, index) => {
    return <Ingredient key={Math.random()} type={item.type} />;
  });
  ingredientArray.reverse();
  if (ingredientArray.length <= 0) {
    ingredientArray = (
      <h3
        style={{
          borderRadius: "5px",
          margin: "1rem 0",
          background: "rgba(0,0,0,0.5)",
          padding: "3px",
          color: "white",
        }}
      >
        Add Some Ingredient!
      </h3>
    );
  }
  return (
    <div className="burger">
      <div className="topBread">
        <Ingredient type="bread-top" />
      </div>
      <div className="fakediv"></div>
      {ingredientArray}
      <div className="fakediv"></div>
      <div className="bottomBread">
        <Ingredient type="bread-bottom" />
      </div>
    </div>
  );
};

export default Burger;
