import React, { useState, useEffect } from "react";
import BookList from "./components/BookList";
import Cart from "./components/Cart";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import ProductDetails from "./components/ProductDetails";
import Wishlist from "./components/Wishlist";
import Orders from "./components/Orders";
import SellBook from "./components/SellBook";
import Chatbot from "./components/Chatbot";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [wishlist, setWishlist] = useState([]);
  const [orders, setOrders] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  // ✅ Auto login
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setUser(true);
  }, []);

  // ✅ Dark mode apply globally
  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      darkMode ? "dark" : "light"
    );
  }, [darkMode]);

  return (
    <Router>
      <div className={darkMode ? "dark" : "light"}>

        {/* Toast */}
        <ToastContainer position="top-right" autoClose={2000} />

        {!user ? (
          isLogin ? (
            <Login setUser={setUser} setIsLogin={setIsLogin} />
          ) : (
            <Register setIsLogin={setIsLogin} />
          )
        ) : (
          <>
            {/* Navbar */}
            <Navbar
              cartCount={cart.length}
              setDarkMode={setDarkMode}
            />

            {/* Chatbot */}
            <Chatbot />

            {/* Routes */}
            <Routes>

              {/* Home */}
              <Route
                path="/"
                element={
                  <BookList
                    cart={cart}
                    setCart={setCart}
                    wishlist={wishlist}
                    setWishlist={setWishlist}
                  />
                }
              />

              {/* Cart */}
              <Route
                path="/cart"
                element={
                  <Cart
                    cart={cart}
                    setCart={setCart}
                    orders={orders}
                    setOrders={setOrders}
                  />
                }
              />

              {/* ✅ FIXED Wishlist */}
              <Route
                path="/wishlist"
                element={
                  <Wishlist
                    wishlist={wishlist}
                    setWishlist={setWishlist}
                    cart={cart}
                    setCart={setCart}
                  />
                }
              />

              {/* Orders */}
              <Route
                path="/orders"
                element={<Orders orders={orders} />}
              />

              {/* Sell */}
              <Route
                path="/sell"
                element={<SellBook />}
              />

              {/* Product Details */}
              <Route
                path="/book/:id"
                element={
                  <ProductDetails
                    cart={cart}
                    setCart={setCart}
                    orders={orders}
                    setOrders={setOrders}
                  />
                }
              />

            </Routes>
          </>
        )}

      </div>
    </Router>
  );
}

export default App;