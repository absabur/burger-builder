import React from "react";
import Ingredient from "../ingredient/Ingredient";
import "./burger.css";

const Burger = (props) => {
  let ingredientArray = props.ingredients.map((item, index) => {
    return <Ingredient key={Math.random()} type={item.type} />;
  });
  ingredientArray.reverse();
  if (ingredientArray.length <= 0) {
    ingredientArray = <h3>Add Some Ingredient!</h3>;
  }
  return (
    <div className="burger">
      <Ingredient type="bread-top" />
      {ingredientArray}
      <Ingredient type="bread-bottom" />
    </div>
  );
};

export default Burger;
