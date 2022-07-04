/* --- lib ----------------------------------------------------------------------------------------------------------- */
import { PrismaClient } from "@prisma/client";
import { validationResult } from "express-validator";
import { Request } from "express";

/* --- useCase ------------------------------------------------------------------------------------------------------- */
import { TestUseCase } from "../../application/usecases/TestUseCase";

/* --- repository ---------------------------------------------------------------------------------------------------- */
import { TestRepositoryImpl } from "../database/PostgreSQL/TestRepositoryImpl";

/* --- response ------------------------------------------------------------------------------------------------------ */
import {
  TestResponse,
  TestSerializer,
  TestTakeResponse,
} from "../serializers/TestSerializer";
import { ApiResponse } from "../serializers/ApplicationSerializer";
import { TestPassJudgmentRequest } from "../request/TestPassJudgmentRequest";

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

  public async testTake(
    request: Request
  ): Promise<ApiResponse<TestTakeResponse>> {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      return ApiResponse.error(422, errors.array()[0].msg);
    }

    try {
      const id = Number(request.params.id);
      const test = await this.useCase.find(id);
      const response = this.serializer.testTake(test);
      return ApiResponse.success(response);
    } catch (error: any) {
      if (error.message === "test not found") {
        return ApiResponse.error(404, error.message);
      }
      return ApiResponse.error(500, error.message);
    }
  }

  public async create(request: Request): Promise<ApiResponse<number>> {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      return ApiResponse.error(422, errors.array()[0].msg);
    }

    try {
      const testId = await this.useCase.create(request.body);
      return ApiResponse.success(testId);
    } catch (error: any) {
      return ApiResponse.error(500, error.message);
    }
  }

  public async passJudgment(
    request: TestPassJudgmentRequest
  ): Promise<ApiResponse<{ isPassed: boolean }>> {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      return ApiResponse.error(422, errors.array()[0].msg);
    }

    try {
      const id = Number(request.params.testId);
      const response = await this.useCase.passJudgment(id, request.body);
      return ApiResponse.success(response);
    } catch (error: any) {
      if (error.message === "test not found") {
        return ApiResponse.error(404, error.message);
      }
      if (error.message === "question not found") {
        return ApiResponse.error(404, error.message);
      }
      if (error.message === "Invalid payload for numberInputting") {
        return ApiResponse.error(400, error.message);
      }
      if (error.message === "Invalid payload for singleOption") {
        return ApiResponse.error(400, error.message);
      }
      if (error.message === "Invalid payload for singleOrMultipleOptions") {
        return ApiResponse.error(400, error.message);
      }
      if (error.message === "option not found") {
        return ApiResponse.error(404, error.message);
      }
      return ApiResponse.error(500, error.message);
    }
  }
}
