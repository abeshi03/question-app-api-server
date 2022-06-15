/* --- domain -------------------------------------------------------------------------------------------------------- */
import { Test } from "../../domain/Tests";

/* --- repository ---------------------------------------------------------------------------------------------------- */
import { TestRepository } from "../../interfaces/database/repository/TestRepository";
import { TestPassJudgmentParams } from "../../interfaces/request/TestPassJudgmentRequest";

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

  public passJudgment(
    testId: number,
    req: TestPassJudgmentParams
  ): Promise<{ isPassed: boolean }> {
    return this.repository.passJudgment(testId, req);
  }
}
