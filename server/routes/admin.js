const express = require('express');
const {
  getAllUsers,
  toggleUserBan,
  deleteUser,
  getAnalytics,
  getFlaggedContent,
} = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// All admin routes require authentication and admin role
router.use(protect, authorize('admin'));

router.get('/users', getAllUsers);
router.put('/users/:id/ban', toggleUserBan);
router.delete('/users/:id', deleteUser);
router.get('/analytics', getAnalytics);
router.get('/flagged', getFlaggedContent);

module.exports = router;
