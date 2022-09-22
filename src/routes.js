const { Router } = require('express');

const UserController = require('./App/controllers/UserController');
const AnimalController = require('./App/controllers/AnimalController');
const ConsultaController = require('./App/controllers/ConsultaController');
const BanhoController = require('./App/controllers/BanhoController');
const ParkController = require('./App/controllers/ParkController');
const VaccineController = require('./App/controllers/VaccineController');
const MedicationController = require('./App/controllers/MedicationController');
const PedidoController = require('./App/controllers/PedidoController');

const router = Router();

router.get('/', function (req, res){
  res.send("Olá, tamo no ar!");
});

//users
router.get('/users', UserController.index);
router.get('/users/:id', UserController.show);
router.post('/users', UserController.store);
router.post('/users/login', UserController.login);
router.put('/users/:id', UserController.update);

//informações dos animais relacionados a um usuário
router.get('/users/animals/:id', AnimalController.showAnimalsByParent);
router.get('/users/consultas/:id', ConsultaController.showConsultasByUser);
router.get('/users/banhos/:id', BanhoController.showBanhosByUser);
router.get('/users/pedidos/:user_id', PedidoController.showByUserId);

//animals
router.get('/animals', AnimalController.index);
router.get('/animals/:id', AnimalController.show);
router.delete('/animals/:id', AnimalController.delete);
router.put('/animals/:id', AnimalController.update);
router.post('/animals', AnimalController.store);

//rota de informacao de animal/medicamento relacionado ao animal
router.get('/animals/vaccines/:animal_id', VaccineController.showByAnimalId);
router.get('/animals/medication/:animal_id', MedicationController.showByAnimalId);

//consultas
router.get('/consulta', ConsultaController.index);
router.get('/consulta/:id', ConsultaController.show);
router.post('/consulta', ConsultaController.store);
router.put('/consulta/:id', ConsultaController.update);
router.delete('/consulta/:id', ConsultaController.delete);

//banhos
router.get('/banho', BanhoController.index);
router.get('/banho/:id', BanhoController.show);
router.post('/banho', BanhoController.store);
router.put('/banho/:id', BanhoController.update);
router.delete('/banho/:id', BanhoController.delete);

//parks
router.get('/park', ParkController.index);
router.get('/park/:district', ParkController.show);
router.post('/park', ParkController.store);

//vaccines
router.get('/vaccines', VaccineController.index);
router.get('/vaccines/:id', VaccineController.show);
router.post('/vaccines', VaccineController.store);
router.put('/vaccines/:vaccine_id', VaccineController.update);
router.delete('/vaccines/:id', VaccineController.delete);

//medications
router.get('/medication', MedicationController.index);
router.get('/medication/:id', MedicationController.show);
router.post('/medication', MedicationController.store);
router.put('/medication/:medication_id', MedicationController.update);
router.delete('/medication/:id', MedicationController.delete);

//pedidos
router.get('/pedidos', MedicationController.index);
router.get('/pedidos/:id', MedicationController.show);
router.post('/pedidos', MedicationController.store);

module.exports = router;
