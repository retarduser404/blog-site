import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <span className="terminal-symbol">&gt;</span> CYBERLOG
        </Link>
        
        <div className="navbar-menu">
          <Link to="/" className="nav-link">HOME</Link>
          
          {user && (
            <>
              <Link to="/create-post" className="nav-link">NEW POST</Link>
              <Link to="/profile" className="nav-link">PROFILE</Link>
              
              {isAdmin && (
                <Link to="/admin" className="nav-link admin-link">ADMIN PANEL</Link>
              )}
            </>
          )}
        </div>

        <div className="navbar-auth">
          {user ? (
            <div className="user-info">
              <span className="username">{user.username}</span>
              <span className="role-badge">{user.role.toUpperCase()}</span>
              <button onClick={handleLogout} className="logout-btn">LOGOUT</button>
            </div>
          ) : (
            <>
              <Link to="/login" className="nav-button login-btn">LOGIN</Link>
              <Link to="/register" className="nav-button register-btn">REGISTER</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
