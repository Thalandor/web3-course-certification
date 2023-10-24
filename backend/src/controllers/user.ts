import { Request, Response } from "express";
import * as usersRepository from "../repositories/users";
import * as eventsRepository from "../repositories/events";
import bcrypt from "bcrypt";

const SALT = 10;

export const create = async (req: Request, res: Response) => {
  try {
    const { name, surname, account, email, password } = req.body;
    const user = await usersRepository.getUserByEmail(email);
    if (user) {
      return res.status(404).json({ errors: "User already exists." });
    }
    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, SALT);
    const newUser = await usersRepository.createUser(
      name,
      surname,
      account,
      email,
      hashedPassword
    );
    res.status(201).json(newUser);
  } catch (error: any) {
    console.error("Error during user creation:", error);
    res.status(500).json({ errors: error.message });
  }
};

export const read = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await usersRepository.getUserById(id);
    if (!user) {
      return res.status(404).json({ errors: "User not found." });
    }
    res.json(user);
  } catch (error: any) {
    console.error("Error while fetching users:", error);
    res.status(500).json({ errors: error.message });
  }
};

export const readByEmail = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const user = await usersRepository.getUserByEmail(email);
    if (!user) {
      return res.status(404).json({ errors: "User not found." });
    }
    res.json(user);
  } catch (error: any) {
    console.error("Error while fetching users:", error);
    res.status(500).json({ errors: error.message });
  }
};

export const getOwnedEvents = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const events = await eventsRepository.getOwnedEvents(id);
    res.json(events);
  } catch (error: any) {
    console.error("Error while fetching owned events:", error);
    res.status(500).json({ errors: error.message });
  }
};
