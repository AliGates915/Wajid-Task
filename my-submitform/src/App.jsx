import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserForm from './components/User_Form';
import UserGrid from './components/User_Grid';

const App = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('https://randomuser.me/api/?results=10');
        const data = await res.json();
        const formatted = data.results.map(user => ({
          fullName: `${user.name.first} ${user.name.last}`,
          email: user.email,
          profileUrl: user.picture.medium,
          city: user.location.city,
          country: user.location.country,
        }));
        setUsers(formatted);
        setFilteredUsers(formatted);
      } catch {
        setError('Failed to fetch users.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const addUser = (newUser) => {
  const updated = [newUser, ...users];
  setUsers(updated);
  setFilteredUsers(updated);
};


  const removeUser = (email) => {
    const updated = users.filter(user => user.email !== email);
    setUsers(updated);
    setFilteredUsers(updated);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    const lowerQuery = query.toLowerCase();
    const results = users.filter(user =>
      user.fullName.toLowerCase().includes(lowerQuery) ||
      user.email.toLowerCase().includes(lowerQuery)
    );
    setFilteredUsers(results);
  };

  if (loading) return <p className="text-center mt-4">Loading users...</p>;
  if (error) return <p className="text-center text-red-700">{error}</p>;

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <UserGrid
              users={filteredUsers}
              onRemove={removeUser}
              onSearch={handleSearch}
              searchValue={searchQuery}
              onAddClick={() => window.location.href = '/add-user'}
            />
          }
        />
        <Route
          path="/add-user"
          element={
            <UserForm onAddUser={(newUser) => addUser(newUser, window.history.back)} />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
