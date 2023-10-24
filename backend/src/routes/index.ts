import express from "express";
import * as UserController from "../controllers/user";
import * as EventController from "../controllers/events";
export const router = express.Router();

router.get("/", (req, res) => res.send("Hello World default path!"));

// USERS
router.get("/users/:id", UserController.read);
router.get("/users/:id/events", UserController.getOwnedEvents);
router.post("/users", UserController.create);
router.post("/users/email", UserController.readByEmail);

// EVENTS
router.get("/events", EventController.getAll);
router.post("/events", EventController.create);
router.get("/events/:id/assistants", EventController.getAssistants);
