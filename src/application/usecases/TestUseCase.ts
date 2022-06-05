/* --- domain -------------------------------------------------------------------------------------------------------- */
import { Test } from "../../domain/Tests";

/* --- repository ---------------------------------------------------------------------------------------------------- */
import { TestRepository } from "../../interfaces/database/repository/TestRepository";

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
}
