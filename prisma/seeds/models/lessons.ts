import { Prisma } from "@prisma/client";
import moment from "moment";
import { sampleImageUri } from "../sample";

export const lessonsData: Prisma.LessonsCreateInput[] = [
  {
    name: "テストレッスン1",
    thumbnailUri: sampleImageUri,
    numberOfQuestions: 2,
    testPassingScore: 2,
    timeLimit: 120,
    createdAt: moment().format()
  },
  {
    name: "テストレッスン2",
    thumbnailUri: sampleImageUri,
    numberOfQuestions: 2,
    testPassingScore: 2,
    timeLimit: 120,
    createdAt: moment().format()
  },
]
