const express = require('express');
const router = express.Router();
const videoController = require('../controllers/vedioController');

router.get('/', videoController.getAllVedios);
router.post('/', videoController.createVedio);
router.get('/:id', videoController.getAllVedios);
router.put('/:id', videoController.updateVedioById);
router.delete('/:id', videoController.deleteVedioById);

module.exports = router;