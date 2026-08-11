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
    id: 1,
    name: "elon",
    role: "user",
  },
];

// callback is function - this func u r passing diff function
// callback(error, result) -> *** imp concept -> classic nodejs callback pattern
