const express = require('express');
const courseController = require('../controllers/courseController');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/', courseController.getAllCourses);
router.get('/:id', courseController.getCourse);
router.post('/', auth, courseController.createCourse);
router.put('/:id', auth, courseController.updateCourse);
router.delete('/:id', auth, courseController.deleteCourse);

module.exports = router;
