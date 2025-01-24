import React, { useState, useEffect, useMemo, useCallback } from "react";
import "./App.css";

// Simulated API call
const fetchProducts = async () => {
  return [
    { id: 1, name: "Laptop", image: "https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?cs=srgb&dl=pexels-craigmdennis-205421.jpg&fm=jpg" },
    { id: 2, name: "Smartphone", image: "https://media.wired.com/photos/62d75d34ddaaa99a1df8e61d/master/pass/Phone-Camera-Webcam-Gear-GettyImages-1241495650.jpg" },
    { id: 3, name: "Tablet", image: "https://images.pexels.com/photos/208512/pexels-photo-208512.jpeg?cs=srgb&dl=pexels-pixabay-208512.jpg&fm=jpg" },
    { id: 4, name: "Headphones", image: "data:image/jpeg;base64,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" },
    { id: 5, name: "Smartwatch", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgLl5jOfnfl4uhNQaC2ysyZPc17JAG-OWxRw&s" },
    { id: 6, name: "Gaming Console", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIqFDhlQFSI08hQEa3FwGNdml8YNfiajYCeg&s" },
    { id: 7, name: "VR Headset", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3_mGHbNtOZMlkq8pI6yY7hDSLM1QWWvQ54A&s" },
    { id: 8, name: "Drone", image: "https://cdn.mos.cms.futurecdn.net/kXUY9hyetVzhZ2scwJP7p3-1200-80.jpg" },
    { id: 9, name: "Portable Speaker", image: "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1730270851/Croma%20Assets/Communication/Speakers%20and%20Media%20Players/Images/302520_0_i6w3cz.png" },
  ];
};

const App = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState([]);
  const [showPage, setShowPage] = useState(true);

  // Load products from API
  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchProducts();
      setProducts(data);
    };
    loadProducts();
  }, []);

  // Filtered products using useMemo
  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);

  // Add to Cart
  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  // Remove from Cart
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Clear search
  const clearSearch = useCallback(() => {
    setSearchTerm("");
  }, []);

  if (!showPage) {
    return (
      <div className="exit-page">
        <h1>💨 Page Removed! Refresh to Reload 💨</h1>
      </div>
    );
  }

  return (
    <div className="app-container">
      <div className="animated-bg"></div>
      <button className="remove-page-button" onClick={() => setShowPage(false)}>
        ✖ Remove Page
      </button>
      <h1>Meesho Store 🛒</h1>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for products..."
        className="stylish-input"
      />
      <button onClick={clearSearch} className="clear-button">
        Reset Search 🧹
      </button>
      <p className="count">
        {filteredProducts.length} product{filteredProducts.length === 1 ? "" : "s"} found!
      </p>
      <ul className="product-list">
        {filteredProducts.map((product, index) => (
          <li
            key={product.id}
            className="product-item"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <img src={product.image} alt={product.name} className="product-image" />
            <span className="product-name">{product.name}</span>
            <button
              className="add-to-cart-button"
              onClick={() => addToCart(product)}
            >
              Add to Cart 🛒
            </button>
          </li>
        ))}
      </ul>

      {/* Cart Widget */}
      <div className="cart-widget">
        <h2>My Cart 🎉</h2>
        {cart.length === 0 ? (
          <p className="empty-cart">Your cart is empty!</p>
        ) : (
          <ul className="cart-list">
            {cart.map((item) => (
              <li key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-image" />
                <span>{item.name}</span>
                <button
                  className="remove-button"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove ❌
                </button>
              </li>
            ))}
          </ul>
        )}
        <p className="cart-count">
          Total Items: <strong>{cart.length}</strong>
        </p>
      </div>
    </div>
  );
};

export default App;
