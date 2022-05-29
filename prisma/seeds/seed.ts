import { PrismaClient } from "@prisma/client";
import { lessonsData } from "./models/lessons";

const prisma = new PrismaClient();

async function createSeedData() {
  try {
    for (const lesson of lessonsData) {
      await prisma.lessons.create({ data: lesson });
    }
  } catch (error: unknown) {
    console.error(error);
    process.exit(1);
  } finally {

    await prisma.$disconnect();
  }
}

createSeedData();
