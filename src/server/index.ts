import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { z } from "zod";

import { db } from "./db";
import { publicProcedure, router } from "./trpc";

const appRouter = router({
  login: publicProcedure
    .input(z.object({ name: z.string(), password: z.string() }))
    .query(async (opts) => {
      const { input } = opts;

      const user = await db.user.find(input);

      return user;
    }),
  register: publicProcedure
    .input(z.object({ name: z.string(), password: z.string() }))
    .mutation(async (opts) => {
      const { input } = opts;

      const user = await db.user.create(input);

      return user;
    }),
});

export type AppRouter = typeof appRouter;

const server = createHTTPServer({
  router: appRouter,
});

server.listen(3000);
