/* --- domain ------------------------------------------------------------------------------------------------------ -*/
import { TestQuestion } from "../../domain/TestQuestions";

/* --- serializer ---------------------------------------------------------------------------------------------------- */
import {
  NoAnswerTestOptionResponse,
  TestOptionSerializer,
} from "./TestOptionSerializer";

export interface TestQuestionResponse {
  id: number;
  type: string;
  text: string;
  options: NoAnswerTestOptionResponse[];
}

export class TestQuestionSerializer {
  private testOptionSerializer: TestOptionSerializer;

  public constructor() {
    this.testOptionSerializer = new TestOptionSerializer();
  }

  public testQuestion(question: TestQuestion): TestQuestionResponse {
    return {
      id: question.id,
      type: question.type,
      text: question.text,
      options: question.testOptions.map((option) =>
        this.testOptionSerializer.noAnswerTestOption(option)
      ),
    };
  }
}
