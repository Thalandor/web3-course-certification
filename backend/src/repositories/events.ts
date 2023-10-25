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
    const newEvent: Event = await db.one(
      "INSERT INTO events(name, description, organizer) VALUES ($1, $2, $3) RETURNING id, name, description, organizer",
      [name, description, organizer]
    );
    await db.none(
      "INSERT INTO organizer_events(event_id, user_id) VALUES ($1, $2)",
      [newEvent.id, organizer]
    );
    return newEvent;
  } catch (error: any) {
    console.error("Error during course creation:", error);
    throw new Error(error.message);
  }
};

export const getAll = async (): Promise<any[]> => {
  try {
    const events: any[] = await db.any(
      "SELECT e.id, e.name, e.description, u.id as organizerId, u.name || ' ' || u.surname as organizerName FROM events e INNER JOIN users u ON e.organizer = u.id"
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
      "SELECT e.id, e.name, e.description FROM events e INNER JOIN organizer_events oe ON oe.event_id = e.id WHERE oe.user_id = $1",
      organizerId
    );

    return events;
  } catch (error: any) {
    console.error("Error getting assistants:", error);
    throw new Error(error.message);
  }
};
