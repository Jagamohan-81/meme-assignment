import React from "react";
import ReactDOM from "react-dom/client";
import "./App.css";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import Login from "./components/Login";
import Home from "./components/Home";
import { Provider } from "react-redux";
import store from "./store/index";
import Wishlist from "./components/Wishlist";
import { BrowserRouter, Routes, Route } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/main" element={<Home />}></Route>
          <Route path="/wishlist" element={<Wishlist />}></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
