const express = require('express');
const router = express.Router();
const videoController = require('../controllers/videoController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, videoController.getAllVideos);
router.post('/', authMiddleware, videoController.createVideo);
router.get('/:id', authMiddleware, videoController.getVideoById);
router.put('/:id', authMiddleware, videoController.updateVideoById);
router.delete('/:id', authMiddleware, videoController.deleteVideoById);

module.exports = router;
