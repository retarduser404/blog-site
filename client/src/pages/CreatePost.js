import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import './CreatePost.css';

const CreatePost = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    tags: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

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

    if (!formData.title || !formData.content) {
      setError('Title and content are required');
      return;
    }

    setLoading(true);

    try {
      const response = await api.post('/posts', {
        title: formData.title,
        content: formData.content,
        tags: formData.tags ? formData.tags.split(',').map((tag) => tag.trim()) : [],
      });

      navigate(`/posts/${response.data.post._id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="create-post-container">
        <div className="create-post-header">
          <h1>&gt; NEW POST</h1>
          <p className="terminal-text">SHARE YOUR CYBERSECURITY INSIGHTS</p>
        </div>

        {error && <div className="error">{error}</div>}

        <form onSubmit={handleSubmit} className="post-form">
          <div className="form-group">
            <label htmlFor="title">POST TITLE</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter post title..."
              maxLength={200}
              required
            />
            <span className="char-count">{formData.title.length}/200</span>
          </div>

          <div className="form-group">
            <label htmlFor="content">CONTENT</label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Write your post content here..."
              rows="15"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="tags">TAGS (comma separated)</label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="security, hacking, tutorial"
            />
          </div>

          <div className="form-actions">
            <button type="submit" disabled={loading} className="submit-button">
              {loading ? 'PUBLISHING...' : 'PUBLISH POST'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/')}
              className="cancel-button"
            >
              CANCEL
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
