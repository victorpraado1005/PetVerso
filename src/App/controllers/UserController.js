const UsersRepository = require("../repositories/UsersRepository");
require("express-async-error");
var bcrypt = require("bcryptjs");
var jwt = require('jsonwebtoken');

class UserController {
  async index(request, response) {
    const contacts = await UsersRepository.findAll();
    response.json(contacts);
  }

  async show(request, response) {
    const { id } = request.params;
    const user = await UsersRepository.findById(id);

    if (!user) {
      return response.status(404).json({ error: "User not found" });
    }

    response.json(user);
  }

  async login(request, response) {
    const { email, password } = request.body;

    const user = await UsersRepository.findByEmail(email);

    if (!user) {
      return response
        .status(404)
        .json({ error: "E-mail are incorrect" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return response
        .status(404)
        .json({ error: "Password are incorrect" });
    }

    const accessToken = await jwt.sign(
      { sub: user.id }, process.env.JWT_SECRET, { expiresIn: '1 day' }
    );

    response.json({ accessToken: accessToken });
  }

  async me(request, response) {
    const token = request.headers.authorization;

    const accessToken = token.split(' ')[1];

    const payload = jwt.verify(accessToken, process.env.JWT_SECRET);

    const user_id = payload.sub;

    const user = await UsersRepository.findById(user_id);

    response.json( { user } );
  }

  async store(request, response) {
    //Criar novo registro
    const {
      name,
      email,
      phone,
      address,
      cep,
      city,
      estado,
      gender,
      assinante,
      password,
    } = request.body;
    if (!name) {
      return response.status(400).json({ error: "Name is required!" });
    }

    if (!email) {
      return response.status(400).json({ error: "Email is required!" });
    }

    const emailExists = await UsersRepository.findByEmail(email);
    if (emailExists) {
        return response
          .status(400)
          .json({ error: "This e-mail is already in use" });
    }

      if (!phone) {
        return response.status(400).json({ error: "Phone is required!" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const contact = await UsersRepository.create({
        name,
        email,
        phone,
        address,
        cep,
        city,
        estado,
        gender,
        assinante,
        hashedPassword,
      });

      const accessToken = await jwt.sign(
        { sub: contact.id }, process.env.JWT_SECRET, { expiresIn: '1 day' }
      );

      response.status(201).json({ accessToken: accessToken });
    }

  async update(request, response) {
    const { id } = request.params;
    const {
      name,
      email,
      phone,
      address,
      cep,
      city,
      estado,
      gender,
      date_of_birth,
    } = request.body;

    const userExists = await UsersRepository.findById(id);
    if (!userExists) {
      return response.status(400).json({ error: "User not found" });
    }

    if (!name) {
      return response.status(400).json({ error: "Name is required!" });
    }

    if (!email) {
      return response.status(400).json({ error: "Email is required!" });
    }

    if (!phone) {
      return response.status(400).json({ error: "Phone is required!" });
    }

    const user = await UsersRepository.update(id, {
      name,
      email,
      phone,
      address,
      cep,
      city,
      estado,
      gender,
      date_of_birth,
    });

    response.status(201).json({ success: "Contato atualizado com sucesso!" });
  }

  async updateSubscription(request, response) {
    const { id } = request.params;
    const {
      assinante
    } = request.body;

    const userExists = await UsersRepository.findById(id);
    if (!userExists) {
      return response.status(400).json({ error: "User not found" });
    }

    const user = await UsersRepository.updateSubscription(id, {
      assinante
    });

    response.status(201).json({ success: "Contato atualizado com sucesso!" });
  }
}

// Singleton
module.exports = new UserController();
