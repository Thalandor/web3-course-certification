import { db } from "../db/db";

export interface Event {
  id: string;
  name: string;
  description: string;
  organizer: string;
}

export const create = async (
  name: string,
  description: string,
  organizer: string
): Promise<Event> => {
  try {
    const newCourse: Event = await db.one(
      "INSERT INTO events(name, description, organizer) VALUES ($1, $2, $3) RETURNING id, name, description, organizer",
      [name, description, organizer]
    );

    return newCourse;
  } catch (error: any) {
    console.error("Error during course creation:", error);
    throw new Error(error.message);
  }
};

export const getAll = async (): Promise<any[]> => {
  try {
    const events: any[] = await db.any(
      "SELECT id, name, description, u.id, u.name || ' ' || u.surname FROM events e INNER JOIN users u ON e.organizer = u.id"
    );

    return events;
  } catch (error: any) {
    console.error("Error getting events:", error);
    throw new Error(error.message);
  }
};

export const getAssistants = async (eventId: string): Promise<any[]> => {
  try {
    const assistants: any[] = await db.any(
      "SELECT u.id, u.name, u.surname, u.email, u.account FROM users u INNER JOIN users_events ua ON ua.user_id = u.id WHERE ua.event_id = $1",
      eventId
    );

    return assistants;
  } catch (error: any) {
    console.error("Error getting assistants:", error);
    throw new Error(error.message);
  }
};

export const getOwnedEvents = async (organizerId: string): Promise<any[]> => {
  try {
    const events: any[] = await db.any(
      "SELECT id, name, description FROM events e INNER JOIN organizer_events oe ON oe.event_id = e.id WHERE oe.user_id = $1",
      organizerId
    );

    return events;
  } catch (error: any) {
    console.error("Error getting assistants:", error);
    throw new Error(error.message);
  }
};
