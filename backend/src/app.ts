import express from "express";
import { router } from "./routes";

export default class App {
  #app: express.Application;

  constructor() {
    this.#app = express();
  }

  getApp = () => {
    return this.#app;
  };

  start = async () => {
    // Middlewares
    this.#app.use(express.json());

    // Set routes
    this.#app.use("/", router);

    const port = process.env.EXPRESS_PORT;

    this.#app.listen(port, () => {
      return console.log(
        `Express server is listening at http://localhost:${port} 🚀`
      );
    });
  };
}
