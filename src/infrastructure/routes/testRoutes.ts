/* --- lib ---------------------------------------------------------------------------------------------------------- */
import express from "express";
import { param } from "express-validator";
import { PrismaClient } from "@prisma/client";

/* --- controller ---------------------------------------------------------------------------------------------------- */
import { TestController } from "../../interfaces/controllers/TestController";

/* --- request ------------------------------------------------------------------------------------------------------- */
import { TestPassJudgmentRequest } from "../../interfaces/request/TestPassJudgmentRequest";

const router = express.Router();

export const testRoutes = (prisma: PrismaClient): express.Router => {
  const testController = new TestController(prisma);

  router.get(
    "/",
    [],
    async (req: express.Request, res: express.Response): Promise<void> => {
      const results = await testController.findList(req);
      res.status(results.code).send(results);
    }
  );

  router.post(
    "/",
    [],
    async (req: express.Request, res: express.Response): Promise<void> => {
      const results = await testController.create(req);
      res.status(results.code).send(results);
    }
  );

  router.get(
    "/:id/take",
    [param("id").isInt().withMessage("Invalid id")],
    async (req: express.Request, res: express.Response): Promise<void> => {
      const results = await testController.testTake(req);
      res.status(results.code).send(results);
    }
  );

  router.post(
    "/:testId/submit",
    [param("testId").isInt().withMessage("Invalid testId")],
    async (
      req: TestPassJudgmentRequest,
      res: express.Response
    ): Promise<void> => {
      const results = await testController.passJudgment(req);
      res.status(results.code).send(results);
    }
  );

  return router;
};
