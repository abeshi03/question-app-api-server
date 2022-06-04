import { CreateTestQuestionPayload, TestQuestion } from "./TestQuestions";
import { Category, CreateCategoryPayload } from "./Categories";

type TestCategory = {
  Category: CreateCategoryPayload;
};

export interface CreateTestPayload {
  id: number;
  name: string;
  thumbnailUri?: string | null;
  numberOfQuestions: number;
  testPassingScore: number;
  timeLimit: number;
  TestQuestions?: CreateTestQuestionPayload[];
  TestCategories: TestCategory[];
}

export class Test {
  private readonly _id: number;
  private readonly _name: string;
  private readonly _thumbnailUri?: string;
  private readonly _numberOfQuestions: number;
  private readonly _testPassingScore: number;
  private readonly _timeLimit: number;
  private readonly _testQuestions?: TestQuestion[];
  private readonly _testCategories: Category[];

  public get id(): number {
    return this._id;
  }

  public get name(): string {
    return this._name;
  }

  public get thumbnailUri(): string | undefined {
    return this._thumbnailUri;
  }

  public get numberOfQuestions(): number {
    return this._numberOfQuestions;
  }

  public get testPassingScore(): number {
    return this._testPassingScore;
  }

  public get timeLimit(): number {
    return this._timeLimit;
  }

  public get testQuestions(): TestQuestion[] | undefined {
    return this._testQuestions;
  }

  public get categories(): Category[] {
    return this._testCategories;
  }

  public constructor(payload: CreateTestPayload) {
    this._id = payload.id;
    this._name = payload.name;
    if (payload.thumbnailUri) this._thumbnailUri = payload.thumbnailUri;
    this._numberOfQuestions = payload.numberOfQuestions;
    this._testPassingScore = payload.testPassingScore;
    this._timeLimit = payload.timeLimit;
    if (payload.TestQuestions) {
      this._testQuestions = payload.TestQuestions.map(
        (testQuestion) => new TestQuestion(testQuestion)
      );
    }
    this._testCategories = payload.TestCategories.map(
      (testCategory) => new Category(testCategory.Category)
    );
  }
}
