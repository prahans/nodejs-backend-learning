import path from "node:path";

// const filePath = projectRoot + "/uploads" + filename
// path.join : user the correct seperator for the current os
// users/prahans/project/file.txt
// c:\users\prahans\project\file.txt

// process.cwd : the folder from where the node js process was started

const projectRoot = process.cwd();
console.log(projectRoot);
