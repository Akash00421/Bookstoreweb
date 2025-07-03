import React from 'react';
import './CartPage.css';
import { Link } from 'react-router-dom';
const CartPage = ({ cartItems, wishlistItems, onRemoveFromCart , onRemoveFromWishlist, onUpdateQuantity }) => {
  // Calculate totals
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
 console.log("wishlistItems received in CartPage:", wishlistItems);

  return (
    <div className="cart-container">
      <h2>🛒 Your Cart</h2>
      {totalItems === 0 ? (
        <p className="empty-text">No items in cart.</p>
      ) : (
        <>
          <div className="item-list">
            {cartItems.map(item => (
              <div className="item-card" key={item.id}>
                <Link to={`/book/${item.id}`} className="item-link">
                  <img src={item.image} alt={item.title} className="item-image" />
                  <h3>{item.title}</h3>
                </Link>
                <div className="item-details">
                  <h3>{item.title}</h3>
                  <p>by {item.author}</p>
                  <p className="price">
                    ₹{item.price} × {item.quantity} = ₹{item.price * item.quantity || 1}
                    <span className="old-price">₹{item.oldPrice}</span>
                  </p>

                  <div className="quantity-controls">
                      <button onClick={() => onUpdateQuantity(item.id, -1)}>-</button>
                      <span className="quantity-value">{item.quantity || 1}</span>
                      <button onClick={() => onUpdateQuantity(item.id, 1)}>+</button>
                  </div>

                  <button
                    className="remove-btn"
                    onClick={() => onRemoveFromCart(item.id)}
                  >
                    ❌ Remove from Cart
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>🧾 Cart Summary</h3>
            <p>Total Items: {totalItems}</p>
            <p>Total Price: ₹{totalPrice}</p>
          </div>
        </>
      )}

      <h2>🔖 Wishlist</h2>
      {wishlistItems.length === 0 ? (
        <p className="empty-text">No items in wishlist.</p>
      ) : (
        <div className="item-list">
          {wishlistItems.map(item => (
            <div className="item-card" key={item.id}>
              <img src={item.image} alt={item.title} className="item-image" />
              <div className="item-details">
                <h3>{item.title}</h3>
                <p>by {item.author}</p>
                <p className="price">
                  ₹Rs.{item.price}{' '}
                  <span className="old-price">₹{item.oldPrice}</span><br />
                   <button
                    className="remove-btn"
                    onClick={() => onRemoveFromWishlist(item.id)}
                  >
                    ❌ Remove from Wishlist
                  </button>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CartPage;
