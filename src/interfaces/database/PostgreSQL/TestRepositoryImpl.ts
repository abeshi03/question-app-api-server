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
import { CreateTestParams } from "../../request/CreateTestRequest";

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
          if (typeof answer.payload !== "string")
            throw new Error("Invalid payload for numberInputting");

          if (Number(answer.payload) === question.answer) {
            numberOfCorrectAnswers++;
          }
          break;
        }

        /* --- 単数回答採点 -------------------------------------------------------------------------------------------- */
        case questionType.singleOption: {
          if (typeof answer.payload !== "string")
            throw new Error("Invalid payload for singleOption");

          const option = await this.prisma.testOptions.findUnique({
            where: {
              id: Number(answer.payload),
            },
          });

          if (!option) throw new Error("Invalid option id for singleOption");

          if (option.isCorrectAnswer) numberOfCorrectAnswers++;
          break;
        }

        /* --- 複数回答採点 -------------------------------------------------------------------------------------------- */
        case questionType.singleOrMultipleOptions: {
          if (typeof answer.payload === "string") {
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

  public async create(query: CreateTestParams): Promise<number> {
    const transactionItems = [];
    const test = this.prisma.tests.create({
      data: {
        name: query.name,
        thumbnailUri: null,
        timeLimit: query.timeLimit__seconds,
        numberOfQuestions: query.questions.length,
        testPassingScore: query.testPassingScore,
        createdAt: new Date(),
        TestCategories: {
          createMany: {
            data: query.categoriesIds.map((categoryId) => {
              return { categoryId: Number(categoryId), createdAt: new Date() };
            }),
          },
        },
      },
    });

    transactionItems.push(test);
    const testId = await test.then((res) => res.id);

    transactionItems.push(...this.createLessonTest(testId, query));

    await this.prisma.$transaction(transactionItems);

    return testId;
  }
  private createLessonTest(testId: number, test: CreateTestParams): any[] {
    const transactionItems = [];

    for (const question of test.questions) {
      if (question.type === questionType.numberInputting) {
        transactionItems.push(
          this.prisma.testQuestions.create({
            data: {
              testId,
              type: question.type,
              text: question.text,
              required: true,
              answer: Number(question.answer),
              createdAt: new Date(),
            },
          })
        );
      }

      if (
        question.type === questionType.singleOption ||
        question.type === questionType.singleOrMultipleOptions
      ) {
        if (!question.options) throw new Error("question.options missing");
        transactionItems.push(
          this.prisma.testQuestions.create({
            data: {
              testId,
              type: question.type,
              text: question.text,
              required: true,
              createdAt: new Date(),
              TestOptions: {
                createMany: {
                  data: question.options.map((option) => {
                    return {
                      text: option.text,
                      isCorrectAnswer: option.isCorrectAnswer,
                      createdAt: new Date(),
                    };
                  }),
                },
              },
            },
          })
        );
      }
    }

    return transactionItems;
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

    return {
      isPassed: test.testPassingScore <= numberOfCorrectAnswers,
    };
  }
}
