import React from 'react';
import './Book.css';
import { Link ,useNavigate} from 'react-router-dom';
import { FaHeart, FaRegBookmark, FaSearch } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BookCard = ({
  id,
  title,
  author,
  price,
  oldPrice,
  discount,
  image,
  onToggleCart, 
  onToggleWishlist, 
  isInCart,
   isInWishlist,
   user ,
}) => {
  const navigate = useNavigate();
  const handleCartClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      toast.warning("🔐 Please login to add to cart");
      navigate("/login");
      return;
    }

    onToggleCart({ id, title, author, price, oldPrice, discount, image });
    toast.success(`${isInCart ? '❌ Removed from' : '🛒 Added to'} Cart!`);
  };

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      toast.warning("🔐 Please login to add to wishlist");
      navigate("/login");
      return;
    }
    onToggleWishlist({ id, title, author, price, oldPrice, discount, image });
    toast.success(`${isInWishlist ? '❌ Removed from' : '🔖 Added to'} Wishlist!`);
  };
 console.log("user in BookCard:", user);
  return (
    <Link to={`/book/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div className="book-card-modern">
        <div className="book-img-container">
          <img src={image} alt={title} className="book-img" />
          <span className="discount-badge">{discount}</span>
          <div className="hover-icons">
            <button><FaSearch /></button>
            <button onClick={handleCartClick}>
              {isInCart ? '❌' : <FaHeart/>}
            </button>
            <button onClick={handleWishlistClick}>
              {isInWishlist ? '💔' : <FaRegBookmark color="blue" />}
            </button>
          </div>
        </div>
        <div className="book-info">
          <p className="book-author">{author}</p>
          <h3 className="book-title">{title}</h3>
          <p className="book-price">
            <span className="current-price">Rs.{price}</span>
            <span className="old-price">{oldPrice}</span>
          </p>
        </div>
       
      </div>
    </Link>
  );
};

export default BookCard;
