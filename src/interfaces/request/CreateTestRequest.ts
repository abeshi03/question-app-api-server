import { Request } from "express";
import { QuestionType } from "../../domain/TestQuestions";

interface CreateOptionParams {
  text: string;
  isCorrectAnswer: boolean;
}

export interface CreateTestParams {
  name: string;
  thumbnailUri?: string;
  testPassingScore: number;
  timeLimit: number;
  categoriesIds: string[];
  questions: {
    type: QuestionType;
    text: string;
    answer?: string;
    options?: CreateOptionParams[];
  }[];
}

export type CreateTestRequest = Request<CreateTestParams>;
