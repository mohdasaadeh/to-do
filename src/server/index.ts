import "dotenv/config";

import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { z } from "zod";

import { services } from "./db";
import { publicProcedure, authProcedure, router } from "./trpc";
import { createContext } from "./context";

export let sessionId: number | undefined;

const appRouter = router({
  login: publicProcedure
    .input(z.object({ username: z.string(), password: z.string() }))
    .query(async (opts) => {
      const { input } = opts;

      const user = await services.user.find(input);

      opts.ctx.sessionId = user?.id;

      sessionId = user?.id;

      return user;
    }),
  register: publicProcedure
    .input(z.object({ username: z.string(), password: z.string() }))
    .mutation(async (opts) => {
      const { input } = opts;

      const user = await services.user.create(input);

      opts.ctx.sessionId = user[0].id;

      return user;
    }),
  secret: authProcedure.query(async (opts) => {
    console.log("hello world");

    return {
      secret: "sauce",
    };
  }),
});

export type AppRouter = typeof appRouter;

const server = createHTTPServer({
  router: appRouter,
  createContext,
});

server.listen(3000);
