const express = require('express');
const router = express.Router();

const autoController = require('../controllers/autoController');

// GET /auto - Получить все автомобили
router.get('/', autoController.getAllCars);

// GET /auto/:id - Получить автомобиль по id
router.get('/:id', autoController.getCarById);

// POST /auto - Добавить новый автомобиль
router.post('/', autoController.addCar);

// PUT /auto/:id - Обновить автомобиль
router.put('/:id', autoController.updateCar);

// PATCH /auto/:id - Изменить цену автомобиля
router.patch('/:id', autoController.updatePrice);

// DELETE /auto/:id - Удалить автомобиль
router.delete('/:id', autoController.deleteCar);

module.exports = router;
