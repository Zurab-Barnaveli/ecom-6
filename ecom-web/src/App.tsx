import React, { useEffect } from "react";
import "./App.scss";
import { Route, Routes, useNavigate } from "react-router-dom";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import ProductSection from "./components/navigation/ProductSection/ProductsSection.component";
import Navigation from "./components/navigation/Navigation.component";
import Cart from "./pages/Cart/Cart";
import User from "./pages/User/UserProfile";
import Login from "./pages/LogIn/LogIn";
import Register from "./pages/Register/Register";
import UserDashboard from "./components/navigation/userDashboard/UserDashboard";

function App() {
  const navigate = useNavigate();
  return (
    <>
      <Navigation />
      <Routes>
        <Route path='/' element={<ProductSection />} />
        <Route path='/product/:id' element={<ProductDetail />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/user' element={<User />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/dashboard' element={<UserDashboard />} />
      </Routes>
    </>
  );
}

export default App;
