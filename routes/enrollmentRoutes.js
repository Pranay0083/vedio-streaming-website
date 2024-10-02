const express = require('express');
const router = express.Router();
const enrollmentController = require('../controllers/enrollmentController')

router.get('/', enrollmentController.getAllEnrollments)
router.post('/', enrollmentController.createEnrollment)
router.put('/:id', enrollmentController.updateEnrollmentById)
router.delete('/:id', enrollmentController.deleteEnrollmentById)
router.get('/:id', enrollmentController.getEnrollmentById)