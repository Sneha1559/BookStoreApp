import React from "react";
import "./Cart.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Cart({ cart, setCart, orders, setOrders }) {
  const navigate = useNavigate();

  const increaseQty = (id) => {
    setCart(cart.map(item =>
      item._id === id ? { ...item, qty: item.qty + 1 } : item
    ));
  };

  const decreaseQty = (id) => {
    setCart(cart.map(item =>
      item._id === id && item.qty > 1
        ? { ...item, qty: item.qty - 1 }
        : item
    ));
  };

  const removeItem = (id) => {
    setCart(cart.filter(item => item._id !== id));
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error("Cart is empty!");
      return;
    }

    const newOrder = {
      id: Date.now(),
      items: cart,
      total: total,
      date: new Date().toLocaleString()
    };

    setOrders([...orders, newOrder]);
    setCart([]);

    toast.success("✅ Order placed successfully!");
    navigate("/orders");
  };

  return (
    <div className="cart-container">

      <button onClick={() => navigate("/")} className="back-btn">
        ← Back to Store
      </button>

      <h2>🛒 Your Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty 😢</p>
      ) : (
        <>
          {cart.map((item) => (
            <div className="cart-item" key={item._id}>

              <img src={item.image} alt={item.title} />

              <div className="info">
                <h3>{item.title}</h3>
                <p>₹{item.price}</p>

                <div className="qty">
                  <button onClick={() => decreaseQty(item._id)}>-</button>
                  <span>{item.qty}</span>
                  <button onClick={() => increaseQty(item._id)}>+</button>
                </div>
              </div>

              <button
                className="remove"
                onClick={() => removeItem(item._id)}
              >
                ❌
              </button>

            </div>
          ))}

          <div className="summary">
            <h3>Total: ₹{total}</h3>
            <button onClick={handleCheckout}>Buy Now</button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;