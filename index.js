import dotenv from "dotenv";
dotenv.config(); 

import express from "express";
import { env } from "./config/env.js";
import schoolRoutes from "./routes/schoolRoutes.js";

const app = express();
app.use(express.json());

app.use("/api", schoolRoutes);

app.listen(env.PORT, () => {
  console.log(`Server running on port ${env.PORT}`);
});
