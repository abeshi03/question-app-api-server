/* --- domain ------------------------------------------------------------------------------------------------------ -*/
import { Test } from "../../domain/Tests";

/* --- serializer ---------------------------------------------------------------------------------------------------- */
import { CategoryResponse, CategorySerializer } from "./CategorySerializer";

export interface TestResponse {
  id: number;
  name: string;
  thumbnailUri?: string;
  numberOfQuestions: number;
  testPassingScore: number;
  timeLimit: number;
  categories: CategoryResponse[];
}

export class TestSerializer {
  private categorySerializer: CategorySerializer;

  public constructor() {
    this.categorySerializer = new CategorySerializer();
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
}
