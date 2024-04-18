import { TRPCError, initTRPC } from "@trpc/server";

import { Context } from "./context";

const t = initTRPC.context<Context>().create();

export const router = t.router;

export const publicProcedure = t.procedure;

export const authProcedure = t.procedure.use(async function isAuthed(opts) {
  const { ctx } = opts;

  if (!ctx.sessionId) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return opts.next({
    ctx: {
      sessionId: ctx.sessionId,
    },
  });
});
