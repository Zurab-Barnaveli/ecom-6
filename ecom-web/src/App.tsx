import React, { useEffect } from "react";

import "./App.scss";

import { Route, Routes, useNavigate } from "react-router-dom";

import ProductDetail from "./Pages/ProductDetail/ProductDetail";
import ProductSection from "./components/navigation/ProductSection/ProductsSection.component";
import Navigation from "./components/navigation/Navigation.component";
import Cart from "./Pages/Cart/Cart";
import User from "./Pages/User/User";

import { isUserAuthenticated } from "./Utils/Helpers";

function App() {
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!isUserAuthenticated()) navigate("/");
  // }, [isUserAuthenticated()]);

  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<ProductSection />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/user" element={<User />} />
      </Routes>
    </>
  );
}

export default App;
