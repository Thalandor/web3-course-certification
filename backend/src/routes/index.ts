import express from "express";
import * as TestController from "../controllers/test";
export const router = express.Router();

router.get("/test", TestController.test);

router.get("/", (req, res) => res.send("Hello World default path!"));
