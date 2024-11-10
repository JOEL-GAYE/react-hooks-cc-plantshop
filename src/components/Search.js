import React from "react";

function Search({ onSearch }) {
  function handleSearchChange(event) {
    onSearch(event); // Pass the event to the parent handler
  }

  return (
    <div className="searchbar">
      <label htmlFor="search">Search Plants:</label>
      <input
        type="text"
        id="search"
        placeholder="Type a name to search..."
        onChange={handleSearchChange}
      />
    </div>
  );
}

export default Search;
