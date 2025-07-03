import React from 'react'
import books from './Books.js';
import BookCard from './BookCard.jsx';
import './BookGrid.css'; 
function BookGrid({ books, cartItems, wishlistItems, onToggleCart, onToggleWishlist ,user}) {
  console.log(" Filtered books received by BookGrid:", books);
 console.log("user in BookGrid:", user);
  return (
    <div className="book-grid">
      {books.map((book) => (
        <BookCard
          key={book.id}
          id={book.id}
          title={book.title}
          author={book.author}
          price={book.price}
          oldPrice={book.oldPrice}
          discount={book.discount}
          image={book.image}
          onToggleCart={onToggleCart} 
          onToggleWishlist={onToggleWishlist} 
        /*   onToggleCart={() => onToggleCart(book)}  Pass book
           onToggleWishlist={() => onToggleWishlist(book)}   Pass book*/
          isInCart={cartItems.some(item => item.id === book.id)}
          isInWishlist={wishlistItems.some(item => item.id === book.id)}
          user={user} // Pass user 
          
        />
      ))}
    </div>
  );
}



export default BookGrid;