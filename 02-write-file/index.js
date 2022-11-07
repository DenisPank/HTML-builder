const path = require("path");
const fs = require("fs");
const { stdin, stdout } = process;

stdout.write("Hello! Write your massage\n");
stdin.on("data", (data) => {
  let info = data.toString();
  if (info.trim() === "exit") {
    console.log("Exit from this program. Good luck!");
    process.exit();
  } else {
    fs.appendFile(
      path.join(__dirname, "../02-write-file", "text.txt"),
      info,
      (err) => {
        if (err) throw err;
      }
    );
  }
});
process.on("SIGINT", () => {
  console.log("Exit from this program. Good luck!");
  process.exit();
});
