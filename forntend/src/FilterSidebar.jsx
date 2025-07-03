import React from 'react'
import {useState} from 'react';

function FilterSidebar({ selectedFilters, setSelectedFilters }) {

    
  const handleFilterChange = (label) => {
    setSelectedFilters((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  const handleRemoveFilter = (label) => {
    setSelectedFilters((prev) => prev.filter((item) => item !== label));
  };


   const renderFilter = (label) => (
  <label key={label}>
    <input
      type="checkbox"
      checked={selectedFilters.includes(label)}
      onChange={() => handleFilterChange(label)}
    />
    {label}
    <br />
  </label>
);


  return (
    <div>
        <div className="filter-sidebar">
            <h2>Filter:</h2>
            <div className='selected-filters'>
              {selectedFilters.map((filter) => (
                <span key={filter} className='filter-badge'>
                  {filter}
                  <button onClick={() => handleRemoveFilter(filter)}>x</button>
                </span>
              ))}
            </div>

        </div>

        <div className="filter-group">
             <h3>Availability</h3>
             {renderFilter("In Stock")}
             {renderFilter("Out of Stock")}
        </div>


        <div className="filter-group">
                <h3>Price Range</h3>
                {renderFilter('350 - 450')}
                <br />
                {renderFilter('450 - 550')}
                <br />
                {renderFilter('550 - 600')}
                 <br />
                {renderFilter('Over 600')}

        </div>
        <div className='filter-group'>
            <h3>Author</h3>
            {renderFilter("Morgan Housel")}
            {renderFilter("James Clear")}
            {renderFilter("Cal Newport")}
        </div>

    </div>
  )
}

export default FilterSidebar;