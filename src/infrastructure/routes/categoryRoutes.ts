/* --- lib ---------------------------------------------------------------------------------------------------------- */
import express from "express";
import { PrismaClient } from "@prisma/client";

/* --- controller ---------------------------------------------------------------------------------------------------- */
import { CategoryController } from "../../interfaces/controllers/CategoryController";

/* --- request ------------------------------------------------------------------------------------------------------- */
import { TestPassJudgmentRequest } from "../../interfaces/request/TestPassJudgmentRequest";

const router = express.Router();

export const categoryRoutes = (prisma: PrismaClient): express.Router => {
  const categoryController = new CategoryController(prisma);

  router.get(
    "/",
    [],
    async (req: express.Request, res: express.Response): Promise<void> => {
      const results = await categoryController.findList(req);
      res.status(results.code).send(results);
    }
  );

  return router;
};
