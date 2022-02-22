import "./App.css";
import React, { useLayoutEffect, useReducer } from "react";

import { Routes } from "./Routes/Routes";
import { AppContext } from "./Context/AppContext";
import { getProducts } from "./api/Product";
import { getPacks } from "./api/Recharge";

//Actions
import {
  SET_PRODUCTS,
  SET_PACKS,
  USER_INFO,
  ADD_CART,
} from "./Context/action.types";
import { reducer, initialState } from "./Context/reducer";
import { isAuthenticated } from "./api/Auth";
import { getUser } from "./api/User";
import { getCartItems } from "./api/cart";
import { useAlert } from "react-alert";

const App = () => {
  const { user, token } = isAuthenticated();
  const [state, dispatch] = useReducer(reducer, initialState);
  let alert = useAlert();

  function setCartItems() {
    if (isAuthenticated()) {
      getCartItems(user._id, token)
        .then((data) => {
          if (data.message === "Cart is empty") {
            dispatch({ type: ADD_CART, payload: null });
          }
          dispatch({ type: ADD_CART, payload: data.userCart[0] });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  useLayoutEffect(() => {
    //getAllProducts
    getProducts().then((data) => {
      if (data.error) {
        alert.error("Cannot able to fetch products");
      } else {
        dispatch({ type: SET_PRODUCTS, payload: data });
      }
    });

    if (isAuthenticated()) {
      //get user info
      getUser(user._id, token)
        .then((data) => {
          if (!data.error) {
            dispatch({ type: USER_INFO, payload: data });
          } else {
            alert.error("Cannot able to fetch user data");
          }
        })
        .catch((err) => {
          alert.error("Cannot able to fetch user data");
        });

      setCartItems();
    }
    //getAllPacks
    getPacks().then((data) => {
      if (data.error) {
        alert.error("Cannot able to fetch packs");
      } else {
        dispatch({ type: SET_PACKS, payload: data });
      }
    });
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch, setCartItems }}>
      <div>
        <Routes />
      </div>
    </AppContext.Provider>
  );
};

export default App;
