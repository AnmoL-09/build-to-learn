import { router } from "./trpc.js";
import { todoRouter } from "./routes/todo/todo.route.js";

// Root ROuter
export const appRouter = router({
  //...
  todos: todoRouter,
});

export type AppRouter = typeof appRouter;
