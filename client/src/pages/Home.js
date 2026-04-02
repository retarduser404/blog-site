import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';
import './Home.css';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const { isAuthenticated, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!authLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, authLoading, navigate]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchPosts();
    }
  }, [page, isAuthenticated]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/posts?page=${page}&limit=10`);
      setPosts(response.data.posts);
      setTotalPages(response.data.pagination.pages);
    } catch (err) {
      setError('Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  // Show loading while checking authentication
  if (authLoading) {
    return (
      <div className="container">
        <div className="loading">&gt; VERIFYING CREDENTIALS...</div>
      </div>
    );
  }

  // Redirect happens in useEffect, but show loading while it processes
  if (!isAuthenticated) {
    return (
      <div className="container">
        <div className="loading">&gt; REDIRECTING TO LOGIN...</div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container">
        <div className="loading">&gt; LOADING POSTS...</div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="home-header">
        <h1>&gt; CYBERSECURITY BLOG</h1>
        <p>CONNECTING MINDS. SHARING KNOWLEDGE. SECURING THE FUTURE.</p>
      </div>

      {error && <div className="error">{error}</div>}

      {posts.length === 0 ? (
        <div className="no-posts">
          <p>&gt; NO POSTS AVAILABLE</p>
          <p className="subtext">START BY CREATING YOUR FIRST POST</p>
        </div>
      ) : (
        <div className="posts-grid">
          {posts.map((post) => (
            <Link key={post._id} to={`/posts/${post._id}`} className="post-card-link">
              <div className="post-card">
                <div className="post-header">
                  <h2>{post.title}</h2>
                  <span className="post-author">{post.author?.username}</span>
                </div>

                <p className="post-content">{post.content.substring(0, 150)}...</p>

                <div className="post-meta">
                  <span className="post-date">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </span>
                  <span className="post-stats">
                    👁 {post.viewCount} | ❤ {post.likes?.length || 0}
                  </span>
                </div>

                {post.tags && post.tags.length > 0 && (
                  <div className="post-tags">
                    {post.tags.map((tag) => (
                      <span key={tag} className="tag">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => setPage(Math.max(1, page - 1))}
            disabled={page === 1}
            className="btn-pagination"
          >
            PREVIOUS
          </button>

          <span className="page-info">
            PAGE {page} OF {totalPages}
          </span>

          <button
            onClick={() => setPage(Math.min(totalPages, page + 1))}
            disabled={page === totalPages}
            className="btn-pagination"
          >
            NEXT
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
