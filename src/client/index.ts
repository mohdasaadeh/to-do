import { createTRPCClient, httpBatchLink } from "@trpc/client";

import type { AppRouter } from "../server";

let sessionId: number | undefined;

const trpc = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:3000",
      async headers() {
        return {
          Cookie: `sessionId=${sessionId || ""}`,
        };
      },
    }),
  ],
});

// trpc.register
//   .mutate({
//     username: "mohammad",
//     password: "testtest",
//   })
//   .then((response) => {
//     console.log(response);

//     trpc.login
//       .query({ username: "mohammad", password: "testtest" })
//       .then((response) => {
//         console.log(response);
//       });
//   });

// trpc.secret.query();

trpc.login
  .query({ username: "mohammad", password: "testtest" })
  .then((response) => {
    sessionId = response?.id;

    trpc.secret.query();
  });
