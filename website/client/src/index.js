import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import App from "./App";

// store
import { createStore, applyMiddleware } from "redux";
import reducers from "./store/reducers";
import reduxThunk from "redux-thunk";
import { Provider } from "react-redux";

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
