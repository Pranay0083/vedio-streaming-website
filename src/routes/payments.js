const express = require('express');
const paymentController = require('../controllers/paymentController');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/create-session', auth, paymentController.createPaymentSession);

module.exports = router;
