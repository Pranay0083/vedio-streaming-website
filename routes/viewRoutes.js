const express = require('express');
const router = express.Router();
const viewController = require('../controllers/viewController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, viewController.getAllViews);
router.post('/', authMiddleware, viewController.createView);
router.get('/:id', authMiddleware, viewController.getViewById);
router.put('/:id', authMiddleware, viewController.updateViewById);
router.delete('/:id', authMiddleware, viewController.deleteViewById);

module.exports = router;
