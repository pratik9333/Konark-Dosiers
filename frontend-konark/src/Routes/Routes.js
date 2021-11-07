import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

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

//Components
import { Header } from "../Components/Header";
import { Footer } from "../Components/Footer";
import Dashboard from "../Components/Dashboard";
import Orders from "../Components/Orders";
import Address from "../Components/Address";
import Profile from "../Components/Profile";

//PrivateRoute
import PrivateRoutes from "../Routes/PrivateRoutes";

//AdminRoute
import AdminRoutes from "../Routes/AdminRoutes";

export const Routes = () => {
  return (
    <div className="app">
      <BrowserRouter>
        <Switch>
          <Route path="/login" exact component={Login} />
          <div>
            <Header />
            <PrivateRoutes path="/userdashboard" exact component={Dashboard} />
            <PrivateRoutes path="/orders" exact component={Orders} />
            <PrivateRoutes path="/address" exact component={Address} />
            <PrivateRoutes path="/userprofile" exact component={Profile} />
            <PrivateRoutes
              path="/newconnection"
              exact
              component={BuyConnection}
            />
            <PrivateRoutes
              path="/newconnection/order"
              exact
              component={Order}
            />
            <Route path="/productdetails" exact component={ProductInfo} />
            <Route path="/packs" exact component={Packs} />
            <Route path="/" exact component={Home} />
            <Route path="/about" exact component={About} />
            <Route path="/contact" exact component={Contact} />
            <Route path="/FAQ" exact component={Faq} />
            <Footer />
          </div>
        </Switch>
      </BrowserRouter>
    </div>
  );
};
