import { Link } from 'react-router-dom';
import bookLogo from './assets/booklogo.png';
import './Navbar.css'; 
import React, { useState } from 'react';

function Navbar({ searchTerm, setSearchTerm, cartCount,user,setUser }) {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setShowDropdown(false);
  };


  return (
    <nav className="navbar">
      
      {/* Logo */}
       <img src={bookLogo} alt="BookStore Logo" className="navbar-logo" /> 
      {/* Links */}
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/categories">Categories</Link>
        <Link to="/about">About Us</Link>
        <Link to="/cart">Cart {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
</Link>

      </div>

      {/* Search */}
       <div className="navbar-search-signup">
        <input
          type="text"
          placeholder="Search by title or author..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
         {user ? (
          <div className="user-info-dropdown">
              <div className="user-display" onClick={() => setShowDropdown(!showDropdown)}>
             <div className="user-badge">{user.name?.charAt(0).toUpperCase()}</div>
           <span className="user-name">{user.name}</span>
         </div>
          {showDropdown && (
            <div className="dropdown-menu">
            <button onClick={handleLogout}>Logout</button>
          </div>
         )}
      </div>
      ) : (
        <Link to="/login" className="signup-btn">Login</Link>
      )}

      </div>
    </nav>
  );
}

export default Navbar;
