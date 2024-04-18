import * as trpcNext from "@trpc/server/adapters/next";

export async function createContext({
  req,
  res,
}: trpcNext.CreateNextContextOptions) {
  const sessionId = req.headers.cookie
    ?.split("; ")
    .find((c: string) => c.startsWith("sessionId="))
    ?.split("=")[1];

  return { sessionId };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
