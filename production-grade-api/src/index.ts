import express from "express";
import * as trpcExpress from "@trpc/server/adapters/express";
import { createContext } from "node:vm";
import { appRouter } from "./server/index.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  return res.json({ status: "Server is up and running" });
});

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  }),
);

app.listen(8000, () => console.log(`Express server is running on PORT 8000`));
