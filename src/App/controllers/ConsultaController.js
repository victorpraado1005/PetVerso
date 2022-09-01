const ConsultasRepository = require('../repositories/ConsultasRepository');
const UsersRepository = require('../repositories/UsersRepository');
const AnimalsRepository = require('../repositories/AnimalsRepository');
const { request } = require('express');

class ConsultaController {
  async index(request, response) {
    const consultas = await ConsultasRepository.findAll();
    response.json(consultas);
  }

  async show(request, response) {
    const { id } = request.params;
    const consulta = await ConsultasRepository.findById(id);

    if (!consulta) {
      return response.status(404).json({error: 'Consulta not found'})
    }

    response.json(consulta);
  }

  async showConsultasByUser(request, response) {
    const { id } = request.params;

    const idExists = await UsersRepository.findById(id);
    if (!idExists) {
      return response.status(400).json({error: 'User not found'});
    }

    const consulta = await ConsultasRepository.findByUser(id);
    if (consulta.length == 0){
      return response.status(400).json({error: 'Nenhuma consultada encontrada para esse usuário'});
    }

    response.json(consulta);
  }

  async store (request, response) {
    //Criar novo registro
    const {
      data_consulta, hora_consulta, clinica, animal_id, users_id
    } = request.body;

    if (!data_consulta) {
      return response.status(400).json({ error: 'Data of consultation is required!' });
    }

    if (!hora_consulta) {
      return response.status(400).json({ error: 'Hora da consulta não definido.' });
    }

    if (!clinica) {
      return response.status(400).json({ error: 'Clinic is required!' });
    }

    if (!animal_id) {
      return response.status(400).json({ error: 'Animal ID is required!' });
    }

    if (!users_id) {
      return response.status(400).json({ error: 'User ID is required!' });
    }

    const animalExists = await AnimalsRepository.findById(animal_id);
    if(!animalExists){
      return response.status(400).json({error: 'Animal does not exists.'})
    }

    const userExists = await UsersRepository.findById(users_id);
    if(!userExists){
      return response.status(400).json({error: 'User does not exists.'})
    }

    const consultaExists = await ConsultasRepository.findConsulta(data_consulta, clinica, hora_consulta);
    if (consultaExists) {
      return response.status(400).json({error: 'Já existe uma consulta para esse horário.'})
    }

    const consulta = await ConsultasRepository.create({
      data_consulta, hora_consulta, clinica, animal_id, users_id
    });

    response.status(201).json(consulta);
  }

  async update(request, response) {
    const { id } = request.params;
    const { data_consulta, hora_consulta, clinica, animal_id, users_id } = request.body;

    const animalExists = await AnimalsRepository.findById(animal_id);
    if(!animalExists){
      return response.status(400).json({error: 'Animal does not exists.'})
    }

    const userExists = await UsersRepository.findById(users_id);
    if(!userExists){
      return response.status(400).json({error: 'User does not exists.'})
    }

    const consultaExists = await ConsultasRepository.findById(id);
    if (!consultaExists){
      return response.status(400).json({ error: 'Consulta não encontrada'});
    }

    const availableTime = await ConsultasRepository.findConsulta(data_consulta, clinica, hora_consulta);
    if (availableTime) {
      return response.status(400).json({error: 'Já existe uma consulta para esse horário.'})
    }

    const consulta = await ConsultasRepository.update(id, {
      data_consulta, hora_consulta, clinica, animal_id, users_id
    });

    response.json(consulta);
  }

  async delete(request, response){
    const { id } = request.params;
    await ConsultasRepository.delete(id);

    response.sendStatus(204);
  }
}

module.exports = new ConsultaController();
