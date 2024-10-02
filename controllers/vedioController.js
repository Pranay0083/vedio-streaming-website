const Vedio = require('../models/Vedio');

const getAllVedios = async (req, res) => {
    try {
        const vedios = await Vedio.find().populate('course');
        res.status(200).json(vedios);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createVedio = async (req, res) => {
    try {
        const newVedio = new Vedio(req.body);
        await newVedio.save();
        res.status(201).json(newVedio);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getVedioById = async (req, res) => {
    try {
        const vedio = await Vedio.findById(req.params.id).populate('course');
        if (!vedio) return res.status(404).json({ message: 'Vedio not found' });
        res.status(200).json(vedio);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateVedioById = async (req, res) => {
    try {
        const updatedVedio = await Vedio.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('course');
        if (!updatedVedio) return res.status(404).json({ message: 'Vedio not found' });
        res.status(200).json(updatedVedio);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteVedioById = async (req, res) => {
    try {
        const deletedVedio = await Vedio.findByIdAndDelete(req.params.id);
        if (!deletedVedio) return res.status(404).json({ message: 'Vedio not found' });
        res.status(200).json({ message: 'Vedio deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllVedios,
    createVedio,
    getVedioById,
    updateVedioById,
    deleteVedioById
};
