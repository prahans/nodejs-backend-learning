import { rejects } from "node:assert";
import { resolve } from "node:dns";

type User = {
  id: number;
  name: string;
  role: "user" | "super-admin";
};

const users: User[] = [
  {
    id: 1,
    name: "prahans",
    role: "user",
  },
  {
    id: 2,
    name: "anurag",
    role: "super-admin",
  },
  {
    id: 3,
    name: "elon",
    role: "user",
  },
];

// callback is function - this func u r passing diff function
// callback(error, result) -> *** imp concept -> classic nodejs callback pattern

// function findUserById(
//   id: number,
//   callback: (error: Error | null, user?: User) => void,
// ) {
//   const user = users.find((user) => user.id === id);
//   if (!user) {
//     callback(new Error("user not found"));
//     return;
//   }
//   callback(null, user);
// }

// findUserById(1, (error, user) => {
//   if (error) {
//     console.error(error.message);
//     return;
//   }
//   console.log(user);
// });

// function findUserByIdPromise(id: number): Promise<User> {
//   return new Promise((resolve, rejects) => {
//     const user = users.find((user) => user.id === id);
//     if (!user) {
//       rejects(new Error("user not found"));
//       return;
//     }

//     resolve(user);
//   });
// }

// findUserByIdPromise(3)
//   .then((user) => console.log(user))
//   .catch((error) => console.error(error.message));

async function getUser(id: number): Promise<User> {
  const user = users.find((user) => user.id === id);
  if (!user) {
    throw new Error("user not found");
  }

  return user;
}

async function main() {
  try {
    const user = await getUser(5);
    console.log(user);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
}

main();
