import {
  SET_PACKS,
  SET_PRODUCTS,
  USER_INFO,
  ADD_CART,
  UPDATE_CART,
  ORDER_DETAILS,
  LOADING_BAR,
} from "./action.types";

export const initialState = {
  products: [],
  packs: [],
  user: {},
  cart: {},
  orderDetails: [],
};

export const reducer = (state, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };
    case SET_PACKS:
      return {
        ...state,
        packs: action.payload,
      };
    case USER_INFO:
      return {
        ...state,
        user: action.payload,
      };
    case ADD_CART:
      return {
        ...state,
        cart: action.payload,
      };
    case UPDATE_CART:
      return {
        ...state,
        cart: action.payload,
      };

    case ORDER_DETAILS:
      if (action.payload === null) {
        return {
          ...state,
          orderDetails: [],
        };
      } else {
        return {
          ...state,
          orderDetails: action.payload,
        };
      }
  }
};
