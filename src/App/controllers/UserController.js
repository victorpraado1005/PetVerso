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

  async login (request, response) {
    const { email, password } = request.body;
    const user = await UsersRepository.findUserByEmailAndPassword(email, password);

    if (!user){
      return response.status(404).json({ error: 'E-mail or password are incorrect' })
    }

    response.json(user);
  }

  async store (request, response) {
    //Criar novo registro
    const {
      name, email, phone, address, cep, city, estado, gender, assinante, password
    } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Name is required!' });
    }

    if (!email){
      return response.status(400).json({ error: 'Email is required!' });
    }

    const emailExists = await UsersRepository.findByEmail(email);
    if (emailExists.length > 0){
      return response.status(400).json({ error: 'This e-mail is already in use' });
    }

    if (!phone){
      return response.status(400).json({ error: 'Phone is required!' });
    }

    const contact = await UsersRepository.create({
      name, email, phone, address, cep, city, estado, gender, assinante, password
    });

    response.status(201).json(contact);
  }

  async update(request, response) {
    const { id } = request.params;
    const {
      name, email, phone, address, cep, city, estado, gender, date_of_birth, assinante
    } = request.body;

    const userExists = await UsersRepository.findById(id);
    if (!userExists) {
      return response.status(400).json({error: 'User not found'});
    }

    if (!name) {
      return response.status(400).json({ error: 'Name is required!' });
    }

    if (!email){
      return response.status(400).json({ error: 'Email is required!' });
    }

    if (!phone){
      return response.status(400).json({ error: 'Phone is required!' });
    }

    const user = await UsersRepository.update(id, {
      name, email, phone, address, cep, city, estado, gender, date_of_birth, assinante
    });

    response.json(user);
  }
}

// Singleton
module.exports = new UserController();
