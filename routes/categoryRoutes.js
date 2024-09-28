const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, categoryController.getAllCategories);
router.post('/', authMiddleware, categoryController.createCategory);
router.get('/:id', authMiddleware, categoryController.getCategoryById);
router.put('/:id', authMiddleware, categoryController.updateCategoryById);
router.delete('/:id', authMiddleware, categoryController.deleteCategoryById);

module.exports = router;
