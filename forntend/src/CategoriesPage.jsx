 import React from 'react';
 import { useState ,useEffect} from 'react';
 import FilterSidebar from './FilterSidebar.jsx';
 import BookGrid from './BookGrid.jsx';
 import books from './Books.js';
 import BookCard from './BookCard.jsx';
 import './CategoriesPage.css';

 

function CategoriesPage({ searchTerm, 
  cartItems, 
  wishlistItems, 
  onToggleCart, 
  onToggleWishlist,
  user
}) {
   const [selectedFilters, setSelectedFilters] = useState([]);
   const [currpage, setCurrpage] = useState(1);
  const booksPerPage = 6;

  //--filtering books 
   const filteredBooks = books.filter((book) => {

    // Availability
  const showInStock = selectedFilters.includes('In Stock');
  const showOutOfStock = selectedFilters.includes('Out of Stock');
  const matchesStock = !showInStock && !showOutOfStock
    || (showInStock && book.inStock > 0)
    || (showOutOfStock && book.inStock === 0);

  // Price Range
    // Price
  const matchesPrice = selectedFilters.some(filter => {
    if (filter === '350 - 450') return book.price >= 350 && book.price < 450;
    if (filter === '450 - 550') return book.price >= 450 && book.price < 550;
    if (filter === '550 - 600') return book.price >= 550 && book.price < 600;
    if (filter === 'Over 600') return book.price >= 600;
    return false;
  }) || !selectedFilters.some(f => f.includes('-') || f === 'Over 600');

  // Author
     const allAuthors = [...new Set(books.map(b => b.author))];
     const selectedAuthorFilters = selectedFilters.filter(f => allAuthors.includes(f));

     const matchesAuthor = selectedAuthorFilters.length === 0 
     ? true 
     : selectedAuthorFilters.includes(book.author);
    const title = book.title || '';
    const author = book.author || '';
    const matchesSearch = title.toLowerCase().includes(searchTerm.toLowerCase()) || author.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesStock && matchesPrice && matchesAuthor && matchesSearch;
  });



  // --- Pagination Logic ---
  const totalpages = Math.ceil(filteredBooks.length / booksPerPage);
  const paginatedBooks = filteredBooks.slice(
    (currpage - 1) * booksPerPage,
    currpage * booksPerPage
  );

  // Reset to page 1 if filters change
  useEffect(() => {
    setCurrpage(1);
  }, [selectedFilters]);

  const buttonStyle = (isActive) => ({
    margin: '0 4px',
    padding: '5px 10px',
    backgroundColor: isActive ? '#333' : '#f0f0f0',
    color: isActive ? '#fff' : '#000',
    border: '1px solid #ccc',
    cursor: 'pointer',
  });
 console.log("user cat", user);
   return (
     <div className='categories-container' style={{ display: 'flex' }}>
       <div className='filter-sidebar'>
        <FilterSidebar
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
        />
      </div>

    
      <main className='book-listing'>
  <BookGrid 
    books={paginatedBooks}
    cartItems={cartItems}
    wishlistItems={wishlistItems}
    onToggleCart={onToggleCart}
    onToggleWishlist={onToggleWishlist}
    user={user} 
  />

  {/* Pagination Controls */}
  <div className='pagination-buttons' style={{ marginTop: '20px', textAlign: 'center' }}>
          <button
            onClick={() => setCurrpage((prev) => prev - 1)}
            disabled={currpage === 1}
            style={buttonStyle(currpage === 1)}
          >
            ⬅ Prev
          </button>

          {Array.from({ length: totalpages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => setCurrpage(index + 1)}
              style={buttonStyle(currpage === index + 1)}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrpage((prev) => prev + 1)}
            disabled={currpage === totalpages}
            style={buttonStyle(currpage === totalpages)}
          >
            Next ➡
          </button>
        </div>
      </main>
    </div>
  );

}

export default CategoriesPage;
