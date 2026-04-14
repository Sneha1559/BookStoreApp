import React from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar({ cartCount, setDarkMode }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div className="navbar">

      {/* Logo */}
      <h2 className="logo" onClick={() => navigate("/")}>
        📚 BookNest
      </h2>

      {/* Buttons */}
      <div className="nav-buttons">

        <button
          className="icon-btn"
          onClick={() => setDarkMode(prev => !prev)}
          title="Toggle Theme"
        >
          🌙
        </button>

        <button onClick={() => navigate("/sell")}>
          📦 Sell
        </button>

        <button onClick={() => navigate("/cart")}>
          🛒 Cart ({cartCount})
        </button>

        <button onClick={() => navigate("/wishlist")}>
          ❤️ Wishlist
        </button>

        <button onClick={() => navigate("/orders")}>
          🧾 Orders
        </button>

        <button className="logout" onClick={logout}>
          Logout
        </button>

      </div>
    </div>
  );
}

export default Navbar;