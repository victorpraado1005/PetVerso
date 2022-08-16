const MedicationsRepository = require('../repositories/MedicationsRepository');
require('express-async-error');

class MedicationController {
  async index(request, response){
    const medications = await MedicationsRepository.findAll();
    response.json(medications);
  }

  async show(request, response){
    const { animal_id } = request.params
    const medications = await MedicationsRepository.findByAnimalId(animal_id);

    if(medications.length == 0){
      return response.status(400).json({error: 'Sem remédios encontrados para esse animal'});
    }
    response.json(medications);
  }

  async store(request, response){
    const { medicine_name, start_date, end_date, repetition, animal_id } = request.body;

    if(!medicine_name){
      return response.status(400).json({error: 'Name is required'});
    }

    if(!start_date){
      return response.status(400).json({error: 'Application date is required'});
    }

    const medication = await MedicationsRepository.create({ medicine_name, start_date, end_date, repetition, animal_id });

    response.json(medication);
  }

  async delete(request, response){
    const { id } = request.params;

    await MedicationsRepository.delete(id);

    response.sendStatus(204);
  }
}

module.exports = new MedicationController();
