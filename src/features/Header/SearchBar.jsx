// src/features/Header/SearchBar.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerm, selectSearchTerm } from '../../store/redditSlice';
import './Header.css'; // Assuming styles are shared here

const SearchBar = () => {
  const dispatch = useDispatch();
  const currentSearchTerm = useSelector(selectSearchTerm);
  
  // Local state for the input field
  const [searchTermLocal, setSearchTermLocal] = useState(currentSearchTerm);

  const onSearchTermChange = (e) => {
    setSearchTermLocal(e.target.value);
  };

  const onSearchTermSubmit = (e) => {
    e.preventDefault(); // Prevents the browser from refreshing the page
    // Dispatch the term to Redux, which triggers the useEffect in Home.jsx
    dispatch(setSearchTerm(searchTermLocal));
  };

  return (
    <form className="search" onSubmit={onSearchTermSubmit}>
      <input
        type="text"
        className="search-input"
        placeholder="Search Reddit..."
        value={searchTermLocal}
        onChange={onSearchTermChange}
        aria-label="Search posts"
      />
      <button type="submit" className="search-button" aria-label="Search">
        <svg viewBox="0 0 24 24" width="20" height="20">
          <path 
            fill="currentColor" 
            d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
          />
        </svg>
      </button>
    </form>
  );
};

export default SearchBar;
