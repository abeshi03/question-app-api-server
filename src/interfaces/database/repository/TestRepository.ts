import { Test } from "../../../domain/Tests";
import { TestPassJudgmentParams } from "../../request/TestPassJudgmentRequest";

export interface TestRepository {
  findList: () => Promise<Test[]>;

  find: (testId: number) => Promise<Test>;

  passJudgment: (
    testId: number,
    req: TestPassJudgmentParams
  ) => Promise<{ isPassed: boolean }>;
}
