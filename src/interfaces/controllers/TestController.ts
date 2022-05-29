/* --- lib ----------------------------------------------------------------------------------------------------------- */
import { PrismaClient } from "@prisma/client";
import { validationResult } from "express-validator";
import { Request } from "express";

/* --- useCase ------------------------------------------------------------------------------------------------------- */
import { TestUseCase } from "../../application/usecases/TestUseCase";

/* --- repository ---------------------------------------------------------------------------------------------------- */
import { TestRepositoryImpl } from "../database/PostgreSQL/TestRepositoryImpl";

/* --- response ------------------------------------------------------------------------------------------------------ */
import { TestResponse, TestSerializer } from "../serializers/TestSerializer";
import { ApiResponse } from "../serializers/ApplicationSerializer";

export class TestController {
  private useCase: TestUseCase;
  private serializer: TestSerializer;

  public constructor(prisma: PrismaClient) {
    const repository = new TestRepositoryImpl(prisma);
    this.useCase = new TestUseCase(repository);
    this.serializer = new TestSerializer();
  }

  public async findList(
    request: Request
  ): Promise<ApiResponse<TestResponse[]>> {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      return ApiResponse.error(422, errors.array()[0].msg);
    }

    try {
      const tests = await this.useCase.findList();
      const response = tests.map((test) => this.serializer.test(test));
      return ApiResponse.success(response);
    } catch (error: any) {
      console.log(error);
      return ApiResponse.error(500, error.message);
    }
  }
}
