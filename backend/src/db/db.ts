import pgPromise, { IDatabase, IMain } from "pg-promise";

const pgp: IMain = pgPromise();

const dbConfig = {
  host: process.env.DB_HOST || "host",
  port: parseInt(process.env.DB_PORT || "5432", 10),
  database: process.env.DB_NAME || "database",
  user: process.env.DB_USER || "user",
  password: process.env.DB_PASSWORD || "password",
};

const db: IDatabase<any> = pgp(dbConfig);

export { db };
