import "./App.css";
import React, { useEffect, useState } from "react";

import { Routes } from "./Routes/Routes";
import { AppContext } from "./Context/AppContext";
import { getProducts } from "./api/Product";
import { getPacks } from "./api/Recharge";

function App() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);
  const [packs, setPacks] = useState([]);

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
        <Routes />
      </div>
    </AppContext.Provider>
  );
}

export default App;
