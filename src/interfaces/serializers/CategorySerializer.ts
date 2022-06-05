/* --- domain ------------------------------------------------------------------------------------------------------ -*/
import { Category } from "../../domain/Categories";

export interface CategoryResponse {
  id: number;
  name: string;
}

export class CategorySerializer {
  public category(category: Category): CategoryResponse {
    return {
      id: category.id,
      name: category.name,
    };
  }
}
