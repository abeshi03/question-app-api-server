import { Test } from "../../../domain/Tests";

export interface TestRepository {
  findList: () => Promise<Test[]>;
  find: (testId: number) => Promise<Test>;
}
