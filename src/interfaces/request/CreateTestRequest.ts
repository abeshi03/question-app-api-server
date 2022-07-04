import { Request } from "express";

interface CreateOptionParams {
  text: string;
  isCorrectAnswer: boolean;
}

export interface CreateTestParams {
  name: string;
  thumbnailUri?: string;
  testPassingScore: number;
  timeLimit__seconds: number;
  categoriesIds: string[];
  questions: {
    type: string;
    text: string;
    answer?: number;
    options?: CreateOptionParams[];
  }[];
}

export type CreateTestRequest = Request<CreateTestParams>;
