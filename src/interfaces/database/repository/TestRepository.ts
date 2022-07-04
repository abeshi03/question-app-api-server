/* --- domain ------------------------------------------------------------------------------------------------------- */
import { Test } from "../../../domain/Tests";

/* --- request ------------------------------------------------------------------------------------------------------ */
import { TestPassJudgmentParams } from "../../request/TestPassJudgmentRequest";
import { CreateTestParams } from "../../request/CreateTestRequest";

export interface TestRepository {
  findList: () => Promise<Test[]>;

  find: (testId: number) => Promise<Test>;

  create: (query: CreateTestParams) => Promise<number>;

  passJudgment: (
    testId: number,
    req: TestPassJudgmentParams
  ) => Promise<{ isPassed: boolean }>;
}
