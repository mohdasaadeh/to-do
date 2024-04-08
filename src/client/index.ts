import { createTRPCClient, httpBatchLink } from "@trpc/client";

import type { AppRouter } from "../server";

const trpc = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:3000",
    }),
  ],
});

trpc.register
  .mutate({
    name: "mohammad",
    password: "testtest",
  })
  .then((response) => {
    console.log(response);

    trpc.login
      .query({ name: "mohammad", password: "testtest" })
      .then((response) => {
        console.log(response);
      });
  });
