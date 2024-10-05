const express = require('express');
const paymentController = require('../controllers/paymentController');
const auth = require('../middleware/auth');
const router = express.Router();

// this will be working soon
router.post('/create-session', auth, paymentController.createPaymentSession);

module.exports = router;