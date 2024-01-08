import * as constance from "./constance";
const initialState = {
  ingredients: [],
  maxLimit: null,
  totalPrice: 80,
  checkout: false,
  ingredPrice: {
    cucumber: 20,
    cheese: 60,
    meat: 120,
    onion: 15,
    tomato: 25,
    vegitable: 30,
  },
  orders: [],
  orderLoadErrorMessage: "",
  orderLoading: true,
  token: null,
  userId: null,
  authLoading: false,
  authError: null,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case constance.ADD_INGREDIENT:
      let maxLimit = 'Maximum 10 Items Allowed'
      if (state.ingredients.length >= 10) {
        return {
       ...state,
          maxLimit: maxLimit,
        };
      } else {
        return {
          ...state,
          maxLimit: null,
          ingredients: [...state.ingredients, { type: action.payload }],
          totalPrice: state.totalPrice + state.ingredPrice[action.payload],
        };
      }
    case constance.REMOVE_INGREDIENT:
      let newPrice = state.totalPrice;
      let preState = [...state.ingredients].reverse();
      const index = preState.findIndex((item) => item.type === action.payload);
      if (index !== -1) {
        newPrice = state.totalPrice - state.ingredPrice[action.payload];
        preState.splice(index, 1);
      }
      preState.reverse();      
      return {
        ...state,
        ingredients: preState,
        totalPrice: newPrice,
        maxLimit: null,
      };
    case constance.RESET:
      return {
        ...state,
        ingredients: [],
        totalPrice: 80,
        maxLimit: null,
      };
    case constance.CHECKOUT:
      return {
        ...state,
        checkout: state.ingredients.length !== 0,
      };
    case constance.LOADORDERS:
      let orders = [];
      for (let key in action.payload) {
        orders.push({ ...action.payload[key], id: key });
      }
      return {
        ...state,
        orders: orders,
        orderLoading: false,
      };
    case constance.ORDERLOADFAILED:
      return {
        ...state,
        orderLoading: false,
        orderLoadErrorMessage: action.payload,
      };

    // Auth
    case constance.AUTHSUCCESS:
      return {
        ...state,
        token: action.payload.token,
        userId: action.payload.userId,
      };

    case constance.AUTHLOGOUT:
      return {
        ...state,
        authError: null,
        token: null,
        userId: null,
      };
    case constance.AUTHLOADING:
      return {
        ...state,
        authLoading: action.payload,
      };
    case constance.AUTHFAIELD:
      return {
        ...state,
        authError: action.payload,
      };

    default:
      return state;
  }
};
