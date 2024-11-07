const express = require('express');
const videoController = require('../controllers/videoController');
const auth = require('../middleware/auth');
const roleBasedMiddleware = require('../middleware/roleMiddleware');
const router = express.Router();

router.get('/:courseId', auth, videoController.getCourseVideos);
router.get('/:courseId/:videoId', auth, videoController.getVideo);
router.post('/:courseId', auth, roleBasedMiddleware(['teacher']), videoController.createVideo);
router.put('/:courseId/:videoId', auth, roleBasedMiddleware(['teacher']), videoController.updateVideo);
router.delete('/:courseId/:videoId', auth, roleBasedMiddleware(['teacher']), videoController.deleteVideo);

module.exports = router;