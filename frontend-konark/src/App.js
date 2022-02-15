import "./App.css";
import React, { useLayoutEffect, useReducer, useState } from "react";

import { Routes } from "./Routes/Routes";
import { AppContext } from "./Context/AppContext";
import { getProducts } from "./api/Product";
import { getPacks } from "./api/Recharge";

//Actions
import { SET_PRODUCTS, SET_PACKS } from "./Context/action.types";
import { reducer, initialState } from "./Context/reducer";
import { ToastContainer, toast } from "react-toastify";

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useLayoutEffect(() => {
    //getAllProducts
    getProducts().then((data) => {
      if (data.error) {
        toast.error("Cannot able to fetch products");
      } else {
        dispatch({ type: SET_PRODUCTS, payload: data });
      }
    });

    //getAllPacks
    getPacks().then((data) => {
      if (data.error) {
        toast.error("Cannot able to fetch packs");
      } else {
        dispatch({ type: SET_PACKS, payload: data });
      }
    });
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <div>
        <ToastContainer />
        <Routes />
      </div>
    </AppContext.Provider>
  );
}

export default App;
