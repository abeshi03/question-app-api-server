import { Prisma } from "@prisma/client";
import moment from "moment";
import { questionType } from "../../../src/domain/LessonTestQuestions";

export const testQuestionsData: Prisma.TestQuestionsCreateInput[] = [
  {
    Test: { connect: { id: 1 } },
    type: questionType.numberInputting,
    text: "都道府県の数は？",
    answer: 47,
    required: true,
    hidden: false,
    createdAt: moment().format()
  },
  {
    Test: { connect: { id: 1 } },
    type: questionType.numberInputting,
    text: "今何歳",
    answer: 26,
    required: true,
    hidden: false,
    createdAt: moment().format()
  },
  {
    Test: { connect: { id: 2 } },
    type: questionType.singleOption,
    text: "信号機の色に含まれるのは？",
    required: true,
    hidden: false,
    createdAt: moment().format()
  },
  {
    Test: { connect: { id: 2 } },
    type: questionType.singleOrMultipleOptions,
    text: "サービス業は？",
    required: true,
    hidden: false,
    createdAt: moment().format()
  },
]
