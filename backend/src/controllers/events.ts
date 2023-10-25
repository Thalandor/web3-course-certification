import { Request, Response } from "express";
import * as eventsRepository from "../repositories/events";
import { Event } from "../repositories/events";

export const create = async (req: Request<Event>, res: Response) => {
  try {
    const { name, description, organizer } = req.body;
    const newEvent = await eventsRepository.create(
      name,
      description,
      organizer
    );
    res.status(201).json(newEvent);
  } catch (error: any) {
    console.error("Error during event creation:", error);
    res.status(500).json({ errors: error.message });
  }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const events = await eventsRepository.getAll();
    res.json(events);
  } catch (error: any) {
    console.error("Error while fetching events:", error);
    res.status(500).json({ errors: error.message });
  }
};

export const getAssistants = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const assistants = await eventsRepository.getAssistants(Number(id));
    res.json(assistants);
  } catch (error: any) {
    console.error("Error while fetching assistants:", error);
    res.status(500).json({ errors: error.message });
  }
};
