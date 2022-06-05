export interface CreateTestOptionsPayload {
  id: number;
  testQuestionId: number;
  text: string;
  isCorrectAnswer: boolean;
}

export class TestOptions {
  private readonly _id: number;
  private readonly _testQuestionId: number;
  private readonly _text: string;
  private readonly _isCorrectAnswer: boolean;

  public get id(): number {
    return this._id;
  }

  public get testQuestionId(): number {
    return this._testQuestionId;
  }

  public get text(): string {
    return this._text;
  }

  public get isCorrectAnswer(): boolean {
    return this._isCorrectAnswer;
  }

  public constructor(payload: CreateTestOptionsPayload) {
    this._id = payload.id;
    this._testQuestionId = payload.testQuestionId;
    this._text = payload.text;
    this._isCorrectAnswer = payload.isCorrectAnswer;
  }
}
