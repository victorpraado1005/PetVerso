const AnimalsRepository = require('../repositories/AnimalsRepository');
const UsersRepository = require('../repositories/UsersRepository');
require('express-async-error');

class AnimalController {
  async index(request, response) {
    const animal = await AnimalsRepository.findAll();
    response.json(animal);
  }

  async show(request, response) {
    const { id } = request.params;
    const animal = await AnimalsRepository.findById(id);
    if (!animal) {
      return response.status(404).json({error: 'Animal not found'})
    }

    response.json(animal);
  }

  async showAnimalsByParent(request, response){
    const { id } = request.params;
    const animal = await AnimalsRepository.findByParent(id);
    if (animal.length == 0) {
      return response.status(404).json({error: 'Not animal found for this user.'})
    }

    response.json(animal);
  }

  async store (request, response) {
    //Criar novo registro
    const {
      name, breed, date_of_birth, gender, users_id, nickname, species, weight_animal, lenght_animal
    } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Name is required!' });
    }

    if (!breed) {
      return response.status(400).json({ error: 'Breed is required!' });
    }

    if (!users_id) {
      return response.status(400).json({ error: 'Users Id is required!' });
    }

    const userExists = await UsersRepository.findById(users_id);
    if(!userExists){
      return response.status(400).json({ error: 'User not found' })
    }

    if (!species) {
      return response.status(400).json({ error: 'Species is required!' });
    }

    const animal = await AnimalsRepository.create({
      name, breed, date_of_birth, gender, users_id, nickname, species, weight_animal, lenght_animal
    });

    response.status(201).json(animal);
  }

  async update(request, response) {
    const { id } = request.params;
    const { name, breed,  date_of_birth, gender, nickname, species, weight_animal, lenght_animal } = request.body;

    const animalExists = await AnimalsRepository.findById(id);
    if (!animalExists) {
      return response.status(404).json({error: 'Animal not found'});
    }

    const animal = await AnimalsRepository.update(id, {
      name, breed, date_of_birth, gender, nickname, species, weight_animal, lenght_animal
    });

    response.json(animal);
  }

  async delete(request, response) {
    const { id } = request.params;
    await AnimalsRepository.delete(id);

    response.sendStatus(204);
  }
}

// Singleton
module.exports = new AnimalController();
