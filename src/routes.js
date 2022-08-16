const { Router } = require('express');

const UserController = require('./App/controllers/UserController');
const AnimalController = require('./App/controllers/AnimalController');
const ConsultaController = require('./App/controllers/ConsultaController');
const ParkController = require('./App/controllers/ParkController');
const VaccineController = require('./App/controllers/VaccineController');
const MedicationController = require('./App/controllers/MedicationController');

const router = Router();

//users
router.get('/users', UserController.index);
router.get('/users/:id', UserController.show);
router.post('/users', UserController.store);
router.put('/users/:id', UserController.update);

//informações dos animais relacionados a um usuário
router.get('/users/animals/:id', AnimalController.showAnimalsByParent);
router.get('/users/consultas/:id', ConsultaController.showConsultasByUser);

//animals
router.get('/animals', AnimalController.index);
router.get('/animals/:id', AnimalController.show);
router.delete('/animals/:id', AnimalController.delete);
router.put('/animals/:id', AnimalController.update);
router.post('/animals', AnimalController.store);

//consultas
router.get('/consulta', ConsultaController.index);
router.get('/consulta/:id', ConsultaController.show);
router.post('/consulta', ConsultaController.store);
router.put('/consulta/:id', ConsultaController.update);
router.delete('/consulta/:id', ConsultaController.delete);

//parks
router.get('/park', ParkController.index);
router.get('/park/:district', ParkController.show);
router.post('/park', ParkController.store);

//vaccines
router.get('/vaccines', VaccineController.index);
router.get('/vaccines/:animal_id', VaccineController.show);
router.post('/vaccines', VaccineController.store);
router.delete('/vaccines/:id', VaccineController.delete);

//medications
router.get('/medication', MedicationController.index);
router.get('/medication/:animal_id', MedicationController.show);
router.post('/medication', MedicationController.store);
router.delete('/medication/:id', MedicationController.delete);

module.exports = router;
