import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const Header = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="header">
      <h1>Disaster Resource Sharing</h1>
      <div>
        <span>{user.name} ({user.role})</span>
        <button onClick={logout}>Logout</button>
      </div>
    </header>
  );
};

export default Header;