import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ProductDetails.css";
import { toast } from "react-toastify";

function ProductDetails({ cart, setCart, orders, setOrders }) {
  const location = useLocation();
  const navigate = useNavigate();

  const book = location.state?.book;

  // ❌ If no data
  if (!book) {
    return (
      <div style={{ padding: "30px", color: "var(--text)" }}>
        <h2>Book not found 😢</h2>
        <button onClick={() => navigate("/")}>Go Back</button>
      </div>
    );
  }

  // 🛒 ADD TO CART
  const addToCart = () => {
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

    toast.success("📚 Added to cart!");
  };

  // 💳 BUY NOW
  const handleBuyNow = () => {
    const newOrder = {
      id: Date.now(),
      items: [{ ...book, qty: 1 }],
      total: book.price,
      date: new Date().toLocaleString()
    };

    setOrders(prev => [...prev, newOrder]);

    toast.success("✅ Order placed!");
    navigate("/orders");
  };

  return (
    <div className="product-container">

      {/* 🔙 BACK */}
      <button onClick={() => navigate("/")} className="back-btn">
        ← Back
      </button>

      <div className="product-card">

        {/* 🖼 IMAGE */}
        <img src={book.image} alt={book.title} />

        {/* 📄 DETAILS */}
        <div className="product-details">

          <h2>{book.title}</h2>
          <p>by {book.author}</p>

          {/* ⭐ RATING */}
          <div className="rating">
            {"⭐".repeat(book.rating || 4)}
          </div>

          {/* 💰 PRICE */}
          <p className="price">₹{book.price}</p>

          {/* 📝 DESCRIPTION */}
          <p className="desc">
            {book.description || "This is a great book you should read!"}
          </p>

          {/* ✨ EXTRA INFO */}
          <div className="extra-info">
            <p>✔ Free Delivery</p>
            <p>✔ Cash on Delivery Available</p>
            <p>✔ Easy Returns</p>
          </div>

          {/* 🚀 ACTION BUTTONS */}
          <div className="actions">
            <button className="buy-btn" onClick={handleBuyNow}>
              Buy Now
            </button>

            <button className="cart-btn" onClick={addToCart}>
              Add to Cart
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}

export default ProductDetails;