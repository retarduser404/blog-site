import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import './PostDetail.css';

const PostDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/posts/${id}`);
      setPost(response.data.post);
      setComments(response.data.post.comments || []);
      setIsLiked(response.data.post.likes?.includes(user?._id));
    } catch (err) {
      setError('Failed to load post');
    } finally {
      setLoading(false);
    }
  };

  const handleLikePost = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      const response = await api.put(`/posts/${id}/like`);
      setPost(response.data.post);
      setIsLiked(!isLiked);
    } catch (err) {
      setError('Failed to like post');
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }

    if (!newComment.trim()) return;

    try {
      const response = await api.post(`/posts/${id}/comments`, {
        content: newComment,
      });
      setComments([response.data.comment, ...comments]);
      setNewComment('');
    } catch (err) {
      setError('Failed to add comment');
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm('Delete this comment?')) return;

    try {
      await api.delete(`/comments/${commentId}`);
      setComments(comments.filter((c) => c._id !== commentId));
    } catch (err) {
      setError('Failed to delete comment');
    }
  };

  const handleDeletePost = async () => {
    if (!window.confirm('Delete this post? This action cannot be undone.')) return;

    try {
      await api.delete(`/posts/${id}`);
      navigate('/');
    } catch (err) {
      setError('Failed to delete post');
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading">&gt; LOADING POST...</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container">
        <div className="error">POST NOT FOUND</div>
      </div>
    );
  }

  const canDelete = user && (user.id === post.author._id || user.role === 'admin');

  return (
    <div className="container">
      <div className="post-detail-container">
        {error && <div className="error">{error}</div>}

        <div className="post-header-detail">
          <h1>{post.title}</h1>
          <div className="post-meta-detail">
            <span className="author">By {post.author?.username}</span>
            <span className="date">
              {new Date(post.createdAt).toLocaleDateString()}
            </span>
            <span className="views">👁 {post.viewCount} views</span>
          </div>
        </div>

        <div className="post-content-detail">{post.content}</div>

        {post.tags && post.tags.length > 0 && (
          <div className="post-tags-detail">
            {post.tags.map((tag) => (
              <span key={tag} className="tag-detail">
                #{tag}
              </span>
            ))}
          </div>
        )}

        <div className="post-actions">
          <button
            onClick={handleLikePost}
            className={`like-button ${isLiked ? 'liked' : ''}`}
          >
            ❤ {post.likes?.length || 0} LIKES
          </button>

          {canDelete && (
            <button onClick={handleDeletePost} className="delete-button">
              🗑 DELETE POST
            </button>
          )}
        </div>

        <div className="comments-section">
          <h2>&gt; COMMENTS ({comments.length})</h2>

          {user && (
            <form onSubmit={handleAddComment} className="comment-form">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Share your thoughts..."
                rows="3"
              />
              <button type="submit" className="submit-comment">
                POST COMMENT
              </button>
            </form>
          )}

          {!user && (
            <p className="login-prompt">
              <a href="/login">Login</a> to comment on this post
            </p>
          )}

          <div className="comments-list">
            {comments.length === 0 ? (
              <p className="no-comments">NO COMMENTS YET</p>
            ) : (
              comments.map((comment) => (
                <div key={comment._id} className="comment">
                  <div className="comment-header">
                    <span className="comment-author">{comment.author?.username}</span>
                    <span className="comment-date">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="comment-content">{comment.content}</p>
                  {user && (user.id === comment.author?._id || user.role === 'admin') && (
                    <button
                      onClick={() => handleDeleteComment(comment._id)}
                      className="delete-comment-btn"
                    >
                      DELETE
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
