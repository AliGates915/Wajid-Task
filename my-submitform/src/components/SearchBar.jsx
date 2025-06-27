import React from "react";

function SearchBar({ onSearch }) {
  return (
    <div className="max-w-xl mx-auto mb-6">
      <label htmlFor="search" className="block mb-2 text-sm font-medium text-gray-700">
        Search Users
      </label>
      <input
        id="search"
        type="text"
        placeholder="Search by name or email..."
        onChange={(e) => onSearch(e.target.value)}
        className="w-full p-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Search by name or email"
      />
    </div>
  );
}

export default SearchBar;
