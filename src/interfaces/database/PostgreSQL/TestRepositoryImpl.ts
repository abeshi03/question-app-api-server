/* --- lib ----------------------------------------------------------------------------------------------------------- */
import { PrismaClient } from "@prisma/client";

/* --- domain -------------------------------------------------------------------------------------------------------- */
import { Test } from "../../../domain/Tests";
import { questionType } from "../../../domain/TestQuestions";

/* --- request ------------------------------------------------------------------------------------------------------- */
import {
  Answer,
  TestPassJudgmentParams,
} from "../../request/TestPassJudgmentRequest";

/* --- repository ---------------------------------------------------------------------------------------------------- */
import { TestRepository } from "../repository/TestRepository";

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

  private async getNumberOfCorrectAnswers(answers: Answer[]): Promise<number> {
    let numberOfCorrectAnswers: number = 0;
    for (const answer of answers) {
      const question = await this.prisma.testQuestions.findUnique({
        where: {
          id: answer.questionId,
        },
        include: {
          TestOptions: true,
        },
      });

      if (!question) throw new Error("question not found");

      switch (answer.type) {
        case questionType.numberInputting: {
          /* --- 数字回答採点 ------------------------------------------------------------------------------------------ */
          if (typeof answer.payload !== "number")
            throw new Error("Invalid payload for numberInputting");

          if (answer.payload === question.answer) {
            numberOfCorrectAnswers++;
          }
          break;
        }

        /* --- 単数回答採点 -------------------------------------------------------------------------------------------- */
        case questionType.singleOption: {
          if (typeof answer.payload !== "number")
            throw new Error("Invalid payload for singleOption");

          const option = await this.prisma.testOptions.findUnique({
            where: {
              id: answer.payload,
            },
          });

          if (!option) throw new Error("Invalid option id for singleOption");

          if (option.isCorrectAnswer) numberOfCorrectAnswers++;
          break;
        }

        /* --- 複数回答採点 -------------------------------------------------------------------------------------------- */
        case questionType.singleOrMultipleOptions: {
          if (typeof answer.payload === "number") {
            throw new Error("Invalid payload for singleOrMultipleOptions");
          }

          const options = await this.prisma.testOptions.findMany({
            where: {
              id: {
                in: question.TestOptions.map((option) => option.id),
              },
            },
          });

          if (!options) {
            throw new Error("option not found");
          }

          const isCorrectOptions: number[] = options
            .filter((option) => option.isCorrectAnswer)
            .map((option) => {
              return option.id;
            });

          if (
            isCorrectOptions.sort().toString() ===
            answer.payload.sort().toString()
          ) {
            numberOfCorrectAnswers++;
          }
          break;
        }
      }
    }
    return numberOfCorrectAnswers;
  }

  public async passJudgment(
    testId: number,
    req: TestPassJudgmentParams
  ): Promise<{ isPassed: boolean }> {
    const test = await this.prisma.tests.findUnique({
      where: {
        id: testId,
      },
    });

    if (!test) {
      throw new Error("test not found");
    }

    const numberOfCorrectAnswers = await this.getNumberOfCorrectAnswers(
      req.answers
    );

    await Promise.all([test, numberOfCorrectAnswers]);

    return {
      isPassed: test.testPassingScore <= numberOfCorrectAnswers,
    };
  }
}
