const VaccinesRepository = require('../repositories/VaccinesRepository');
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

    const vaccine = await VaccinesRepository.create({ name, application_date, next_application, animal_id });

    response.json(vaccine);
  }

  async delete(request, response){
    const { id } = request.params;

    await VaccinesRepository.delete(id);

    response.sendStatus(204);
  }
}

module.exports = new VaccineController();
