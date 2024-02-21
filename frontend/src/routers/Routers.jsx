import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";

import Register from "../pages/register/Register";
import { Account } from "../pages/account/Account";
import ResetPassword from "../pages/login/ResetPassword";
import Shop from "../pages/shop/Shop";
import ProductDetails from "../pages/productDetails/ProductDetails";
import Esthetic from "../pages/esthetic/Esthetic";
import Cart from "../pages/cart/Cart";
import ProtectRoute from "./ProtectRoute";
import Checkout from "../pages/checkout/Checkout";
import Search from "../pages/search/Search";
import { SearchProvider } from "../contexts/SearchContext";
import ResetPasswordConfirm from "../pages/login/ResetPasswordConfirm";
import ThankYou from "../pages/thank-you/ThankYou";
function Routers(props) {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/home");
  }, []);
  return (
    <Routes>
      <Route path="home" element={<Home />} />{" "}
      <Route path="/shop" element={<Shop />} />{" "}
      <Route path="/search" element={<Search />} />{" "}
      <Route path="/bo-suu-tap" element={<Esthetic />} />{" "}
      <Route path="/noi-that" element={<Esthetic />} />{" "}
      <Route path="/goc-cam-hung" element={<Esthetic />} />{" "}
      <Route path="shop/:id" element={<ProductDetails />} />
      <Route path="collections/:category" element={<Shop />} />
      <Route path="login" element={<Login />} />
      <Route path="forgotPassword" element={<ResetPassword />} />
      <Route path="confirmPassword" element={<ResetPasswordConfirm />} />
      <Route path="register" element={<Register />} />{" "}
      <Route path="/account" element={<Account />} />
      <Route path="thank-you" element={<ThankYou />} />
      <Route path="/cart" element={<Cart />} />{" "}
      <Route
        path="checkout"
        element={
          <ProtectRoute>
            <Checkout />
          </ProtectRoute>
        }
      />
    </Routes>
  );
}

export default Routers;
