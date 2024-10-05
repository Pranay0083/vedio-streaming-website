const express = require('express');
const instructorController = require('../controllers/instructorController');
const router = express.Router();

router.get('/', instructorController.getAllInstructors);
router.get('/:id', instructorController.getInstructor);

module.exports = router;