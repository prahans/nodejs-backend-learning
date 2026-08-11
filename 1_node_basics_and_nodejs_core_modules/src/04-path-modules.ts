import path from "node:path";

// const filePath = projectRoot + "/uploads" + filename
// path.join : user the correct seperator for the current os
// users/prahans/project/file.txt
// c:\users\prahans\project\file.txt

// process.cwd : the folder from where the node js process was started

const projectRoot = process.cwd();
console.log("projectRoot : ", projectRoot);

// /uploads/users/42/profile.photo.png

const userId = "42";
const orginalName = "profile.photo.png";

// imp -> path.join -> create a path string
// it will not create folder
// it does not check whether the file exists or not
const uploadFilePath = path.join(
  projectRoot,
  "uploads",
  "users",
  userId,
  orginalName,
);

console.log("uploadFilePath : ", uploadFilePath);

// final part of a path
// const fileName = path.basename(uploadFilePath);
// const fileExt = path.extname(uploadFilePath);
// const parentPath = path.dirname(uploadFilePath);
// console.log(parentPath);

console.log(path.resolve("images", "logo.png"));
// D:\Web Development\nodejs-backend-learning\1_node_basics_and_nodejs_core_modules\images\logo.png
console.log(path.resolve("/images", "logo.png"));
// D:\images\logo.png
console.log(path.basename("/users/john/file.txt"));
// file.txt
console.log(path.basename("/users/john/file.txt", ".txt"));
// file
console.log(path.dirname("/users/john/file.txt"));
// /users/john

// path.parse() :  Converts a path into an object.
console.log(path.parse("/users/john/file.txt"));
// output
// {
//   root: '/',
//   dir: '/users/john',
//   base: 'file.txt',
//   ext: '.txt',
//   name: 'file'
// }

// path.format() : Creates a path from an object.
console.log(
  path.format({
    dir: "/users/john",
    name: "file",
    ext: ".txt",
  }),
);
// output : /users/john\file.txt