const VaccinesRepository = require('../repositories/VaccinesRepository');
const AnimalsRepository = require('../repositories/AnimalsRepository');
require('express-async-error');

class VaccineController {
  async index(request, response){
    const vaccines = await VaccinesRepository.findAll();
    response.json(vaccines);
  }

  async show(request, response){
    const { animal_id } = request.params
    const vaccines = await VaccinesRepository.findByAnimalId(animal_id);

    if(vaccines.length == 0){
      return response.status(400).json({error: 'Sem vacinas encontrada para esse animal'});
    }
    response.json(vaccines);
  }

  async store(request, response){
    const { name, application_date, next_application, animal_id } = request.body;

    if(!name){
      return response.status(400).json({error: 'Name is required'});
    }

    if(!application_date){
      return response.status(400).json({error: 'Application date is required'});
    }

    if(!animal_id){
      return response.status(400).json({error: 'Animal Id is required'});
    }

    const animalExists = await AnimalsRepository.findById(animal_id);
    if (!animalExists) {
      return response.status(400).json({error: 'Animal not found'});
    }

    const vaccine = await VaccinesRepository.create({ name, application_date, next_application, animal_id });

    response.status(201).json(vaccine);
  }

  async update(request, response) {
    const { vaccine_id } = request.params;
    const { name, application_date, next_application } = request.body;

    const vaccineExists = await VaccinesRepository.findById(vaccine_id);

    if (!vaccineExists) {
      return response.status(404).json({error: 'Medication not found'});
    }

    const vaccine = await VaccinesRepository.update(vaccine_id, {
      name, application_date, next_application
    });

    response.json(vaccine);
  }

  async delete(request, response){
    const { id } = request.params;

    await VaccinesRepository.delete(id);

    response.sendStatus(204);
  }
}

module.exports = new VaccineController();
