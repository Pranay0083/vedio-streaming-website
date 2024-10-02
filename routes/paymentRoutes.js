const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController')

router.get('/', paymentController.getPaymentById)
router.post('/', paymentController.createPayment)
router.put('/:id', paymentController.updatePaymentById)
router.delete('/:id', paymentController.deletePaymentById)
router.get('/:id', paymentController.getPaymentById)