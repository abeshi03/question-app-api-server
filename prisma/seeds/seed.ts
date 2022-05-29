import { PrismaClient } from "@prisma/client";
import { lessonsData } from "./models/lessons";
import {lessonTestQuestionsData} from "./models/lessonTestQuestions";
import {lessonTestOptionsData} from "./models/lessonTestOptions";

const prisma = new PrismaClient();

async function createSeedData() {
  try {
    for (const lesson of lessonsData) {
      await prisma.lessons.create({ data: lesson });
    }
    for (const lessonTestQuestion of lessonTestQuestionsData) {
      await prisma.lessonTestQuestions.create({ data: lessonTestQuestion });
    }
    for (const lessonTestOption of lessonTestOptionsData) {
      await prisma.lessonTestOptions.create({ data: lessonTestOption });
    }
  } catch (error: unknown) {
    console.error(error);
    process.exit(1);
  } finally {

    await prisma.$disconnect();
  }
}

createSeedData();
