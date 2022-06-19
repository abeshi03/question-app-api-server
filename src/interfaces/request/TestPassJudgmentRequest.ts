import { Request } from "express";
import { QuestionType } from "../../domain/TestQuestions";

export interface Answer {
  type: QuestionType;
  questionId: number;
  payload: number | number[];
}

export interface TestPassJudgmentParams {
  testId: number;
  answers: Answer[];
}

export type TestPassJudgmentRequest = Request<TestPassJudgmentParams>;
