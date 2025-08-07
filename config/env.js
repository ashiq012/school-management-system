import dotenv from "dotenv";
dotenv.config();

import { z } from "zod";

export const env = z
  .object({
    PORT: z.coerce.number().default(3000),
    MYSQLHOST: z.string(),
    MYSQLUSER: z.string(),
    MYSQLPASSWORD: z.string(),
    MYSQLDATABASE: z.string(),
    MYSQLPORT: z.coerce.number().default(3306), // optional, for clarity
  })
  .parse(process.env);
