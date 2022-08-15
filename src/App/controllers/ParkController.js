const ParksRepository = require('../repositories/ParksRepository');
require('express-async-error');

class ParkController {
  async index (request, response) {
    const parks = await ParksRepository.findAll();
    response.json(parks);
  }

  async show(request, response) {
    const { district } = request.params;

    const parks = await ParksRepository.findByDistrict(district);

    if (parks.length == 0) {
      return response.status(400).json({error: 'Parks not found'})
    }

    response.json(parks);
  }

  async store (request, response) {
    const { name,  address, zipcode, district, open_hours} = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Name is required!' });
    };

    if (!address) {
      return response.status(400).json({ error: 'address is required!' });
    }

    if (!zipcode) {
      return response.status(400).json({ error: 'zipcode is required!' });
    }

    if (!district) {
      return response.status(400).json({ error: 'district is required!' });
    }

    if (!open_hours) {
      return response.status(400).json({ error: 'Information about open time is required!' });
    }

    const park = await ParksRepository.create({
      name,  address, zipcode, district, open_hours
    });

    response.json(park);
  }
}

module.exports = new ParkController();
