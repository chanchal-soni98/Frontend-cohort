import React from 'react';

const SearchBar = ({ searchQuery, setSearchQuery, sortBy, setSortBy, onClear }) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search by name..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="recent">Sort by Most Recent</option>
        <option value="rating">Sort by Rating</option>
      </select>
      <button onClick={onClear}>Clear All Feedback</button>
    </div>
  );
};

export default SearchBar;
