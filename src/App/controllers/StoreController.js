const StoreRepository = require('../repositories/StoreRepository');
require('express-async-error');

class StoreController {
  async index(request, response){
    const stores = await StoreRepository.findAll();
    response.json(stores);
  }

  // async show(request, response){
  //   const { id } = request.params
  //   const store = await PedidosRepository.findById(id);

  //   if(!store){
  //     return response.status(400).json({error: 'Loja não encontrada'});
  //   }
  //   response.json(store);
  // }

  async showStoreById(request, response){
    const { store_id } = request.params;
    const store = await StoreRepository.findById(store_id);
    if(!store){
      return response.status(404).json({error: 'Not Found'});
    }
    response.json(store);
  }

  async store(request, response){
    const { name, cnpj, address, city, city_area } = request.body;

    if(!name){
      return response.status(400).json({error: 'Name is required'});
    }

    if(!cnpj){
      return response.status(400).json({error: 'CNPJ is required'});
    }

    if(!address){
      return response.status(400).json({error: 'Address is required'});
    }

    if(!city){
      return response.status(400).json({error: 'City is required'});
    }

    if(!city_area){
      return response.status(400).json({error: 'City Area is required'});
    }

    const store = await StoreRepository.create({ name, cnpj, address, city, city_area });

    response.status(201).json(store);
  }
}

module.exports = new StoreController();
