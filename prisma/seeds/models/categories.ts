import { Prisma } from "@prisma/client";
import moment from "moment";

export const categoriesData: Prisma.CategoriesCreateInput[] = [
  {
    name: "カテゴリー1",
    createdAt: moment().format(),
  },
  {
    name: "カテゴリー2",
    createdAt: moment().format(),
  },
];
