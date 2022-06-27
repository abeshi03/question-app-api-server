/* --- domain -------------------------------------------------------------------------------------------------------- */
import { Test } from "../../domain/Tests";

/* --- repository ---------------------------------------------------------------------------------------------------- */
import { TestRepository } from "../../interfaces/database/repository/TestRepository";
import { TestPassJudgmentParams } from "../../interfaces/request/TestPassJudgmentRequest";
import { CreateTestParams } from "../../interfaces/request/CreateTestRequest";

export class TestUseCase {
  private repository: TestRepository;
  public constructor(repository: TestRepository) {
    this.repository = repository;
  }

  public findList(): Promise<Test[]> {
    return this.repository.findList();
  }

  public find(testId: number): Promise<Test> {
    return this.repository.find(testId);
  }

  public create(query: CreateTestParams): Promise<number> {
    return this.repository.create(query);
  }

  public passJudgment(
    testId: number,
    req: TestPassJudgmentParams
  ): Promise<{ isPassed: boolean }> {
    return this.repository.passJudgment(testId, req);
  }
}
