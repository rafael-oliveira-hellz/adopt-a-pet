import { Request, Response } from 'express';
import mongoose from 'mongoose';

// Helpers
import getToken from '../helpers/GetToken';
import getUserByToken from '../helpers/GetUserByToken';
const ObjectId = require('mongoose').Types.ObjectId;

// Model
import Pet from '../models/Pet';

class PetController {
  // Create a new pet
  public async create(req: Request, res: Response): Promise<Response> {
    const {
      name,
      age,
      weight,
      color,
      type,
      breed,
      description
    } = req.body;

    // Images upload

    const avatars = req.files as Express.Multer.File[];

    if (avatars === null) {
      return res.status(401).json({
        status: 401,
        message: 'As imagens são obrigatórias'
      });
    }

    // Validations

    if (!name) {
      return res.status(401).json({
        status: 401,
        message: 'O nome é obrigatório'
      });
    }

    if (!age) {
      return res.status(401).json({
        status: 401,
        message: 'A idade é obrigatória'
      });
    }

    if (!weight) {
      return res.status(401).json({
        status: 401,
        message: 'O peso é obrigatório'
      });
    }

    if (!color) {
      return res.status(401).json({
        status: 401,
        message: 'A cor é obrigatória'
      });
    }

    if (!type) {
      return res.status(401).json({
        status: 401,
        message: 'O tipo do pet é obrigatório'
      });
    }

    if (!breed) {
      return res.status(401).json({
        status: 401,
        message: 'A raça do pet é obrigatória'
      });
    }

    if (!description) {
      return res.status(401).json({
        status: 401,
        message: 'A descrição do pet é obrigatória'
      });
    }

    // Get pet owner

    const token = getToken(req);
    const user = await getUserByToken(token);

    if (!user) {
      return res.status(404).json({
        status: 404,
        message: 'Usuário não encontrado'
      });
    }

    const pet = new Pet({
      name,
      age,
      weight,
      color,
      type,
      breed,
      description,
      avatars: [],
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar
      }
    });

    avatars.forEach((avatar: any) => {
      pet.avatars?.push(avatar.filename);
    });

