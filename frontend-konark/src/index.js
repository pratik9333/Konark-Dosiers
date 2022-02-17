import React from "react";
import { render } from "react-dom";
import "./index.css";
import App from "./App";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

// optional configuration
const options = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: "30px",
  INFO: "info",
  SUCCESS: "success",
  ERROR: "error",
  // you can also just use 'scale'
  transition: transitions.fade,
};

const Root = () => {
  return (
    <AlertProvider template={AlertTemplate} {...options}>
      <App />
    </AlertProvider>
  );
};
render(<Root />, document.getElementById("root"));
