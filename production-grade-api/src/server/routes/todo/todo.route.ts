import { router, publicProcedure } from "../../trpc.js";
import { z } from "zod";
import { getAllTodosOutputModel, type Todo } from "./models.js";

const TODOS: Todo[] = [
  {
    id: "1",
    isCompleted: false,
    title: "Record Video",
    description: "I need to record a video on production grade APIs",
  },
];

export const todoRouter = router({
  getAllTodos: publicProcedure
    .input(z.undefined())
    .output(getAllTodosOutputModel)
    .query(() => {
      return {
        todos: TODOS,
      };
    }),
});
