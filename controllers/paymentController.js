const Payment = require('../models/Payment');

const getAllPayments = async (req, res) => {
    try {
        const payments = await Payment.find().populate('student').populate('course');
        res.status(200).json(payments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createPayment = async (req, res) => {
    try {
        const newPayment = new Payment(req.body);
        await newPayment.save();
        res.status(201).json(newPayment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getPaymentById = async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.id).populate('student').populate('course');
        if (!payment) return res.status(404).json({ message: 'Payment not found' });
        res.status(200).json(payment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updatePaymentById = async (req, res) => {
    try {
        const updatedPayment = await Payment.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('student').populate('course');
        if (!updatedPayment) return res.status(404).json({ message: 'Payment not found' });
        res.status(200).json(updatedPayment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deletePaymentById = async (req, res) => {
    try {
        const deletedPayment = await Payment.findByIdAndDelete(req.params.id);
        if (!deletedPayment) return res.status(404).json({ message: 'Payment not found' });
        res.status(200).json({ message: 'Payment deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllPayments,
    createPayment,
    getPaymentById,
    updatePaymentById,
    deletePaymentById
};
