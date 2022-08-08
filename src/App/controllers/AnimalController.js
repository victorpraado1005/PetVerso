const AnimalsRepository = require('../repositories/AnimalsRepository');
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
      name, breed, date_of_birth, gender, users_id
    } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Name is required!' });
    }

    const animal = await AnimalsRepository.create({
      name, breed, date_of_birth, gender, users_id
    });

    response.json(animal);
  }

  async update(request, response) {
    const { id } = request.params;
    const { name, breed,  date_of_birth, gender } = request.body;

    const animalExists = await AnimalsRepository.findById(id);
    if (!animalExists) {
      return response.status(404).json({error: 'Animal not found'});
    }

    const animal = await AnimalsRepository.update(id, {
      name, breed, date_of_birth, gender
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
