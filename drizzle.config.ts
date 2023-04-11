import "dotenv/config";
import type { Config } from "drizzle-kit";

const config: Config = {
  schema: "./app/db/schema.ts",
  out:"./app/db/out",
  connectionString: process.env.DB_URL,
};

export default config;
