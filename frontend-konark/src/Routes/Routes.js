import React, { useContext } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import "../App.css";

//Pages
import Home from "../Pages/Home";
import About from "../Pages/About";
import Contact from "../Pages/Contact";
import Faq from "../Pages/FAQ";
import BuyConnection from "../Pages/BuyConnection";
import Login from "../Pages/Login";
import ProductInfo from "../Pages/ProductInfo";
import Packs from "../Pages/Packs";
import Order from "../Pages/Order";
import Confirmation from "../Pages/Confirmation";

//Components
import { Header } from "../Components/Header";
import { Footer } from "../Components/Footer";
import Dashboard from "../Components/Dashboard";
import Orders from "../Components/Orders";
import PackDetail from "../Components/PackDetail";
import Profile from "../Components/Profile";
import LoadingBar from "react-top-loading-bar";

//PrivateRoute
import PrivateRoutes from "../Routes/PrivateRoutes";

//AdminRoute
import AdminRoutes from "../Routes/AdminRoutes";
import { AppContext } from "../Context/AppContext";
import { LOADING_BAR } from "../Context/action.types";

export const Routes = () => {
  const { state, dispatch } = useContext(AppContext);
  return (
    <div className="app">
      <BrowserRouter>
        <Switch>
          <Route path="/login" exact component={Login} />
          {state.products.length > 0 ? (
            <div>
              <Header />
              {/* <LoadingBar
                onLoaderFinished={() => {
                  dispatch({ type: LOADING_BAR, payload: 0 });
                }}
              /> */}
              <PrivateRoutes
                path="/userdashboard"
                exact
                component={Dashboard}
              />
              <PrivateRoutes path="/orders" exact component={Orders} />
              <PrivateRoutes path="/packdetails" exact component={PackDetail} />
              <PrivateRoutes path="/userprofile" exact component={Profile} />

              <PrivateRoutes
                path="/confirmation"
                exact
                component={Confirmation}
              />
              <PrivateRoutes
                path="/newconnection"
                exact
                component={BuyConnection}
              />
              <PrivateRoutes path="/order" exact component={Order} />
              <Route path="/productdetails/:id" exact component={ProductInfo} />
              <Route path="/packs" exact component={Packs} />
              <Route path="/" exact component={Home} />
              <Route path="/about" exact component={About} />
              <Route path="/contact" exact component={Contact} />
              <Route path="/FAQ" exact component={Faq} />
              <Footer />
            </div>
          ) : (
            <div class="spin-wrapper">
              <div class="spinner"></div>
            </div>
          )}
        </Switch>
      </BrowserRouter>
    </div>
  );
};
