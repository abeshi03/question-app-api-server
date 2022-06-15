import { Prisma } from "@prisma/client";
import moment from "moment";
import { sampleImageUri } from "../sample";

export const testsData: Prisma.TestsCreateInput[] = [
  {
    name: "テスト1",
    thumbnailUri: sampleImageUri,
    numberOfQuestions: 2,
    testPassingScore: 2,
    timeLimit: 20,
    createdAt: moment().format(),
  },
  {
    name: "テスト2",
    thumbnailUri: sampleImageUri,
    numberOfQuestions: 2,
    testPassingScore: 2,
    timeLimit: 70,
    createdAt: moment().format(),
  },
];
