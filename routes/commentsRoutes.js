const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, commentController.getAllComments);
router.post('/', authMiddleware, commentController.createComment);
router.get('/:id', authMiddleware, commentController.getCommentById);
router.put('/:id', authMiddleware, commentController.updateCommentById);
router.delete('/:id', authMiddleware, commentController.deleteCommentById);

module.exports = router;