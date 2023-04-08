import { drizzle } from "drizzle-orm/planetscale-serverless";
import { Client } from "@planetscale/database";
import { people } from "./schema";

const {
  DATABASE_HOST: host,
  DATABASE_USERNAME: username,
  DATABASE_PASSWORD: password,
} = process.env;

if (!host || !username || !password) {
  throw new Error("Some of env variables are missing");
}
const client = new Client({
  fetch,
  host,
  username,
  password,
});

const connection = client.connection();
export const db = drizzle(connection);

export const getPeople = async () => {
  return await db.select().from(people);
}
