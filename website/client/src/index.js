// Module Imports
import React from "react";
import ReactDOM from "react-dom/client";
import reduxThunk from "redux-thunk";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";

// Component Imports
import "./styles/index.css";
import App from "./App";
import reducers from "./store/reducers";

// Create Store
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

// Render Root
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