    try {

      const newPet = await pet.save();

      return res.status(201).json({
        status: 201,
        message: 'Pet created successfully',
        newPet
      });

    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: error
      });
    }

  }

  // List all pets
  public async listAllPets(_req: Request, res: Response): Promise<Response> {
    try {
      const pets = await Pet.find().sort("-createdAt");

      return res.status(200).json({
        status: 200,
        message: 'Pets listados com sucesso',
        pets
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: error
      });
    }
  }

  // List all pets by user
  public async listAllPetsByUser(req: Request, res: Response): Promise<Response> {
    const token = getToken(req);
    const user = await getUserByToken(token);

    if (!user) {
      return res.status(404).json({
        status: 404,
        message: 'Usuário não encontrado'
      });
    }

    try {
      const pets = await Pet.find({ 'user._id': user._id }).sort("-createdAt");

      return res.status(200).json({
        status: 200,
        message: 'Pets listados com sucesso',
        pets
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: error
      });
    }
  }

  // List one pet
  public async getPetById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(404).json({
        status: 404,
        message: 'ID inválido'
      });
    }

    try {
      const pet = await Pet.findOne({ _id: id });

      if (!pet) {
        return res.status(404).json({
          status: 404,
          message: 'Pet não encontrado'
        });
      }

      return res.status(200).json({
        status: 200,
        message: 'Pet listed successfully',
        pet
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: error
      });
    }
  }

  // List all adoptions by user
  public async listAllAdoptionsByUser(req: Request, res: Response): Promise<Response> {
    const token = getToken(req);
    const user = await getUserByToken(token);

    if (!user) {
      return res.status(404).json({
        status: 404,
        message: 'Usuário não encontrado'
      });
    }

    try {
      const pets = await Pet.find({ 'adopter._id': user._id }).sort("-createdAt");

      return res.status(200).json({
        status: 200,
        message: 'Adoptions listed successfully',
        data: pets
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: error
      });
    }
  }

  // List all adoptions
  public async listAllAdoptions(req: Request, res: Response): Promise<Response> {
    try {
      const pets = await Pet.find({ available: false }).sort("-createdAt");

      return res.status(200).json({
        status: 200,
        message: 'Adoptions listed successfully',
        pets
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: error
      });
    }
  }

  // Remove pet by id
  public async removePetById(req: Request, res: Response): Promise<Response> {
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      return res.status(404).json({
        status: 404,
        message: 'ID inválido'
      });
    }

    const pet = await Pet.findOne({ _id: id });

    if (!pet) {
      return res.status(404).json({
        status: 404,
        message: 'Pet não encontrado'
      });
    }

    const token = getToken(req);
    const user = await getUserByToken(token);

    if (!user) {
      return res.status(404).json({
        status: 404,
        message: 'Usuário não encontrado'
      });
    }

    if (!pet.user) {
      return res.status(404).json({
        status: 404,
        message: 'Adotante não encontrado'
      });
    }

    try {

      if (pet.user._id.toString() !== user._id.toString()) {
        return res.status(401).json({
          status: 401,
          message: 'Você não tem permissão para remover este pet'
        });
      }

      await Pet.findByIdAndRemove(id);

      return res.status(200).json({
        status: 200,
        message: 'Pet removido com sucesso'
      });
    }
    catch (error) {
      return res.status(500).json({
        status: 500,
        message: error
      });
    }
  }

  // Update pet by id
  public async updatePet(req: Request, res: Response): Promise<Response> {
    const id = req.params.id;

    const { name, age, weight, color, type, breed, description, available } = req.body;

    const avatars = req.files as Express.Multer.File[];

    const updatedData: any = {};

    // Check if pet exists

    const pet = await Pet.findOne({ _id: id });

    if (!pet) {
      return res.status(404).json({
        status: 404,
        message: 'Pet não encontrado'
      });
    }

    const token = getToken(req);
    const user = await getUserByToken(token);

    if (!user) {
      return res.status(404).json({
        status: 404,
        message: 'Usuário não encontrado'
      });
    }

    if (!pet.user) {
      return res.status(404).json({
        status: 404,
        message: 'Adotante não encontrado'
      });
    }

    if (pet.user._id.toString() !== user._id.toString()) {
      return res.status(401).json({
        status: 401,
        message: 'Você não tem permissão para remover este pet'
      });
    }

    // Validate if all the fields were filled

    if (!name) {
      return res.status(401).json({
        status: 401,
        message: 'O nome do pet é obrigatório'
      });
    } else {
      updatedData.name = name;
    }

    if (!age) {
      return res.status(401).json({
        status: 401,
        message: 'A idade do pet é obrigatória'
      });
    } else {
      updatedData.age = age;
    }

    if (!weight) {
      return res.status(401).json({
        status: 401,
        message: 'O peso do pet é obrigatório'
      });
    } else {
      updatedData.weight = weight;
    }

    if (!color) {
      return res.status(401).json({
        status: 401,
        message: 'A cor do pet é obrigatória'
      });
    } else {
      updatedData.color = color;
    }

    if (!type) {
      return res.status(401).json({
        status: 401,
        message: 'O tipo do pet é obrigatório'
      });
    } else {
      updatedData.type = type;
    }

    if (!breed) {
      return res.status(401).json({
        status: 401,
        message: 'A raça do pet é obrigatória'
      });
    } else {
      updatedData.breed = breed;
    }

    if (!description) {
      return res.status(401).json({
        status: 401,
        message: 'A descrição do pet é obrigatória'
      });
    } else {
      updatedData.description = description;
    }

    if (!available) {
      return res.status(401).json({
        status: 401,
        message: 'A disponibilidade para adoção é obrigatória'
      });
    } else {
      updatedData.available = available;
    }

    if (avatars.length === 0) {
      return res.status(401).json({
        status: 401,
        message: 'Pelo menos uma imagem é obrigatória'
      });
    } else {
      updatedData.avatars = [];

      avatars.forEach(avatar => {
        updatedData.avatars.push(avatar.filename);
      });
    }

    try {
      await Pet.findByIdAndUpdate(id, updatedData);

      return res.status(200).json({
        status: 200,
        message: 'O pet foi atualizado com sucesso'
      });
    }
    catch (error) {
      return res.status(500).json({
        status: 500,
        message: error
      });
    }
  }

  // Schedule an adoption
  public async scheduleAdoption(req: Request, res: Response): Promise<Response> {
    const id = req.params.id;

    const { date } = req.body;

    const pet = await Pet.findOne({ _id: id });

    if (!pet) {
      return res.status(404).json({
        status: 404,
        message: 'Pet não encontrado'
      });
    }

    const token = getToken(req);
    const user = await getUserByToken(token);

    if (!user) {
      return res.status(404).json({
        status: 404,
        message: 'Usuário não encontrado'
      });
    }

    if (!pet.user) {
      return res.status(404).json({
        status: 404,
        message: 'Adotante não encontrado'
      });
    }

    if (pet.user._id!.equals(user._id!)) {
      return res.status(401).json({
        status: 401,
        message: 'Você não tem permissão para agendar uma adoção para o seu próprio pet'
      });
    }

    // Check if a user has already scheduled an adoption for this pet

    if (pet.adopter!) {
      if (pet.adopter._id!.equals(user._id!)) {
        return res.status(401).json({
          status: 401,
          message: 'Você já agendou uma adoção para este pet'
        });
      }
    };

    pet.adopter = {
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar
    }

    await Pet.findByIdAndUpdate(id, pet);

    return res.status(200).json({
      status: 200,
      message: `Adoção agendada com sucesso, entre em contato com ${pet.user.name} pelo e-mail ${pet.user.email}.`
    });
  }

  // Conclude an adoption
  public async concludeAdoption(req: Request, res: Response): Promise<Response> {
    const id = req.params.id;

    const pet = await Pet.findOne({ _id: id });

    if (!pet) {
      return res.status(404).json({
        status: 404,
        message: 'Pet não encontrado'
      });
    }

    const token = getToken(req);
    const user = await getUserByToken(token);

    if (!user) {
      return res.status(404).json({
        status: 404,
        message: 'Usuário não encontrado'
      });
    }

    if (!pet.user) {
      return res.status(404).json({
        status: 404,
        message: 'Adotante não encontrado'
      });
    }

    if (pet.user._id.toString() !== user._id.toString()) {
      return res.status(401).json({
        status: 401,
        message: 'Você não tem permissão para concluir uma adoção para o seu próprio pet'
      });
    }

    pet.available = false;

    await Pet.findByIdAndUpdate(id, pet);

    return res.status(200).json({
      status: 200,
      message: 'Adoção concluída com sucesso'
    });
  }

  // Cancel an adoption
  public async cancelAdoption(req: Request, res: Response): Promise<Response> {
    const id = req.params.id;

    const pet = await Pet.findOne({ _id: id });

    if (!pet) {
      return res.status(404).json({
        status: 404,
        message: 'Pet não encontrado'
      });
    }

    const token = getToken(req);
    const user = await getUserByToken(token);

    if (!user) {
      return res.status(404).json({
        status: 404,
        message: 'Usuário não encontrado'
      });
    }

    if (!pet.user) {
      return res.status(404).json({
        status: 404,
        message: 'Adotante não encontrado'
      });
    }

    if (pet.user._id.toString() !== user._id.toString()) {
      return res.status(401).json({
        status: 401,
        message: 'Você não tem permissão para cancelar uma adoção para o seu próprio pet'
      });
    }

    pet.adopter = {};
    pet.available = true;

    await Pet.findByIdAndUpdate(id, pet);

    return res.status(200).json({
      status: 200,
      message: 'Adoção cancelada com sucesso'
    });
  }
}

export default new PetController();
