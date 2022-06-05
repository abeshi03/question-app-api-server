import { CreateTestOptionsPayload, TestOptions } from "./TestOptions";

export const questionType = {
  singleOption: "SINGLE_OPTION",
  singleOrMultipleOptions: "SINGLE_OR_MULTIPLE_OPTIONS",
  numberInputting: "NUMBER_INPUTTING",
} as const;
export type QuestionType = typeof questionType[keyof typeof questionType];

export interface CreateTestQuestionPayload {
  id: number;
  testId: number;
  type: QuestionType;
  text: string;
  required: boolean;
  hidden: boolean;
  answer?: number;
  TestOptions: CreateTestOptionsPayload[];
}

export class TestQuestion {
  private readonly _id: number;
  private readonly _testId: number;
  private readonly _type: QuestionType;
  private readonly _required: boolean;
  private readonly _hidden: boolean;
  private readonly _answer?: number;
  private readonly _testOptions: TestOptions[];

  public get id(): number {
    return this._id;
  }

  public get testId(): number {
    return this._testId;
  }

  public get type(): QuestionType {
    return this._type;
  }

  public get required(): boolean {
    return this._required;
  }

  public get hidden(): boolean {
    return this._hidden;
  }

  public get answer(): number | undefined {
    return this._answer;
  }

  public get testOptions(): TestOptions[] {
    return this._testOptions;
  }

  public constructor(payload: CreateTestQuestionPayload) {
    this._id = payload.id;
    this._testId = payload.testId;
    this._type = payload.type;
    this._required = payload.required;
    this._hidden = payload.hidden;
    if (payload.answer) this._answer = payload.answer;
    this._testOptions = payload.TestOptions.map(
      (testOption) => new TestOptions(testOption)
    );
  }
}
