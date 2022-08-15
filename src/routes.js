const { Router } = require('express');

const UserController = require('./App/controllers/UserController');
const AnimalController = require('./App/controllers/AnimalController');
const ConsultaController = require('./App/controllers/ConsultaController');
const ParkController = require('./App/controllers/ParkController');

const router = Router();

router.get('/users', UserController.index);
router.get('/users/:id', UserController.show);
router.post('/users', UserController.store);
router.put('/users/:id', UserController.update);


router.get('/users/animals/:id', AnimalController.showAnimalsByParent);
router.get('/users/consultas/:id', ConsultaController.showConsultasByUser);


router.get('/animals', AnimalController.index);
router.get('/animals/:id', AnimalController.show);
router.delete('/animals/:id', AnimalController.delete);
router.put('/animals/:id', AnimalController.update);
router.post('/animals', AnimalController.store);

router.get('/consulta', ConsultaController.index);
router.get('/consulta/:id', ConsultaController.show);
router.post('/consulta', ConsultaController.store);
router.put('/consulta/:id', ConsultaController.update);
router.delete('/consulta/:id', ConsultaController.delete);

router.get('/park', ParkController.index);
router.get('/park/:district', ParkController.show);
router.post('/park', ParkController.store);

module.exports = router;
