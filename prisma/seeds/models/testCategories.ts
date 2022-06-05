import { Prisma } from "@prisma/client";
import moment from "moment";

export const testCategoriesData: Prisma.TestCategoriesCreateInput[] = [
  {
    Test: { connect: { id: 1 } },
    Category: { connect: { id: 1 } },
    createdAt: moment().format(),
  },
  {
    Test: { connect: { id: 2 } },
    Category: { connect: { id: 2 } },
    createdAt: moment().format(),
  },
];
