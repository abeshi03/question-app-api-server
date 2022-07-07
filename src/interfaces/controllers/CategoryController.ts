/* --- libs --------------------------------------------------------------------------------------------------------- */
import { Request } from "express";
import { validationResult } from "express-validator";
import { PrismaClient } from "@prisma/client/scripts/default-index";

/* --- useCase ------------------------------------------------------------------------------------------------------ */
import { CategoryUseCase } from "../../application/usecases/CategoryUseCase";

/* --- repository --------------------------------------------------------------------------------------------------- */
import { CategoryRepositoryImpl } from "../database/PostgreSQL/CategoryRepositoryImpl";

/* --- response ------------------------------------------------------------------------------------------------------ */
import { ApiResponse } from "../serializers/ApplicationSerializer";
import {
  CategoryResponse,
  CategorySerializer,
} from "../serializers/CategorySerializer";

export class CategoryController {
  private useCase: CategoryUseCase;
  private serializer: CategorySerializer;

  public constructor(prisma: PrismaClient) {
    const repository = new CategoryRepositoryImpl(prisma);
    this.useCase = new CategoryUseCase(repository);
    this.serializer = new CategorySerializer();
  }

  public async findList(
    request: Request
  ): Promise<ApiResponse<CategoryResponse[]>> {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      return ApiResponse.error(422, errors.array()[0].msg);
    }

    try {
      const categories = await this.useCase.findList();
      const response = categories.map((category) =>
        this.serializer.category(category)
      );
      return ApiResponse.success(response);
    } catch (error: any) {
      console.log(error);
      return ApiResponse.error(500, error.message);
    }
  }
}
