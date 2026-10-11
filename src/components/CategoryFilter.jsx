import React from 'react';
import { CATEGORIES } from '../data/products';

const CategoryFilter = ({ selectedCategory, onCategoryChange }) => {
  return (
    <div className="category-filter-container">
      <label htmlFor="category-select" className="category-label">
        <span className="filter-icon" aria-hidden="true">🏷️</span>
        Category:
      </label>
      <div className="select-wrapper">
        <select
          id="category-select"
          className="category-select"
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
        >
          {CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category} {category === 'All' ? 'Categories' : ''}
            </option>
          ))}
        </select>
        <span className="select-arrow" aria-hidden="true">▼</span>
      </div>
    </div>
  );
};

export default CategoryFilter;
