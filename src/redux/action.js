import axios from "axios";
import * as constance from "./constance";

export const addIngredient = (ingredient) => {
  return {
    type: constance.ADD_INGREDIENT,
    payload: ingredient,
  };
};

export const removeIngredient = (ingredient) => {
  return {
    type: constance.REMOVE_INGREDIENT,
    payload: ingredient,
  };
};

export const resetIngredient = () => {
  return {
    type: constance.RESET,
  };
};


export const checkOut = () => {
  return {
    type: "checkOut",
  };
};

export const handleCheckOut = () => {
  return {
    type: constance.CHECKOUT,
  };
};

export const loadOrders = (orders) => {
  return {
    type: constance.LOADORDERS,
    payload: orders,
  };
}
export const orderLoadFailed = (err) => {
  return {
    type: constance.ORDERLOADFAILED,
    payload: err,
  };
}

export const fetchOrders = (token, userId) => dispatch => {
  const query = '&orderBy="userId"&equalTo="'+userId+'"'
  axios.get('https://bruger-builder-b7983-default-rtdb.firebaseio.com/orders.json?auth='+token+query)
  .then(res => dispatch(loadOrders(res.data)))
  .catch(err => {
    console.log(err.response.data);
    dispatch(orderLoadFailed(err.message))
  })
}