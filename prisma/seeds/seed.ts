import { PrismaClient } from "@prisma/client";
import { testsData } from "./models/tests";
import { testQuestionsData } from "./models/testQuestions";
import { testOptionsData } from "./models/testOptions";
import { testCategoriesData } from "./models/testCategories";
import { categoriesData } from "./models/categories";

const prisma = new PrismaClient();

async function createSeedData() {
  try {
    for (const test of testsData) {
      await prisma.tests.create({ data: test });
    }
    for (const testQuestion of testQuestionsData) {
      await prisma.testQuestions.create({ data: testQuestion });
    }
    for (const testOption of testOptionsData) {
      await prisma.testOptions.create({ data: testOption });
    }
    for (const category of categoriesData) {
      await prisma.categories.create({ data: category });
    }
    for (const testCategory of testCategoriesData) {
      await prisma.testCategories.create({ data: testCategory });
    }
  } catch (error: unknown) {
    console.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

createSeedData();
