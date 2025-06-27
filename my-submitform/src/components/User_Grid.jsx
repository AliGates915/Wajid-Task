import React from 'react';
import UserCard from './User_Card';

function UserGrid({ users, onRemove, onSearch, onAddClick, searchValue }) {
  return (
    <div className="mt-5 px-4 sm:px-6 lg:px-8 max-w-screen-xl mx-auto">
      {/* Header & Actions */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800 text-center sm:text-left">
          All Users
        </h1>

        {/* Search input */}
        <div className="w-full sm:w-auto flex flex-col sm:flex-row items-center gap-2">
          <input
            type="text"
            placeholder="Search by name or email"
            value={searchValue}
            onChange={(e) => onSearch(e.target.value)}
            className="w-full sm:w-64 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Add user button */}
        <div className="w-full sm:w-auto">
          <button
            onClick={onAddClick}
            className="w-full sm:w-auto bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            Add User
          </button>
        </div>
      </div>

      {/* No Users */}
      {!users?.length ? (
        <p className="text-center text-gray-500">No users to display.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {users.map(user => (
            <UserCard key={user.email} user={user} onRemove={onRemove} />
          ))}
        </div>
      )}
    </div>
  );
}

export default UserGrid;
