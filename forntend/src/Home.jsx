import React, { useState } from 'react';
import BookCard from "./BookCard";
import books from './Books';

function Home({ searchTerm, setSearchTerm ,onToggleCart, onToggleWishlist, cartItems, wishlistItems,user }) {

  const [currpage, setCurrPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", 'Finance', 'Entrepreneurship', 'Self-Help'];

  // Filtered books based on category and search term
  const filteredBooks = books.filter((book) => {
    const title = book.title || '';
    const author = book.author || '';
    const category = book.category || '';
    
    const matchesCategory = selectedCategory === 'All' || category === selectedCategory;
    const matchesSearch =
      title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      author.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  // Pagination logic
  const bookperpg = 9;
  const totalpages = Math.ceil(filteredBooks.length / bookperpg);
  const endindex = currpage * bookperpg;
  const startindex = endindex - bookperpg;
  const currbooks = filteredBooks.slice(startindex, endindex);

  const gotopage = (page) => setCurrPage(page);

  const prevpage = () => {
    if (currpage > 1) setCurrPage(currpage - 1);
  };

  const nextpage = () => {
    if (currpage < totalpages) setCurrPage(currpage + 1);
  };

  return (
    <>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>

        {/* Category Buttons */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', margin: '20px 0' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setCurrPage(1);
              }}
              style={{
                padding: '10px 20px',
                backgroundColor: selectedCategory === cat ? '#d9381e' : '#fff',
                color: selectedCategory === cat ? '#fff' : '#000',
                border: '1px solid #ccc',
                boxShadow: '2px 2px 6px rgba(0,0,0,0.1)',
                cursor: 'pointer',
                fontWeight: 'bold',
                borderRadius: '4px'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Book Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '20px',
          padding: '40px'
        }}>
          {currbooks.map((book) => (
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
              isInCart={cartItems.some(item => item.id === book.id)}
              isInWishlist={wishlistItems.some(item => item.id === book.id)}
              user={user} 
            />
          ))}
        </div>

        {/* Pagination Buttons */}
        <div style={{ marginBottom: '40px' }}>
          <button onClick={prevpage} disabled={currpage === 1} style={buttonStyle(currpage === 1)}>
            ⬅ Prev
          </button>
          {Array.from({ length: totalpages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => gotopage(index + 1)}
              style={buttonStyle(currpage === index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={nextpage}
            disabled={currpage === totalpages}
            style={buttonStyle(currpage === totalpages)}
          >
            Next ➡
          </button>
        </div>

      </div>
    </>
  );
}

const buttonStyle = (isActive) => ({
  padding: '8px 14px',
  borderRadius: '5px',
  backgroundColor: isActive ? '#333' : '#f0f0f0',
  color: isActive ? '#fff' : '#000',
  border: 'none',
  cursor: isActive ? 'default' : 'pointer',
  fontWeight: 'bold',
  margin: '0 5px'
});

export default Home;
