import React from "react";
import "./App.css";
import Routes from "./routes";
import { Provider } from "react-redux";
import store from "./redux/store";
import { useHistory } from "react-router-dom";

const App = () => {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
};

export default App;
