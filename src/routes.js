const { Router } = require('express');

const UserController = require('./App/controllers/UserController');
const AnimalController = require('./App/controllers/AnimalController');

const router = Router();

router.get('/users', UserController.index);
router.get('/users/:id', UserController.show);
router.post('/users', UserController.store);

router.get('/animals', AnimalController.index);
router.get('/animals/:id', AnimalController.show);
router.post('/animals', AnimalController.store);


module.exports = router;
