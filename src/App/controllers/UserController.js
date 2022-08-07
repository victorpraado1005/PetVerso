const UsersRepository = require('../repositories/UsersRepository');
require('express-async-error');

class UserController {
  async index(request, response) {
    const contacts = await UsersRepository.findAll();
    response.json(contacts);
  }

  async show(request, response) {
    const { id } = request.params;
    const user = await UsersRepository.findById(id);

    if (!user) {
      return response.status(404).json({error: 'User not found'})
    }

    response.json(user);
  }

  async store (request, response) {
    //Criar novo registro
    const {
      name, email, phone, address, cep, city, estado, gender, date_of_birth, animal_id
    } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Name is required!' });
    }

    const contact = await UsersRepository.create({
      name, email, phone, address, cep, city, estado, gender, date_of_birth, animal_id
    });

    response.json(contact);
  }
}

// Singleton
module.exports = new UserController();
