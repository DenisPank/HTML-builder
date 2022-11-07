let fs = require("fs");
const fsPromises = fs.promises;
const path = require("path");

const pathFiles = path.join(__dirname, "../04-copy-directory", "files");
const pathToFiles = path.join(__dirname, "../04-copy-directory", "files-copy");

async function copyFiles(pathFiles, pathToFiles) {
  await fsPromises.rm(pathToFiles, { force: true, recursive: true }, () => {});
  await fsPromises.mkdir(pathToFiles, { recursive: true }, () => {});
  const arrayForCopy = await fsPromises.readdir(pathFiles, () => {});
  const arrayOfTypes = await fsPromises.readdir(
    pathFiles,
    {
      withFileTypes: true,
    },
    () => {}
  );

  for (let i = 0; i < arrayOfTypes.length; i++) {
    const newPathFiles = path.join(pathFiles, arrayForCopy[i]);
    const newPathToFiles = path.join(pathToFiles, arrayForCopy[i]);
    if (arrayOfTypes[i].isFile()) {
      await fs.copyFile(
        path.join(newPathFiles),
        path.join(newPathToFiles),
        () => {}
      );
    } else if (arrayOfTypes[i].isDirectory()) {
      await fsPromises.mkdir(newPathToFiles, { recursive: true }, () => {});
      await copyFiles(newPathFiles, newPathToFiles);
    }
  }
}

copyFiles(pathFiles, pathToFiles);
