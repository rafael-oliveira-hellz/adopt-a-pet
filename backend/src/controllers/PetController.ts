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

    // const avatars = JSON.parse(JSON.stringify(req.files));

    const avatars = req.files as Express.Multer.File[];

    if (avatars === null) {
      return res.status(401).json({
        status: 401,
        error: 'Images are required'
      });
    }

    // Validations

    if (!name) {
      return res.status(401).json({
        status: 401,
        error: 'Name is required'
      });
    }

    if (!age) {
      return res.status(401).json({
        status: 401,
        error: 'Age is required'
      });
    }

    if (!weight) {
      return res.status(401).json({
        status: 401,
        error: 'Weight is required'
      });
    }

    if (!color) {
      return res.status(401).json({
        status: 401,
        error: 'Color is required'
      });
    }

    if (!type) {
      return res.status(401).json({
        status: 401,
        error: 'Type is required'
      });
    }

    if (!breed) {
      return res.status(401).json({
        status: 401,
        error: 'Breed is required'
      });
    }

    if (!description) {
      return res.status(401).json({
        status: 401,
        error: 'Description is required'
      });
    }

    // Get pet owner

    const token = getToken(req);
    const user = await getUserByToken(token);

    if (!user) {
      return res.status(404).json({
        status: 404,
        error: 'User not found'
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

    avatars.map((avatar: any) => {
      pet.avatars?.push(avatar.filename);
    });

    try {

      const newPet = await pet.save();

      return res.status(201).json({
        status: 201,
        message: 'Pet created successfully',
        data: newPet
      });

    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: error
      });
    }

  }

  // List all pets
  public async listAllPets(req: Request, res: Response): Promise<Response> {
    try {
      const pets = await Pet.find().sort("-createdAt");

      return res.status(200).json({
        status: 200,
        message: 'Pets listed successfully',
        data: pets
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
        error: 'User not found'
      });
    }

    try {
      const pets = await Pet.find({ 'user._id': user._id }).sort("-createdAt");

      return res.status(200).json({
        status: 200,
        message: 'Pets listed successfully',
        data: pets
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
        error: 'Invalid ID'
      });
    }

    try {
      const pet = await Pet.findOne({ _id: id });

      if (!pet) {
        return res.status(404).json({
          status: 404,
          error: 'Pet not found'
        });
      }

      return res.status(200).json({
        status: 200,
        message: 'Pet listed successfully',
        data: pet
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
        error: 'User not found'
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
        data: pets
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
        error: 'Invalid ID'
      });
    }

    const pet = await Pet.findOne({ _id: id });

    if (!pet) {
      return res.status(404).json({
        status: 404,
        error: 'Pet not found'
      });
    }

    const token = getToken(req);
    const user = await getUserByToken(token);

    if (!user) {
      return res.status(404).json({
        status: 404,
        error: 'User not found'
      });
    }

    if (!pet.user) {
      return res.status(404).json({
        status: 404,
        error: 'Adopter not found'
      });
    }

    try {

      if (pet.user._id.toString() !== user._id.toString()) {
        return res.status(401).json({
          status: 401,
          error: 'You are not allowed to delete this pet'
        });
      }

      await Pet.findByIdAndRemove(id);

      return res.status(200).json({
        status: 200,
        message: 'Pet deleted successfully'
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
        error: 'Pet not found'
      });
    }

    const token = getToken(req);
    const user = await getUserByToken(token);

    if (!user) {
      return res.status(404).json({
        status: 404,
        error: 'User not found'
      });
    }

    if (!pet.user) {
      return res.status(404).json({
        status: 404,
        error: 'Adopter not found'
      });
    }

    if (pet.user._id.toString() !== user._id.toString()) {
      return res.status(401).json({
        status: 401,
        error: 'You are not allowed to delete this pet'
      });
    }

    // Validate if all the fields were filled

    if (!name) {
      return res.status(401).json({
        status: 401,
        error: 'Name is required'
      });
    } else {
      updatedData.name = name;
    }

    if (!age) {
      return res.status(401).json({
        status: 401,
        error: 'Age is required'
      });
    } else {
      updatedData.age = age;
    }

    if (!weight) {
      return res.status(401).json({
        status: 401,
        error: 'Weight is required'
      });
    } else {
      updatedData.weight = weight;
    }

    if (!color) {
      return res.status(401).json({
        status: 401,
        error: 'Color is required'
      });
    } else {
      updatedData.color = color;
    }

    if (!type) {
      return res.status(401).json({
        status: 401,
        error: 'Type is required'
      });
    } else {
      updatedData.type = type;
    }

    if (!breed) {
      return res.status(401).json({
        status: 401,
        error: 'Breed is required'
      });
    } else {
      updatedData.breed = breed;
    }

    if (!description) {
      return res.status(401).json({
        status: 401,
        error: 'Description is required'
      });
    } else {
      updatedData.description = description;
    }

    if (!available) {
      return res.status(401).json({
        status: 401,
        error: 'Available field is required'
      });
    } else {
      updatedData.available = available;
    }

    if (avatars.length === 0) {
      return res.status(401).json({
        status: 401,
        error: 'At least one pet image is required'
      });
    } else {
      updatedData.avatars = [];

      avatars.map(avatar => {
        updatedData.avatars.push(avatar.filename);
      });
    }

    try {
      await Pet.findByIdAndUpdate(id, updatedData);

      return res.status(200).json({
        status: 200,
        message: 'Pet updated successfully'
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
        error: 'Pet not found'
      });
    }

    const token = getToken(req);
    const user = await getUserByToken(token);

    if (!user) {
      return res.status(404).json({
        status: 404,
        error: 'User not found'
      });
    }

    if (!pet.user) {
      return res.status(404).json({
        status: 404,
        error: 'Adopter not found'
      });
    }

    if (pet.user._id!.equals(user._id!)) {
      return res.status(401).json({
        status: 401,
        error: 'You are not allowed to schedule an adoption for your own pet'
      });
    }

    // Check if a user has already scheduled an adoption for this pet

    if (pet.adopter!) {
      if (pet.adopter._id!.equals(user._id!)) {
        return res.status(401).json({
          status: 401,
          error: 'You have already scheduled an adoption for this pet'
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
      message: `Adoption scheduled successfully, get in touch with ${pet.user.name} at ${pet.user.email}.`
    });
  }

  // Conclude an adoption
  public async concludeAdoption(req: Request, res: Response): Promise<Response> {
    const id = req.params.id;

    const pet = await Pet.findOne({ _id: id });

    if (!pet) {
      return res.status(404).json({
        status: 404,
        error: 'Pet not found'
      });
    }

    const token = getToken(req);
    const user = await getUserByToken(token);

    if (!user) {
      return res.status(404).json({
        status: 404,
        error: 'User not found'
      });
    }

    if (!pet.user) {
      return res.status(404).json({
        status: 404,
        error: 'Adopter not found'
      });
    }

    if (pet.user._id.toString() !== user._id.toString()) {
      return res.status(401).json({
        status: 401,
        error: 'You are not allowed to conclude an adoption for your own pet'
      });
    }

    pet.available = false;

    await Pet.findByIdAndUpdate(id, pet);

    return res.status(200).json({
      status: 200,
      message: 'Adoption concluded successfully'
    });
  }

  // Cancel an adoption
  public async cancelAdoption(req: Request, res: Response): Promise<Response> {
    const id = req.params.id;

    const pet = await Pet.findOne({ _id: id });

    if (!pet) {
      return res.status(404).json({
        status: 404,
        error: 'Pet not found'
      });
    }

    const token = getToken(req);
    const user = await getUserByToken(token);

    if (!user) {
      return res.status(404).json({
        status: 404,
        error: 'User not found'
      });
    }

    if (!pet.user) {
      return res.status(404).json({
        status: 404,
        error: 'Adopter not found'
      });
    }

    if (pet.user._id.toString() !== user._id.toString()) {
      return res.status(401).json({
        status: 401,
        error: 'You are not allowed to cancel an adoption for your own pet'
      });
    }

    pet.adopter = {};
    pet.available = true;

    await Pet.findByIdAndUpdate(id, pet);

    return res.status(200).json({
      status: 200,
      message: 'Adoption canceled successfully'
    });
  }
}

export default new PetController();
