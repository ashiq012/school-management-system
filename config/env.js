import dotenv from "dotenv";
dotenv.config();

import { z } from "zod";

export const env = z
  .object({
    DB_PORT: z.coerce.number().default(3306),
    DB_HOST: z.string({ required_error: "DB_HOST is required" }),
    DB_PASSWORD: z.string({ required_error: "DB_PASSWORD is required" }),
    DB_NAME: z.string({ required_error: "DB_NAME is required" }),
    DB_USER: z.string({ required_error: "DB_USER is required" }),
  })
  .parse(process.env);
