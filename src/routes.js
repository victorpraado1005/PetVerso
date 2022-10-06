const { Router } = require('express');

const UserController = require('./App/controllers/UserController');

const router = Router();

router.get('/', function (req, res){
  res.send("Olá, estamos no ar!");
});

//users
router.get('/users', UserController.index);
router.get('/users/:id', UserController.show);
router.post('/users', UserController.store);
router.post('/users/login', UserController.login);
router.put('/users/:id', UserController.update);

module.exports = router;
