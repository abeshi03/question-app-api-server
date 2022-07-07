/* --- domain -------------------------------------------------------------------------------------------------------- */
import { Category } from "../../domain/Categories";

/* --- repository ---------------------------------------------------------------------------------------------------- */
import { CategoryRepository } from "../../interfaces/database/repository/CategoryRepository";

export class CategoryUseCase {
  private repository: CategoryRepository;
  public constructor(repository: CategoryRepository) {
    this.repository = repository;
  }

  public findList(): Promise<Category[]> {
    return this.repository.findList();
  }
}
