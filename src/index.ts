/* --- lib ----------------------------------------------------------------------------------------------------------- */
import express, { Application } from "express";
import { PrismaClient } from "@prisma/client";

/* --- router -------------------------------------------------------------------------------------------------------- */
import { testRoutes } from "./infrastructure/routes/testRoutes";

const app: Application = express();

const prisma = new PrismaClient();

app.use(express.json());

app.get("/", (req: express.Request, res: express.Response) => {
  res.send("Hello world!");
});

app.get("*", (req, res) => {
  return res.status(400).send({ error: "Invalid Url" });
});

app.use("/tests", testRoutes(prisma));

export default app;
