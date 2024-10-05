const express = require('express');
const enrollmentController = require('../controllers/enrollmentController');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/', auth, enrollmentController.getEnrollments);
router.post('/:courseId', auth, enrollmentController.createEnrollment);
router.delete('/:courseId', auth, enrollmentController.deleteEnrollment);

module.exports = router;