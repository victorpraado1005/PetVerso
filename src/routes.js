const { Router } = require('express');

const UserController = require('./App/controllers/UserController');
const AnimalController = require('./App/controllers/AnimalController');
const ConsultaController = require('./App/controllers/ConsultaController');

const router = Router();

router.get('/users', UserController.index);
router.get('/users/:id', UserController.show);
router.post('/users', UserController.store);

router.get('/animals', AnimalController.index);
router.get('/animals/:id', AnimalController.show);
router.post('/animals', AnimalController.store);

router.get('/consultas', ConsultaController.index);
router.get('/consultas/:id', ConsultaController.show);
router.post('/consultas', ConsultaController.store);

module.exports = router;
