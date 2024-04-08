type User = { id: string; name: string; password: string };

const users: User[] = [];

export const db = {
  user: {
    find: async (data: Omit<User, "id">) =>
      users.find(
        (user) => user.name === data.name && user.password === data.password
      ),
    create: async (data: Omit<User, "id">) => {
      const user = { id: String(users.length + 1), ...data };

      users.push(user);

      return user;
    },
  },
};
