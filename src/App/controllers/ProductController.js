const ProductsRepository = require('../repositories/ProductsRepository');
require('express-async-error');

class ProductController {
  async index(request, response){
    const products = await ProductsRepository.findAll();
    response.json(products);
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
    const { name, price, quantity, store_id } = request.body;

    if(!name){
      return response.status(400).json({error: 'Name is required'});
    }

    if(!price){
      return response.status(400).json({error: 'Price is required'});
    }

    if(!quantity){
      return response.status(400).json({error: 'Quantity is required'});
    }

    if(!store_id){
      return response.status(400).json({error: 'Store ID is required'});
    }

    const product = await ProductsRepository.create({ name, price, quantity, store_id });

    response.status(201).json(product);
  }
}

module.exports = new ProductController();
