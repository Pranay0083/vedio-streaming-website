const express = require('express');
const router = express.Router();
const viewController = require('../controllers/viewController');

router.get('/', viewController.getAllViews);
router.post('/', viewController.createView);
router.get('/:id', viewController.getViewById);
router.put('/:id', viewController.updateViewById);
router.delete('/:id', viewController.deleteViewById);

module.exports = router;
