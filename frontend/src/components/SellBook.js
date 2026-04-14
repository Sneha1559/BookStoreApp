import React, { useState } from "react";
import "./SellBook.css";
import { toast } from "react-toastify";

function SellBook() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = () => {
    if (!title || !price || !image) {
      toast.error("Please fill all fields");
      return;
    }

    // 👉 Later you can send to backend
    toast.success("📦 Book posted successfully!");

    // Reset form
    setTitle("");
    setPrice("");
    setImage("");
  };

  return (
    <div className="sell-container">
      <div className="sell-card">

        <h2>📦 Sell Your Book</h2>

        <input
          type="text"
          placeholder="Book Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <button onClick={handleSubmit}>Post Book</button>

      </div>
    </div>
  );
}

export default SellBook;