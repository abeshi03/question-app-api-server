import { Test } from "../../../domain/Tests";

export interface TestRepository {
  findList: () => Promise<Test[]>;
}
