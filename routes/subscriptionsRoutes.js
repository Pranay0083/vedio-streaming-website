const express = require('express');
const router = express.Router();
const subscriptionController = require('../controllers/subscriptionController');

router.get('/', subscriptionController.getAllSubscriptions);
router.post('/', subscriptionController.createSubscription);
router.get('/:id', subscriptionController.getSubscriptionById);
router.put('/:id', subscriptionController.updateSubscriptionById);
router.delete('/:id', subscriptionController.deleteSubscriptionById);

module.exports = router;
