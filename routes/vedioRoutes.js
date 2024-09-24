const express = require('express');
const router = express.Router();
const videoController = require('../controllers/videoController');

router.get('/', videoController.getAllVideos);
router.post('/', videoController.createVideo);
router.get('/:id', videoController.getVideoById);
router.put('/:id', videoController.updateVideoById);
router.delete('/:id', videoController.deleteVideoById);

module.exports = router;
