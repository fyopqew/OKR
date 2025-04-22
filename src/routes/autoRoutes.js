const express = require('express');
const router = express.Router();

const autoController = require('../controllers/autoController');

router.get('/', autoController.getAllCars);

router.get('/:id', autoController.getCarById);

router.post('/', autoController.addCar);

router.put('/:id', autoController.updateCar);

router.patch('/:id', autoController.updatePrice);

router.delete('/:id', autoController.deleteCar);

module.exports = router;
