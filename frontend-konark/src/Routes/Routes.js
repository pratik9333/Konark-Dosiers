import React, { useContext, Fragment } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import "../App.css";

//Pages
import Home from "../Pages/Home";

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

//PrivateRoute
import PrivateRoutes from "../Routes/PrivateRoutes";

//AdminRoute
import AdminRoutes from "../Routes/AdminRoutes";
import { AppContext } from "../Context/AppContext";
import AdminHome from "../Pages/AdminPages/AdminHome";
import Contact from "../Pages/Contact";

export const Routes = () => {
  const { state } = useContext(AppContext);
  return (
    <div className="app">
      <BrowserRouter>
        {state.products.length > 0 ? (
          <Switch>
            <Route path="/login" exact component={Login} />
            <AdminRoutes path="/admin/dashboard" exact component={AdminHome} />

            <Fragment>
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
              <Route path="/contact" exact component={Contact} />
              <Route path="/" exact component={Home} />
              <Route path="/FAQ" exact component={Faq} />
              <Footer />
            </Fragment>
          </Switch>
        ) : (
          <div className="spin-wrapper">
            <div className="spinner"></div>
          </div>
        )}
      </BrowserRouter>
    </div>
  );
};
