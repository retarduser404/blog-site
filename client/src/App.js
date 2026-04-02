import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import './styles/global.css';

// Components
import Navbar from './components/Navbar';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CreatePost from './pages/CreatePost';
import PostDetail from './pages/PostDetail';
import Profile from './pages/Profile';
import AdminPanel from './pages/AdminPanel';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div style={{ padding: '40px', textAlign: 'center', color: 'var(--accent-green)' }}>
      &gt; LOADING...
    </div>;
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

const AdminRoute = ({ children }) => {
  const { isAdmin, loading } = useAuth();

  if (loading) {
    return <div style={{ padding: '40px', textAlign: 'center', color: 'var(--accent-green)' }}>
      &gt; LOADING...
    </div>;
  }

  return isAdmin ? children : <Navigate to="/" />;
};

function App() {
  // Security: Disable developer tools, view source, and right-click
  useEffect(() => {
    // Disable Ctrl+U (View Source)
    const handleKeyDown = (e) => {
      // Ctrl+U - View Source
      if ((e.ctrlKey || e.metaKey) && e.key === 'u') {
        e.preventDefault();
        console.warn('⚠️ Access Denied: View source is disabled');
        return false;
      }
      
      // Ctrl+Shift+I - Developer Tools
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'I') {
        e.preventDefault();
        console.warn('⚠️ Access Denied: Developer tools are disabled');
        return false;
      }
      
      // F12 - Developer Tools
      if (e.key === 'F12') {
        e.preventDefault();
        console.warn('⚠️ Access Denied: Developer tools are disabled');
        return false;
      }
      
      // Ctrl+Shift+C - Inspect Element
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'C') {
        e.preventDefault();
        console.warn('⚠️ Access Denied: Inspect element is disabled');
        return false;
      }
      
      // Ctrl+Shift+J - Console
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'J') {
        e.preventDefault();
        console.warn('⚠️ Access Denied: Console is disabled');
        return false;
      }
    };

    // Disable Right-Click Context Menu
    const handleContextMenu = (e) => {
      e.preventDefault();
      console.warn('⚠️ Access Denied: Right-click is disabled');
      return false;
    };

    // Add event listeners
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('contextmenu', handleContextMenu);

    // Cleanup
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);

  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/create-post"
            element={
              <ProtectedRoute>
                <CreatePost />
              </ProtectedRoute>
            }
          />
          <Route path="/posts/:id" element={<PostDetail />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminPanel />
              </AdminRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
