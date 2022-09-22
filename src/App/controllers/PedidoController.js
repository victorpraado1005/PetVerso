const UserRepository = require('../repositories/UsersRepository');
const PedidosRepository = require('../repositories/PedidosRepository')
require('express-async-error');

class PedidoController {
  async index(request, response){
    const pedidos = await PedidosRepository.findAll();
    response.json(pedidos);
  }

  async show(request, response){
    const { id } = request.params
    const pedido = await PedidosRepository.findById(id);

    if(!pedido){
      return response.status(400).json({error: 'Pedido não encontrado'});
    }
    response.json(pedido);
  }

  async showByUserId(request, response){
    const { user_id } = request.params
    const pedidos = await PedidosRepository.findByUserId(user_id);

    if(pedidos.length == 0){
      return response.status(400).json({error: 'Sem pedidos encontrados para esse usuário'});
    }
    response.json(pedidos);
  }

  async store(request, response){
    const { data_pedido, loja, valor_total, user_id } = request.body;

    if(!data_pedido){
      return response.status(400).json({error: 'Data is required'});
    }

    if(!loja){
      return response.status(400).json({error: 'Loja is required'});
    }

    if(!valor_total){
      return response.status(400).json({error: 'Loja is required'});
    }

    if(!user_id){
      return response.status(400).json({error: 'User Id is required'});
    }

    const userExists = await UserRepository.findById(user_id);
    if (!userExists) {
      return response.status(400).json({error: 'User not found'});
    }

    const pedido = await PedidosRepository.create({ data_pedido, loja, valor_total, user_id });

    response.status(201).json(pedido);
  }
}

module.exports = new PedidoController();
