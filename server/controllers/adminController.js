const User = require('../models/User');
const Post = require('../models/Post');
const Comment = require('../models/Comment');

// @desc    Get all users (admin only)
// @route   GET /api/admin/users
// @access  Private/Admin
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// @desc    Ban/UnBan user (admin only)
// @route   PUT /api/admin/users/:id/ban
// @access  Private/Admin
exports.toggleUserBan = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    user.isActive = !user.isActive;
    await user.save();

    res.status(200).json({
      success: true,
      message: `User ${user.isActive ? 'unbanned' : 'banned'} successfully`,
      user,
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// @desc    Delete user (admin only)
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    // Don't allow deleting admin users
    if (user.role === 'admin') {
      return res.status(403).json({ 
        success: false, 
        message: 'Cannot delete admin users' 
      });
    }

    // Delete all user's posts and comments
    const userPosts = await Post.find({ author: req.params.id });
    
    for (let post of userPosts) {
      await Comment.deleteMany({ post: post._id });
    }
    
    await Post.deleteMany({ author: req.params.id });
    await Comment.deleteMany({ author: req.params.id });

    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'User deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// @desc    Get blog analytics (admin only)
// @route   GET /api/admin/analytics
// @access  Private/Admin
exports.getAnalytics = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalStudents = await User.countDocuments({ role: 'student' });
    const totalAdmins = await User.countDocuments({ role: 'admin' });
    const totalPosts = await Post.countDocuments();
    const totalComments = await Comment.countDocuments();
    const totalActiveUsers = await User.countDocuments({ isActive: true });

    // Get top posts by views
    const topPosts = await Post.find()
      .sort({ viewCount: -1 })
      .limit(5)
      .populate('author', 'username');

    // Get top posts by likes
    const topLikedPosts = await Post.aggregate([
      {
        $addFields: {
          likesCount: { $size: '$likes' }
        }
      },
      { $sort: { likesCount: -1 } },
      { $limit: 5 }
    ]);

    res.status(200).json({
      success: true,
      analytics: {
        totalUsers,
        totalStudents,
        totalAdmins,
        totalPosts,
        totalComments,
        totalActiveUsers,
        topPosts,
        topLikedPosts,
      },
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// @desc    Get flagged content for moderation (admin only)
// @route   GET /api/admin/flagged
// @access  Private/Admin
exports.getFlaggedContent = async (req, res) => {
  try {
    // Get posts and comments from inactive users or with negative engagement
    const flaggedPosts = await Post.find()
      .where('likes').size(0)
      .limit(20)
      .populate('author', 'username');

    res.status(200).json({
      success: true,
      flaggedPosts,
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};
