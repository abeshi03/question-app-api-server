/* --- lib ----------------------------------------------------------------------------------------------------------- */
import { PrismaClient } from "@prisma/client";

/* --- domain -------------------------------------------------------------------------------------------------------- */
import { Category } from "../../../domain/Categories";

/* --- repository ---------------------------------------------------------------------------------------------------- */
import { CategoryRepository } from "../repository/CategoryRepository";

export class CategoryRepositoryImpl implements CategoryRepository {
  private prisma: PrismaClient;

  public constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  public async findList(): Promise<Category[]> {
    const categories = await this.prisma.categories.findMany();
    return categories.map((category) => new Category(category));
  }
}
