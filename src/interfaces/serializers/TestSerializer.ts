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
  timeLimit: {
    minutes: number;
    seconds: number;
  };
  categories: CategoryResponse[];
}

export interface TestTakeResponse {
  id: number;
  name: string;
  numberOfQuestions: number;
  testPassingScore: number;
  timeLimit: {
    minutes: number;
    seconds: number;
  };
  questions: TestQuestionResponse[];
}

export class TestSerializer {
  private categorySerializer: CategorySerializer;
  private testQuestionSerializer: TestQuestionSerializer;

  public constructor() {
    this.categorySerializer = new CategorySerializer();
    this.testQuestionSerializer = new TestQuestionSerializer();
  }

  public formattedTimeLimit(timeLimit__seconds: number): {
    minutes: number;
    seconds: number;
  } {
    return {
      minutes: Math.floor((timeLimit__seconds % 3600) / 60),
      seconds: timeLimit__seconds % 60,
    };
  }

  public test(test: Test): TestResponse {
    return {
      id: test.id,
      name: test.name,
      thumbnailUri: test.thumbnailUri ? test.thumbnailUri : undefined,
      numberOfQuestions: test.numberOfQuestions,
      testPassingScore: test.testPassingScore,
      timeLimit: this.formattedTimeLimit(test.timeLimit),
      categories: test.categories!.map((category) =>
        this.categorySerializer.category(category)
      ),
    };
  }

  public testTake(test: Test): TestTakeResponse {
    return {
      id: test.id,
      name: test.name,
      timeLimit: this.formattedTimeLimit(test.timeLimit),
      numberOfQuestions: test.numberOfQuestions,
      testPassingScore: test.testPassingScore,
      questions: test.testQuestions!.map((testQuestion) =>
        this.testQuestionSerializer.testQuestion(testQuestion)
      ),
    };
  }
}
