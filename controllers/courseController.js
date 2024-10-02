const Course = require('../models/Course');

const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find();
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createCourse = async (req, res) => {
    try {
        const newCourse = await Course.save();
        res.status(201).json(newCourse);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getCourseById = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) return res.status(404).json({ message: 'Course not found' });
        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateCourseById = async (req, res) => {
    try {
        const updatedCourse = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedCourse) return res.status(404).json({ message: 'Course not found' });
        res.status(200).json(updatedCourse);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteCourseById = async (req, res) => {
    try {
        const deletedCourse = await Course.findByIdAndDelete(req.params.id);
        if (!deletedCourse) return res.status(404).json({ message: 'Course not found' });
        res.status(200).json({ message: 'Course deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllCourses,
    createCourse,
    getCourseById,
    updateCourseById,
    deleteCourseById
};
