const BanhosRepository = require('../repositories/BanhosRepository');
const UsersRepository = require('../repositories/UsersRepository');
const AnimalsRepository = require('../repositories/AnimalsRepository');
const { request } = require('express');

class BanhoController {
  async index(request, response) {
    const banhoss = await BanhosRepository.findAll();
    response.json(banhoss);
  }

  async showByAnimalId(request, response) {
    const { animal_id } = request.params;
    const banhos = await BanhosRepository.findByAnimalId(animal_id);
    response.json(banhos);
  }

  async showBanhosByUser(request, response) {
    const { id } = request.params;

    const idExists = await UsersRepository.findById(id);
    if (!idExists) {
      return response.status(400).json({error: 'User not found'});
    }

    const banho = await BanhosRepository.findByUser(id);
    if (banho.length == 0){
      return response.status(400).json({error: 'Nenhum banho encontrado para esse usuário'});
    }

    response.json(banho);
  }

  async store (request, response) {
    //Criar novo registro
    const {
      data_banho, hora_banho, petshop, animal_id, users_id
    } = request.body;

    if (!data_banho) {
      return response.status(400).json({ error: 'Data do banho não definido.' });
    }

    if (!hora_banho) {
      return response.status(400).json({ error: 'Hora do banho não definido.' });
    }

    if (!petshop) {
      return response.status(400).json({ error: 'PetShop is required!' });
    }

    if (!animal_id) {
      return response.status(400).json({ error: 'Animal ID is required!' });
    }

    const animalExists = await AnimalsRepository.findById(animal_id);
    if(!animalExists){
      return response.status(400).json({error: 'Animal does not exists.'})
    }

    if (!users_id) {
      return response.status(400).json({ error: 'User ID is required!' });
    }

    const userExists = await UsersRepository.findById(users_id);
    if(!userExists){
      return response.status(400).json({error: 'User does not exists.'})
    }

    const banhoExists = await BanhosRepository.findBanho(data_banho, petshop, hora_banho);
    if (banhoExists) {
      return response.status(400).json({error: 'Já existe um banho para esse horário.'})
    }

    const banho = await BanhosRepository.create({
      data_banho, hora_banho, petshop, animal_id, users_id
    });

    response.status(201).json(banho);
  }

  async update(request, response) {
    const { id } = request.params;
    const { data_banho, hora_banho, petshop, animal_id, users_id } = request.body;

    const banhoExists = await BanhosRepository.findById(id);
    if (!banhoExists){
      return response.status(400).json({ error: 'Banho não encontrado'});
    }

    const availableTime = await BanhosRepository.findBanho(data_banho, hora_banho, petshop);
    if (availableTime) {
      return response.status(400).json({error: 'Já existe um banho para esse horário.'})
    }

    const banho = await BanhosRepository.update(id, {
      data_banho, hora_banho, petshop, animal_id, users_id
    });

    response.json(banho);
  }

  async delete(request, response){
    const { id } = request.params;
    await BanhosRepository.delete(id);

    response.sendStatus(204);
  }

  async deleteByAnimalId(request, response){
    const { animal_id } = request.params;
    await BanhosRepository.deleteByAnimalId(animal_id);

    response.sendStatus(204);
  }
}

module.exports = new BanhoController();
