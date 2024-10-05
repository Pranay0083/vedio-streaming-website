const express = require('express');
const videoController = require('../controllers/videoController');
const auth = require('../middleware/auth');
const roleBasedMiddleware = require('../middleware/roleMiddleware');
const router = express.Router();

router.get('/:courseId/videos', auth, videoController.getCourseVideos);
router.get('/:courseId/videos/:videoId', auth, videoController.getVideo);
router.post('/:courseId/videos', auth, roleBasedMiddleware(['teacher']), videoController.createVideo);
router.put('/:courseId/videos/:videoId', auth, roleBasedMiddleware(['teacher']), videoController.updateVideo);
router.delete('/:courseId/videos/:videoId', auth, roleBasedMiddleware(['teacher']), videoController.deleteVideo);

module.exports = router;