import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import './Profile.css';

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: user?.username || '',
    avatar: user?.avatar || '',
    bio: user?.bio || '',
  });
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      fetchUserPosts();
    }
  }, [user, navigate]);

  const fetchUserPosts = async () => {
    try {
      const response = await api.get('/posts');
      const userPostsFiltered = response.data.posts.filter(post => post.author._id === user.id);
      setUserPosts(userPostsFiltered);
    } catch (err) {
      setError('Failed to load your posts');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      await api.put('/auth/updateprofile', formData);
      setSuccess('Profile updated successfully!');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="container">
      <div className="profile-container">
        <div className="profile-header">
          <h1>&gt; USER PROFILE</h1>
          <p className="terminal-text">{user.email}</p>
        </div>

        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}

        <div className="profile-content">
          <div className="profile-card">
            <div className="profile-picture-section">
              <img src={formData.avatar} alt="avatar" className="profile-picture" />
              <span className="user-badge">{user.role.toUpperCase()}</span>
            </div>

            <form onSubmit={handleSubmit} className="profile-form">
              <div className="form-group">
                <label htmlFor="username">USERNAME</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="avatar">AVATAR URL</label>
                <input
                  type="url"
                  id="avatar"
                  name="avatar"
                  value={formData.avatar}
                  onChange={handleChange}
                  placeholder="https://example.com/avatar.jpg"
                />
              </div>

              <div className="form-group">
                <label htmlFor="bio">BIO</label>
                <textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  placeholder="Tell something about yourself..."
                  rows="4"
                />
              </div>

              <button type="submit" disabled={loading} className="update-button">
                {loading ? 'UPDATING...' : 'UPDATE PROFILE'}
              </button>
            </form>
          </div>

          <div className="profile-posts">
            <h2>&gt; MY POSTS ({userPosts.length})</h2>
            {userPosts.length === 0 ? (
              <p className="no-posts-message">YOU HAVEN'T POSTED YET</p>
            ) : (
              <div className="posts-list">
                {userPosts.map((post) => (
                  <div key={post._id} className="post-item">
                    <h3>{post.title}</h3>
                    <p className="post-date">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </p>
                    <p className="post-meta">
                      👁 {post.viewCount} | ❤ {post.likes.length}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
