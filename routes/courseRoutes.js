const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController')

router.get('/', courseController.getAllCourses)
router.post('/', courseController.createCourse)
router.put('/:id', courseController.updateCourseById)
router.delete('/:id', courseController.deleteCourseById)
router.get('/:id', courseController.getCourseById)