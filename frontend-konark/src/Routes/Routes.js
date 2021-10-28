import React from "react";

import Home from "../Pages/Home";
import About from "../Pages/About";
import Contact from "../Pages/Contact";
import Faq from "../Pages/FAQ";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Header } from "../Components/Header";
import { Footer } from "../Components/Footer";
import Dashboard from "../Components/Dashboard";
import Orders from "../Components/Orders";
import Address from "../Components/Address";
import Profile from "../Components/Profile";

export const Routes = () => {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        {/* <Route path="/signin" exact component={} /> */}
        <Route path="/about" exact component={About} />
        <Route path="/contact" exact component={Contact} />
        <Route path="/FAQ" exact component={Faq} />
        <Route path="/userdashboard" exact component={Dashboard} />
        <Route path="/orders" exact component={Orders} />
        <Route path="/address" exact component={Address} />
        <Route path="/userprofile" exact component={Profile} />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
};
