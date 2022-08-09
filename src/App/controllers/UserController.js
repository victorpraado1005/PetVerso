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
      name, email, phone, address, cep, city, estado, gender, date_of_birth
    } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Name is required!' });
    }

    const contact = await UsersRepository.create({
      name, email, phone, address, cep, city, estado, gender, date_of_birth
    });

    response.json(contact);
  }

  async update(request, response) {
    const { id } = request.params;
    const {
      name, email, phone, address, cep, city, estado, gender, date_of_birth
    } = request.body;

    const userExists = await UsersRepository.findById(id);
    if (!userExists) {
      return response.status(400).json({error: 'User not found'});
    }

    const user = await UsersRepository.update(id, {
      name, email, phone, address, cep, city, estado, gender, date_of_birth
    });

    response.json(user);
  }
}

// Singleton
module.exports = new UserController();
