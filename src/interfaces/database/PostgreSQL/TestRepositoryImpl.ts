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
    const tests = await this.prisma.tests.findMany();
    return tests.map((test) => new Test(test));
  }
}
