/* --- domain ------------------------------------------------------------------------------------------------------- */
import { Category } from "../../../domain/Categories";

export interface CategoryRepository {
  findList: () => Promise<Category[]>;
}
