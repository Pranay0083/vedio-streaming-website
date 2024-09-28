const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, userController.getAllUsers);
router.post('/', authMiddleware, userController.createUser);
router.get('/:id', authMiddleware, userController.getUserById);
router.put('/:id', authMiddleware, userController.updateUserById);
router.delete('/:id', authMiddleware, userController.deleteUserById);

module.exports = router;
