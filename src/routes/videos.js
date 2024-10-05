const express = require('express');
const videoController = require('../controllers/videoController');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/:courseId/videos', auth, videoController.getCourseVideos);
router.get('/:courseId/videos/:videoId', auth, videoController.getVideo);
router.post('/:courseId/videos', auth, videoController.createVideo);
router.put('/:courseId/videos/:videoId', auth, videoController.updateVideo);
router.delete('/:courseId/videos/:videoId', auth, videoController.deleteVideo);

module.exports = router;

