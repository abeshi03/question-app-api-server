/* --- lib ----------------------------------------------------------------------------------------------------------- */
import { PrismaClient } from "@prisma/client";

/* --- repository ---------------------------------------------------------------------------------------------------- */
import { TestRepository } from "../repository/TestRepository";
import { Test } from "../../../domain/Tests";

export class TestRepositoryImpl implements TestRepository {
  private prisma: PrismaClient;

  public constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  public async findList(): Promise<Test[]> {
    const tests = await this.prisma.tests.findMany({
      include: {
        TestCategories: {
          include: {
            Category: true,
          },
        },
      },
    });
    return tests.map((test) => new Test(test));
  }

  public async find(testId: number): Promise<Test> {
    const test = await this.prisma.tests.findUnique({
      where: {
        id: testId,
      },
      include: {
        TestQuestions: {
          include: {
            TestOptions: true,
          },
        },
      },
    });

    if (!test) throw new Error("test not found");

    return new Test(test);
  }
}
