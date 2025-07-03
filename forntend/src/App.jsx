import React from 'react'
import BookDetails from './BookDetails'; 
import Navbar from './Navbar';
import Home from './Home';
import CartPage from './CartPage';       
import CategoriesPage from './CategoriesPage';
import AboutUs from './AboutUs';
import Register from './Register';
import Login from './Login'
import { Routes,Route } from 'react-router-dom';
import { useState ,useEffect} from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const App = () => {

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [searchTerm, setSearchTerm] = useState('');

  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
  const savedUser = JSON.parse(localStorage.getItem("user"));
  if (savedUser) setUser(savedUser);
}, []);


  const toggleCartItem = (book) => {
  if (!user ) {
    alert("Please login to add to cart.");
    return;
  }
  setCartItems((prev) => {
    const exists = prev.some(item => item.id === book.id);
    return exists
      ? prev.filter(item => item.id !== book.id)
      : [...prev, { ...book, quantity: 1 }];
  });
};

const toggleWishlistItem = (book) => {
  if (!user) {
    alert("Please login to add to wishlist.");
    return;
  }
  setWishlistItems((prev) => {
    const exists = prev.some(item => item.id === book.id);
    return exists
      ? prev.filter(item => item.id !== book.id)
      : [...prev, book];
  });
};


const handleRemoveFromCart = (id) => {
  setCartItems(prev => prev.filter(item => item.id !== id));
};

const handleRemoveFromWishlist = (id) => {
  setWishlistItems(prev => prev.filter(item => item.id !== id));
};

const updateCartQuantity = (id, delta) => {
  setCartItems(prev =>
    prev.map(item =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item
    )
  );
};
console.log("user", user);


  return (
    <>
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} cartCount={cartItems.length} wishlistCount={wishlistItems.length} user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home searchTerm={searchTerm} setSearchTerm={setSearchTerm} 
              onToggleCart={toggleCartItem}
              onToggleWishlist={toggleWishlistItem}
              cartItems={cartItems}
              wishlistItems={wishlistItems} 
              user={user} />} />

        <Route path="/book/:id" element={<BookDetails onToggleWishlist={toggleWishlistItem}  wishlistItems={wishlistItems} 
    cartItems={cartItems}  user={user} />} />


        <Route path="/cart" element={<CartPage 
                cartItems={cartItems} 
                wishlistItems={wishlistItems} 
                onRemoveFromCart={handleRemoveFromCart} 
                onRemoveFromWishlist={handleRemoveFromWishlist}
                onUpdateQuantity={updateCartQuantity} 
                />} />
        <Route path="/about" element={<AboutUs />} />
        <Route
          path="/categories"
          element={
            <CategoriesPage
              searchTerm={searchTerm}
              cartItems={cartItems}
              setCartItems={setCartItems}
              wishlistItems={wishlistItems}
              setWishlistItems={setWishlistItems}
              onToggleCart={toggleCartItem}
              onToggleWishlist={toggleWishlistItem}
              user={user}
            />
          }
        />

        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<Register setUser={setUser} />} />

      </Routes>
      <ToastContainer 
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        pauseOnFocusLoss={false}
        theme="light"
      />
     
    </>
   
  )
}

export default App