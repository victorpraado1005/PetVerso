const { Router } = require('express');

const UserController = require('./App/controllers/UserController');
const AnimalController = require('./App/controllers/AnimalController');
const ConsultaController = require('./App/controllers/ConsultaController');
const BanhoController = require('./App/controllers/BanhoController');
const ParkController = require('./App/controllers/ParkController');
const VaccineController = require('./App/controllers/VaccineController');
const MedicationController = require('./App/controllers/MedicationController');
const PedidoController = require('./App/controllers/PedidoController');
const StoreController = require('./App/controllers/StoreController');
const ProductController = require('./App/controllers/ProductController');
const { isAuth } = require('./App/middlewares/isAuth');

const router = Router();

router.get('/', function (req, res){
  res.send("Olá, estamos no ar!");
 });

//users
router.get('/users', isAuth, UserController.index);
router.get('/users/me', UserController.me);
router.get('/users/:id', isAuth, UserController.show);
router.post('/users', UserController.store);
router.post('/users/login', UserController.login);
router.put('/users/:id', isAuth, UserController.update);
router.put('/users/updateSubscription/:id', isAuth, UserController.updateSubscription);

//informações dos animais relacionados a um usuário
router.get('/users/animals/:id', isAuth, AnimalController.showAnimalsByParent);
router.get('/users/consultas/:id', isAuth, ConsultaController.showConsultasByUser);
router.get('/users/banhos/:id', isAuth, BanhoController.showBanhosByUser);
router.get('/users/pedidos/:user_id', isAuth, PedidoController.showByUserId);

//animals
router.get('/animals', isAuth, AnimalController.index);
router.get('/animals/:id', isAuth, AnimalController.show);
router.delete('/animals/:id', isAuth, AnimalController.delete);
router.put('/animals/:id', isAuth, AnimalController.update);
router.post('/animals', isAuth, AnimalController.store);

//rota de informacao de animal/medicamento relacionado ao animal
router.get('/animals/vaccines/:animal_id', isAuth, VaccineController.showByAnimalId);
router.get('/animals/medication/:animal_id', isAuth, MedicationController.showByAnimalId);

//consultas
router.get('/consulta', isAuth, ConsultaController.index);
router.get('/consulta/:animal_id', isAuth, ConsultaController.showConsultaByAnimalId);
router.post('/consulta', isAuth, ConsultaController.store);
router.put('/consulta/:id', isAuth, ConsultaController.update);
router.delete('/consulta/:id', isAuth, ConsultaController.delete);
// rota para deletar banhos relacionado a um animal
router.delete('/animals/consulta/:animal_id', isAuth, ConsultaController.deleteByAnimalId);

//banhos
router.get('/banho', isAuth, BanhoController.index);
router.get('/banho/:animal_id', isAuth, BanhoController.showByAnimalId);
router.post('/banho', isAuth, BanhoController.store);
router.put('/banho/:id', isAuth, BanhoController.update);
router.delete('/banho/:id', isAuth, BanhoController.delete);
// rota para deletar banhos relacionado a um animal
router.delete('/animals/banho/:animal_id', isAuth, BanhoController.deleteByAnimalId);

//parks
router.get('/park', isAuth, ParkController.index);
router.get('/park/:district', isAuth, ParkController.show);
router.post('/park', isAuth, ParkController.store);

//vaccines
router.get('/vaccines', isAuth, VaccineController.index);
router.get('/vaccines/:id', isAuth, VaccineController.show);
router.post('/vaccines', isAuth, VaccineController.store);
router.put('/vaccines/:vaccine_id', isAuth, VaccineController.update);
router.delete('/vaccines/:id', isAuth, VaccineController.delete);
// rota para deletar banhos relacionado a um animal
router.delete('/animals/vaccines/:animal_id', isAuth, VaccineController.deleteByAnimalId);

//medications
router.get('/medication', isAuth, MedicationController.index);
router.get('/medication/:id', isAuth, MedicationController.show);
router.post('/medication', isAuth, MedicationController.store);
router.put('/medication/:medication_id', isAuth, MedicationController.update);
router.delete('/medication/:id', isAuth, MedicationController.delete);
// rota para deletar banhos relacionado a um animal
router.delete('/animals/medication/:animal_id', isAuth, MedicationController.deleteByAnimalId);

//pedidos
router.get('/pedidos', isAuth, PedidoController.index);
router.get('/pedidos/:id', isAuth, PedidoController.show);
router.post('/pedidos', isAuth, PedidoController.store);

//stores
router.get('/store', isAuth, StoreController.index);
router.get('/store/:store_id', isAuth, StoreController.showStoreById);
router.post('/store', isAuth, StoreController.store);

//products
router.post('/product', isAuth, ProductController.store);

//coupons

module.exports = router;
