import { TestOptions } from "../../domain/TestOptions";

export interface NoAnswerTestOptionResponse {
  id: number;
  text: string;
}

export class TestOptionSerializer {
  public noAnswerTestOption(option: TestOptions): NoAnswerTestOptionResponse {
    return {
      id: option.id,
      text: option.text,
    };
  }
}
