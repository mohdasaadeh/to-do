import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { sql, eq } from "drizzle-orm";

import * as schema from "./schema";

const client = createClient({
  url: process.env.DATABASE_URL || "",
  authToken: process.env.DATABASE_TOKEN,
});

const db = drizzle(client, { schema });

type User = { id: number; username: string; password: string };

export const services = {
  user: {
    find: async (data: Omit<User, "id">) => {
      return db.query.users.findFirst({
        where: (users, { eq }) =>
          eq(users.username, data.username) &&
          eq(users.password, data.password),
      });
    },
    create: async (data: Omit<User, "id">) => {
      return db
        .insert(schema.users)
        .values({ username: data.username, password: data.password })
        .returning();
    },
  },
};
