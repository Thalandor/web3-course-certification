import { db } from "../db/db";

export interface User {
  id: string;
  name: string;
  surname: string;
  account: string;
  email: string;
  password: string;
}

export const createUser = async (
  name: string,
  surname: string,
  email: string,
  account: string,
  password: string
): Promise<User> => {
  try {
    const newUser: User = await db.one(
      "INSERT INTO users(name, surname, account, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING id, name, email",
      [name, surname, account, email, password]
    );

    return newUser;
  } catch (error: any) {
    console.error("Error during user creation:", error);
    throw new Error(error.message);
  }
};

export const getUserById = async (
  id: string,
  options: { getPassword?: boolean } = { getPassword: false }
): Promise<User | null> => {
  try {
    const user: User | null = await db.oneOrNone(
      options.getPassword
        ? "SELECT id, name, email, password FROM users WHERE id = $1"
        : "SELECT id, name, email FROM users WHERE id = $1",
      [id]
    );

    return user;
  } catch (error: any) {
    console.error("Error while fetching user:", error);
    throw new Error(error.message);
  }
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
  try {
    const user: User | null = await db.oneOrNone(
      "SELECT id, name, email, password FROM users WHERE email = $1",
      email
    );
    return user;
  } catch (error: any) {
    console.error("Error while fetching user:", error);
    throw new Error(error.message);
  }
};
