import React from "react";
import { useNavigate } from "react-router-dom";
import "./Orders.css";

function Orders({ orders }) {
  const navigate = useNavigate();

  return (
    <div className="orders-container">

      <button onClick={() => navigate("/")} className="back-btn">
        ← Back
      </button>

      <h2>🧾 Order History</h2>

      {orders.length === 0 ? (
        <p>No orders yet 😢</p>
      ) : (
        orders.map(order => (
          <div className="order-card" key={order.id}>

            {/* Header */}
            <div className="order-header">
              <h3>Order #{order.id}</h3>
              <p>{order.date}</p>
            </div>

            <p className="total">Total: ₹{order.total}</p>

            {/* Items */}
            <div className="order-items">
              {order.items.map(item => (
                <div className="order-item" key={item._id}>
                  <span>{item.title}</span>
                  <span>× {item.qty}</span>
                </div>
              ))}
            </div>

          </div>
        ))
      )}
    </div>
  );
}

export default Orders;