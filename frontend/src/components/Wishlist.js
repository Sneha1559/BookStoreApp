import React from "react";
import { useNavigate } from "react-router-dom";
import "./Wishlist.css";
import { toast } from "react-toastify";

function Wishlist({ wishlist, setWishlist, cart, setCart }) {
  const navigate = useNavigate();

  // ❌ Remove
  const removeItem = (id) => {
    setWishlist(wishlist.filter(item => item._id !== id));
  };

  // 🛒 MOVE TO CART
  const moveToCart = (book) => {
    const exist = cart.find(item => item._id === book._id);

    if (exist) {
      setCart(cart.map(item =>
        item._id === book._id
          ? { ...item, qty: item.qty + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...book, qty: 1 }]);
    }

    // remove from wishlist
    setWishlist(wishlist.filter(item => item._id !== book._id));

    toast.success("📚 Moved to Cart!");
  };

  return (
    <div className="wishlist-container">

      <button onClick={() => navigate("/")} className="back-btn">
        ← Back
      </button>

      <h2>❤️ Your Wishlist</h2>

      {wishlist.length === 0 ? (
        <p>No items in wishlist</p>
      ) : (
        <div className="wishlist-grid">
          {wishlist.map(item => (
            <div className="wishlist-card" key={item._id}>

              <img src={item.image} alt={item.title} />

              <h3>{item.title}</h3>
              <p>{item.author}</p>
              <p className="price">₹{item.price}</p>

              {/* 🔥 BUTTONS */}
              <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>

                <button
                  style={{ background: "#22c55e" }}
                  onClick={() => moveToCart(item)}
                >
                  Move to Cart
                </button>

                <button
                  style={{ background: "#ef4444" }}
                  onClick={() => removeItem(item._id)}
                >
                  Remove
                </button>

              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;