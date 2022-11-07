let fs = require("fs");
const fsPromises = fs.promises;
const path = require("path");

const pathFiles = path.join(__dirname, "../05-merge-styles", "styles");
const pathToFiles = path.join(__dirname, "../05-merge-styles", "project-dist");

// console.log(pathFiles, pathToFiles);

async function mergeCss() {
  const arrayToFiles = await fsPromises.readdir(pathToFiles);
  const pathToBundle = await path.join(pathToFiles, "bundle.css");
  if (!arrayToFiles.includes("bundle.css")) {
    await fsPromises.writeFile(pathToBundle, "");
  } else {
    await fsPromises.unlink(pathToBundle);
    await fsPromises.writeFile(pathToBundle, "");
  }
  const arrayFiles = await fsPromises.readdir(pathFiles);
  for await (let item of arrayFiles) {
    console.log(item);
    const arrayPathFiles = await path.join(pathFiles, item);
    const arrayExFiles = await path.extname(arrayPathFiles);
    if (arrayExFiles === ".css") {
      await fs.readFile(path.join(pathFiles, item), "utf-8", (err, data) => {
        fsPromises.appendFile(pathToBundle, data);
      });
    }
  }
}
mergeCss();
