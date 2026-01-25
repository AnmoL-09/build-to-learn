import { router } from "./trpc.js";

// Root ROuter
const appRouter = router({
  //...
});

export type AppRouter = typeof appRouter;
