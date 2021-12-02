import "./App.css";
import "./Assets/Styles/spinner.css";

import React, { useEffect, useLayoutEffect, useState } from "react";

import { Routes } from "./Routes/Routes";
import { AppContext } from "./Context/AppContext";
import { getProducts } from "./api/Product";
import { getPacks } from "./api/Recharge";

function App() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);
  const [packs, setPacks] = useState([]);

  useLayoutEffect(() => {
    setTimeout(() => setLoading(!loading), 5000);
  }, []);

  useEffect(() => {
    //getAllProducts
    getProducts().then((data) => {
      if (data.error) {
        setError(data.error);
        console.log(error);
      } else {
        setProducts(data);
      }
    });

    //getAllPacks
    getPacks().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setPacks(data);
      }
    });
  }, []);

  return (
    <AppContext.Provider value={{ products, packs }}>
      <div>
        {loading && <div class="loader loader-1"></div>}
        {!loading && <Routes />}
      </div>
    </AppContext.Provider>
  );
}

export default App;
