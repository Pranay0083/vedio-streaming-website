const Enrollment = require('../models/Enrollment');

const getAllEnrollments = async (req, res) => {
    try {
        const enrollments = await Enrollment.find().populate('student').populate('course');
        res.status(200).json(enrollments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createEnrollment = async (req, res) => {
    try {
        const newEnrollment = new Enrollment(req.body);
        await newEnrollment.save();
        res.status(201).json(newEnrollment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getEnrollmentById = async (req, res) => {
    try {
        const enrollment = await Enrollment.findById(req.params.id).populate('student').populate('course');
        if (!enrollment) return res.status(404).json({ message: 'Enrollment not found' });
        res.status(200).json(enrollment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateEnrollmentById = async (req, res) => {
    try {
        const updatedEnrollment = await Enrollment.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('student').populate('course');
        if (!updatedEnrollment) return res.status(404).json({ message: 'Enrollment not found' });
        res.status(200).json(updatedEnrollment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteEnrollmentById = async (req, res) => {
    try {
        const deletedEnrollment = await Enrollment.findByIdAndDelete(req.params.id);
        if (!deletedEnrollment) return res.status(404).json({ message: 'Enrollment not found' });
        res.status(200).json({ message: 'Enrollment deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllEnrollments,
    createEnrollment,
    getEnrollmentById,
    updateEnrollmentById,
    deleteEnrollmentById
};
