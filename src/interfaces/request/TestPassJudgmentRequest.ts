import { Request } from "express";
import { QuestionType } from "../../domain/TestQuestions";

export interface TestPassJudgmentParams {
  testId: number;
  answers: {
    type: QuestionType;
    questionId: number;
    payload: number | number[];
  }[];
}

export type TestPassJudgmentRequest = Request<TestPassJudgmentParams>;
