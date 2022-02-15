import { SET_PACKS, SET_PRODUCTS, USER_INFO } from "./action.types";

export const initialState = {
  products: [],
  packs: [],
  user: {},
};

export const reducer = (state, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      console.log(state);
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
  }
};
