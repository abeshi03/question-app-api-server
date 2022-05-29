import { Prisma } from "@prisma/client";
import moment from "moment";

export const lessonTestOptionsData: Prisma.LessonTestOptionsCreateInput[] = [
  {
    text: "赤",
    isCorrectAnswer: true,
    createdAt: moment().format(),
    LessonTestQuestion: { connect: { id: 3 } }
  },
  {
    text: "黒",
    isCorrectAnswer: false,
    createdAt: moment().format(),
    LessonTestQuestion: { connect: { id: 3 } }
  },
  {
    text: "白",
    isCorrectAnswer: false,
    createdAt: moment().format(),
    LessonTestQuestion: { connect: { id: 3 } }
  },
  {
    text: "飲食店",
    isCorrectAnswer: true,
    createdAt: moment().format(),
    LessonTestQuestion: { connect: { id: 4 } }
  },
  {
    text: "美容室",
    isCorrectAnswer: true,
    createdAt: moment().format(),
    LessonTestQuestion: { connect: { id: 4 } }
  },
  {
    text: "警察官",
    isCorrectAnswer: false,
    createdAt: moment().format(),
    LessonTestQuestion: { connect: { id: 4 } }
  },
]
