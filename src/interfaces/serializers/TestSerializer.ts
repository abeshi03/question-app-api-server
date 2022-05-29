/* --- domain ------------------------------------------------------------------------------------------------------ -*/
import { Test } from "../../domain/Tests";

export interface TestResponse {
  id: number;
  name: string;
  thumbnailUri?: string;
  numberOfQuestions: number;
  testPassingScore: number;
  timeLimit: number;
}

export class TestSerializer {
  public test(test: Test): TestResponse {
    return {
      id: test.id,
      name: test.name,
      thumbnailUri: test.thumbnailUri ? test.thumbnailUri : undefined,
      numberOfQuestions: test.numberOfQuestions,
      testPassingScore: test.testPassingScore,
      timeLimit: test.timeLimit,
    };
  }
}
