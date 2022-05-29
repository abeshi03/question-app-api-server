/* --- lib ---------------------------------------------------------------------------------------------------------- */
import express from "express";
import { PrismaClient } from "@prisma/client";

/* --- controller ---------------------------------------------------------------------------------------------------- */
import { TestController } from "../../interfaces/controllers/TestController";

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

  return router;
};
