const dbService = require('../services/dbService');

exports.getAllCars = async (req, res) => {
  try {
    const cars = await dbService.readDB();
    res.json(cars);
  } catch (err) {
    res.status(500).send('Ошибка при чтении данных');
  }
};

exports.getCarById = async (req, res) => {
  const { id } = req.params;
  try {
    const cars = await dbService.readDB();
    const car = cars.find(car => car.id === id);
    if (!car) return res.status(404).send('Автомобиль не найден');
    res.json(car);
  } catch (err) {
    res.status(500).send('Ошибка при чтении данных');
  }
};

exports.addCar = async (req, res) => {
  const newCar = req.body;
  if (!newCar.id || !newCar.model || !newCar.price) {
    return res.status(400).send('Не хватает данных для добавления автомобиля');
  }

  try {
    const cars = await dbService.readDB();
    cars.push(newCar);
    await dbService.writeDB(cars);
    res.status(201).send('Автомобиль добавлен');
  } catch (err) {
    res.status(500).send('Ошибка при записи данных');
  }
};

exports.updateCar = async (req, res) => {
  const { id } = req.params;
  const updatedCar = req.body;

  try {
    const cars = await dbService.readDB();
    const carIndex = cars.findIndex(car => car.id === id);
    if (carIndex === -1) return res.status(404).send('Автомобиль не найден');

    // Обновляем данные автомобиля
    cars[carIndex] = { ...cars[carIndex], ...updatedCar };
    await dbService.writeDB(cars);
    res.send('Информация об автомобиле обновлена');
  } catch (err) {
    res.status(500).send('Ошибка при записи данных');
  }
};

exports.updatePrice = async (req, res) => {
  const { id } = req.params;
  const { price } = req.body;

  if (price === undefined) {
    return res.status(400).send('Не указана цена для изменения');
  }

  try {
    const cars = await dbService.readDB();
    const carIndex = cars.findIndex(car => car.id === id);
    if (carIndex === -1) return res.status(404).send('Автомобиль не найден');

    // Изменяем только цену
    cars[carIndex].price = price;
    await dbService.writeDB(cars);
    res.send('Цена автомобиля обновлена');
  } catch (err) {
    res.status(500).send('Ошибка при записи данных');
  }
};

exports.deleteCar = async (req, res) => {
  const { id } = req.params;

  try {
    const cars = await dbService.readDB();
    const newCarsList = cars.filter(car => car.id !== id);
    if (newCarsList.length === cars.length) {
      return res.status(404).send('Автомобиль не найден');
    }

    await dbService.writeDB(newCarsList);
    res.send('Автомобиль удален');
  } catch (err) {
    res.status(500).send('Ошибка при записи данных');
  }
};
