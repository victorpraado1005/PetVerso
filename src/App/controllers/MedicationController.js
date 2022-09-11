const MedicationsRepository = require('../repositories/MedicationsRepository');
const AnimalsRepository = require('../repositories/AnimalsRepository');
require('express-async-error');

class MedicationController {
  async index(request, response){
    const medications = await MedicationsRepository.findAll();
    response.json(medications);
  }

  async show(request, response){
    const { id } = request.params
    const medication = await MedicationsRepository.findById(id);

    if(!medication){
      return response.status(400).json({error: 'Medicamento nao encontrado'});
    }
    response.json(medication);
  }

  async showByAnimalId(request, response){
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

    const animalExists = await AnimalsRepository.findById(animal_id);
    if (!animalExists) {
      return response.status(400).json({error: 'Animal not found'});
    }

    const medication = await MedicationsRepository.create({ medicine_name, start_date, end_date, repetition, animal_id });

    response.status(201).json(medication);
  }

  async update(request, response) {
    const { medication_id } = request.params;
    const { medicine_name, start_date, end_date, repetition } = request.body;

    const medicationExists = await MedicationsRepository.findById(medication_id);

    if (!medicationExists) {
      return response.status(404).json({error: 'Medication not found'});
    }

    const medication = await MedicationsRepository.update(medication_id, {
      medicine_name, start_date, end_date, repetition
    });

    response.json(medication);
  }

  async delete(request, response){
    const { id } = request.params;

    await MedicationsRepository.delete(id);

    response.sendStatus(204);
  }
}

module.exports = new MedicationController();
