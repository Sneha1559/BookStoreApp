import React, { useEffect, useState } from "react";
import "./BookList.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function BookList({ cart, setCart, wishlist, setWishlist }) {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/books")
      .then(res => res.json())
      .then(data => setBooks(data))
      .catch(err => console.log("Error fetching books:", err));
  }, []);

  const addToCart = (book) => {
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

    toast.success("📚 Added to cart");
  };

  const toggleWishlist = (book) => {
    const exist = wishlist.find(item => item._id === book._id);

    if (exist) {
      setWishlist(wishlist.filter(item => item._id !== book._id));
    } else {
      setWishlist([...wishlist, book]);
    }
  };

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(search.toLowerCase()) &&
    book.price >= minPrice &&
    book.price <= maxPrice
  );

  return (
    <div className="container">

      <h2 className="title">📚 Discover Your Next Read</h2>

      <input
        type="text"
        placeholder="🔍 Search books..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-bar"
      />

      <select
        className="filter-dropdown"
        onChange={(e) => {
          const value = e.target.value;

          if (value === "low") {
            setMinPrice(0);
            setMaxPrice(500);
          } else if (value === "mid") {
            setMinPrice(500);
            setMaxPrice(1000);
          } else if (value === "high") {
            setMinPrice(1000);
            setMaxPrice(5000);
          } else {
            setMinPrice(0);
            setMaxPrice(10000);
          }
        }}
      >
        <option value="all">All Prices</option>
        <option value="low">Under ₹500</option>
        <option value="mid">₹500 - ₹1000</option>
        <option value="high">Above ₹1000</option>
      </select>

      <div className="grid">
        {filteredBooks.length === 0 ? (
          <p>No books found</p>
        ) : (
          filteredBooks.map((book) => {
            const isWishlisted = wishlist.find(item => item._id === book._id);

            return (
              <div
                className="card"
                key={book._id}
                onClick={() =>
                  navigate(`/book/${book._id}`, { state: { book } })
                }
              >

                {/* ❤️ Wishlist */}
                <button
                  className="wishlist-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(book);
                  }}
                >
                  {isWishlisted ? "❤️" : "🤍"}
                </button>

                <img
                  src={book.image || "https://via.placeholder.com/150"}
                  alt={book.title}
                />

                <h3>{book.title}</h3>
                <p>{book.author}</p>

                <div className="rating">
                  {"⭐".repeat(book.rating || 4)}
                </div>

                <p className="price">₹{book.price}</p>

                <button
                  className="add-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(book);
                  }}
                >
                  Add to Cart
                </button>

              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default BookList;