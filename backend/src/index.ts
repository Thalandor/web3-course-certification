import dotenv from "dotenv";
dotenv.config();

import App from "./app";

async function start() {
  const app = new App();
  app.start();
}

start();
