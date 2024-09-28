const express = require('express');
const router = express.Router();
const subscriptionController = require('../controllers/subscriptionController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, subscriptionController.getAllSubscriptions);
router.post('/', authMiddleware, subscriptionController.createSubscription);
router.get('/:id', authMiddleware, subscriptionController.getSubscriptionById);
router.put('/:id', authMiddleware, subscriptionController.updateSubscriptionById);
router.delete('/:id', authMiddleware, subscriptionController.deleteSubscriptionById);

module.exports = router;
