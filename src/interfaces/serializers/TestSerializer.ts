/* --- domain ------------------------------------------------------------------------------------------------------ -*/
import { Test } from "../../domain/Tests";

/* --- serializer ---------------------------------------------------------------------------------------------------- */
import { CategoryResponse, CategorySerializer } from "./CategorySerializer";
import {
  TestQuestionResponse,
  TestQuestionSerializer,
} from "./TestQuestionSeliarizer";

export interface TestResponse {
  id: number;
  name: string;
  thumbnailUri?: string;
  numberOfQuestions: number;
  testPassingScore: number;
  timeLimit: number;
  categories: CategoryResponse[];
}

export interface TestTakeResponse {
  id: number;
  name: string;
  numberOfQuestions: number;
  testPassingScore: number;
  timeLimit: number;
  question: TestQuestionResponse[];
}

export class TestSerializer {
  private categorySerializer: CategorySerializer;
  private testQuestionSerializer: TestQuestionSerializer;

  public constructor() {
    this.categorySerializer = new CategorySerializer();
    this.testQuestionSerializer = new TestQuestionSerializer();
  }

  public test(test: Test): TestResponse {
    return {
      id: test.id,
      name: test.name,
      thumbnailUri: test.thumbnailUri ? test.thumbnailUri : undefined,
      numberOfQuestions: test.numberOfQuestions,
      testPassingScore: test.testPassingScore,
      timeLimit: test.timeLimit,
      categories: test.categories!.map((category) =>
        this.categorySerializer.category(category)
      ),
    };
  }

  public testTake(test: Test): TestTakeResponse {
    return {
      id: test.id,
      name: test.name,
      timeLimit: test.timeLimit,
      numberOfQuestions: test.numberOfQuestions,
      testPassingScore: test.testPassingScore,
      question: test.testQuestions!.map((testQuestion) =>
        this.testQuestionSerializer.testQuestion(testQuestion)
      ),
    };
  }
}
