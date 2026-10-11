import React from 'react';

const SearchBar = ({ searchTerm, onSearchChange, onClearSearch }) => {
  return (
    <div className="search-bar-container">
      <label htmlFor="product-search-input" className="search-label">
        <span className="search-icon" aria-hidden="true">🔍</span>
        Search:
      </label>
      <div className="search-input-wrapper">
        <input
          id="product-search-input"
          type="text"
          className="search-input"
          placeholder="Search products by name..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          autoComplete="off"
        />
        {searchTerm && (
          <button
            type="button"
            className="search-clear-btn"
            onClick={onClearSearch}
            title="Clear search"
            aria-label="Clear search query"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
