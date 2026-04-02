const express = require('express');
const {
  createComment,
  getComments,
  updateComment,
  deleteComment,
  likeComment,
} = require('../controllers/commentController');
const { protect } = require('../middleware/auth');

const router = express.Router({ mergeParams: true });

router.post('/', protect, createComment);
router.get('/', getComments);
router.put('/:id', protect, updateComment);
router.delete('/:id', protect, deleteComment);
router.put('/:id/like', protect, likeComment);

module.exports = router;
