const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

router.get('/', commentController.getAllComments);
router.post('/', commentController.createComment);
router.get('/:id', commentController.getCommentById);
router.put('/:id', commentController.updateCommentById);
router.delete('/:id', commentController.deleteCommentById);

module.exports = router;