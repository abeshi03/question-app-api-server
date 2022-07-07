/* --- lib ----------------------------------------------------------------------------------------------------------- */
import express, { Application } from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

/* --- router -------------------------------------------------------------------------------------------------------- */
import { testRoutes } from "./infrastructure/routes/testRoutes";
import { categoryRoutes } from "./infrastructure/routes/categoryRoutes";

const app: Application = express();
const allowedOrigins = ["http://localhost:3000"];
const options: cors.CorsOptions = {
  credentials: true,
  origin: allowedOrigins,
};

const prisma = new PrismaClient();

app.use(cors(options));
app.use(express.json());

app.get("/", (req: express.Request, res: express.Response) => {
  res.send("Hello world!");
});

app.use("/tests", testRoutes(prisma));
app.use("/categories", categoryRoutes(prisma));

app.get("*", (req, res) => {
  return res.status(400).send({ error: "Invalid Url" });
});

export default app;
