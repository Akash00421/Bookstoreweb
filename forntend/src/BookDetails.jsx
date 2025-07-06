import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import books from './Books';
import { FaTruck } from 'react-icons/fa';
import './BookDetails.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
function BookDetails({ onToggleWishlist ,user}) {

  const { id } = useParams();
  const book = books.find((b) => b.id === parseInt(id));
  if (!book) return <h2>Book not found</h2>;
  const [quantity, setQuantity] = useState(1);
  const cleanPrice = book.price;

  

  const numericPrice = parseFloat(cleanPrice);
  const subtotal = (numericPrice * quantity).toFixed(2);

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  console.log("user in BookDetails:", user);
  console.log("Book inStock:", book.inStock);

  return (
    <div className="book-details-container">
      <img src={book.image} alt={book.title} className="book-image" />

      <div className="book-info">
        <h1 className="book-title">{book.title}</h1>
        <h3 className="book-author">by {book.author}</h3>

        <p className="book-price">
          <strong><span>Rs. {cleanPrice}</span></strong>{' '}
          <span className="book-old-price">{book.oldPrice}</span>{' '}
          <span className="book-discount">{book.discount}</span>
        </p>

        <div className="book-box">
          <strong>Publication Date:</strong> 23 Nov 2022
        </div>

        <div className="quantity-selector">
          <strong>Quantity:</strong>
          <button onClick={handleDecrease}>–</button>
          <button>{quantity}</button>
          <button onClick={handleIncrease}>+</button>
        </div>

        <div className="subtotal">
          <strong>Subtotal:</strong> Rs. {subtotal}
        </div>
        <div>
          <button className="availability-btn"
                style={{
              color: book.inStock > 0 ? 'green' : 'red',
              fontWeight: 'bold',
              marginBottom: '10px'
            }}
          >
            {book.inStock > 0 ? 'Available' : 'Unavailable'}
          </button>

</div>
       <div className="action-buttons">
       <button className="wishlist-btn"
                onClick={() => {if (!user) {
      alert("Please login to add to wishlist");
      return;
    }
    onToggleWishlist(book);
    toast.success("Added to wishlist!");
    }} >Add To Wishlist
       </button>

       <button className="buy-btn" 
        onClick={async () => {
          console.log("🛒 Buy button clicked");
           console.log("User Info:", user);
        if (!user ) {
            alert("Please login to buy this book.");
         return;
         }
         if (book.inStock === 0) {
             alert("Sorry, this book is currently out of stock.");
         return;
       }

  try {
    const response = await fetch(
                  "https://bookstoreweb-wwfq.onrender.com/api/order/place",
      {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: user,
        product: {
          name: book.title,
          price: book.price,
          image: `https://bookstoreweb-five.vercel.app${book.image}`,
          quantity: quantity,
        },
      }),
    });

    const data = await response.json();
    if (response.ok) {
      toast.success(data.message || "Order placed successfully!");
    } else {
      toast.error(data.error || "Order failed");
    }
  } catch (err) {
    alert("Something went wrong: " + err.message);
  console.error("❌ Order error:", err);
    toast.error("Failed to place order: " + err.message);
  }
  }} > Buy It Now
       </button>
</div>


        <p className="delivery-text"><FaTruck /> Estimated delivery: 5-7 days</p>
      </div>
    </div>
  );
}

export default BookDetails;
