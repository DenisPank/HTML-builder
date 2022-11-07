const fs = require("fs");
const path = require("path");
const { stdin, stdout } = process;

let file;
fs.readFile(
  path.join(__dirname, "../06-build-page", "/template.html"),
  "utf8",
  (err, data) => {
    if (err) throw err;
    file = data.split("\n")[1];
  }
);
console.log(file);
