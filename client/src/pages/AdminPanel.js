import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import './AdminPanel.css';

const AdminPanel = () => {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('analytics');
  const [analytics, setAnalytics] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  useEffect(() => {
    if (!isAdmin) {
      navigate('/');
      return;
    }

    if (activeTab === 'analytics') {
      fetchAnalytics();
    } else if (activeTab === 'users') {
      fetchUsers();
    }
  }, [activeTab, isAdmin]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const response = await api.get('/admin/analytics');
      setAnalytics(response.data.analytics);
    } catch (err) {
      setError('Failed to load analytics');
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await api.get('/admin/users');
      setUsers(response.data.users);
    } catch (err) {
      setError('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleBan = async (userId) => {
    try {
      const response = await api.put(`/admin/users/${userId}/ban`);
      setUsers(users.map((u) => (u._id === userId ? response.data.user : u)));
    } catch (err) {
      setError('Failed to toggle user ban status');
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await api.delete(`/admin/users/${userId}`);
      setUsers(users.filter((u) => u._id !== userId));
      setShowDeleteConfirm(null);
    } catch (err) {
      setError('Failed to delete user');
    }
  };

  return (
    <div className="container">
      <div className="admin-container">
        <div className="admin-header">
          <h1>&gt; ADMIN CONTROL PANEL</h1>
          <p className="terminal-text">SYSTEM ADMINISTRATION AND MONITORING</p>
        </div>

        {error && <div className="error">{error}</div>}

        <div className="admin-tabs">
          <button
            className={`tab-button ${activeTab === 'analytics' ? 'active' : ''}`}
            onClick={() => setActiveTab('analytics')}
          >
            📊 ANALYTICS
          </button>
          <button
            className={`tab-button ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            👥 USERS
          </button>
        </div>

        <div className="admin-content">
          {loading ? (
            <div className="loading">&gt; LOADING...</div>
          ) : activeTab === 'analytics' ? (
            <div className="analytics-grid">
              {analytics && (
                <>
                  <div className="stat-card">
                    <h3>TOTAL USERS</h3>
                    <p className="stat-number">{analytics.totalUsers}</p>
                  </div>
                  <div className="stat-card">
                    <h3>ACTIVE USERS</h3>
                    <p className="stat-number">{analytics.totalActiveUsers}</p>
                  </div>
                  <div className="stat-card">
                    <h3>STUDENTS</h3>
                    <p className="stat-number">{analytics.totalStudents}</p>
                  </div>
                  <div className="stat-card">
                    <h3>ADMINS</h3>
                    <p className="stat-number">{analytics.totalAdmins}</p>
                  </div>
                  <div className="stat-card">
                    <h3>TOTAL POSTS</h3>
                    <p className="stat-number">{analytics.totalPosts}</p>
                  </div>
                  <div className="stat-card">
                    <h3>TOTAL COMMENTS</h3>
                    <p className="stat-number">{analytics.totalComments}</p>
                  </div>

                  <div className="stat-card full-width">
                    <h3>&gt; TOP POSTS (BY VIEWS)</h3>
                    <div className="top-posts">
                      {analytics.topPosts.map((post) => (
                        <div key={post._id} className="top-post-item">
                          <p className="post-title">{post.title}</p>
                          <p className="post-author">By {post.author?.username}</p>
                          <p className="post-views">👁 {post.viewCount} views</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="users-container">
              {users.length === 0 ? (
                <p className="no-data">NO USERS FOUND</p>
              ) : (
                <div className="users-table">
                  {users.map((u) => (
                    <div key={u._id} className="user-row">
                      <div className="user-info">
                        <p className="user-name">{u.username}</p>
                        <p className="user-email">{u.email}</p>
                      </div>
                      <div className="user-role">
                        <span className={`badge ${u.role}`}>{u.role.toUpperCase()}</span>
                      </div>
                      <div className="user-status">
                        <span className={`status ${u.isActive ? 'active' : 'banned'}`}>
                          {u.isActive ? '🟢 ACTIVE' : '🔴 BANNED'}
                        </span>
                      </div>
                      <div className="user-actions">
                        {u.role === 'student' && (
                          <>
                            <button
                              onClick={() => handleToggleBan(u._id)}
                              className={`action-btn ${u.isActive ? 'ban-btn' : 'unban-btn'}`}
                            >
                              {u.isActive ? 'BAN' : 'UNBAN'}
                            </button>
                            <button
                              onClick={() => setShowDeleteConfirm(u._id)}
                              className="action-btn delete-btn"
                            >
                              DELETE
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {showDeleteConfirm && (
          <div className="confirm-modal">
            <div className="modal-content">
              <h2>CONFIRM DELETE</h2>
              <p>Are you sure you want to delete this user?</p>
              <p className="warning">This action cannot be undone.</p>
              <div className="modal-actions">
                <button
                  onClick={() => handleDeleteUser(showDeleteConfirm)}
                  className="confirm-btn"
                >
                  DELETE
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  className="cancel-confirm-btn"
                >
                  CANCEL
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
