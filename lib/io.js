const fs = require("fs").promises;
const objectToCsv = require("./csv");

// Checks if file is text file by file name
function isTextFile(fileName) {
  return fileName.includes(".txt");
}

// Lists files in directory
async function listFilesInDirectory(dir) {
  const files = await fs.readdir(dir);
  return files.filter(isTextFile);
}

// Returns function to get file object from a file in a particular directory
function getFileObject(dir) {
  return async (fileName) => {
    const fileLocation = `${dir}/${fileName}`;
    const content = await fs.readFile(fileLocation, "utf-8");
    return { id: fileName, content };
  };
}

// Loads all files in directory
async function loadFiles(dir) {
  const fileList = await listFilesInDirectory(dir);
  const fileObjects = await Promise.all(fileList.map(getFileObject(dir)));
  return fileObjects;
}

// generates output file name 
function getOutputFileName() {
  const now = new Date();
  return `output-${now.getTime()}.csv`;
}

// Writes to file
async function writeToFile(fileLocation, content) {
  return fs.writeFile(fileLocation, content, "utf-8");
}

const DEFAULT_SOURCE_DIR = "../data/source";
const DEFAULT_INPUT_DIR = "../data/input";
const DEFAULT_OUTPUT_DIR = "../output";

module.exports = {
  loadSources(dir = DEFAULT_SOURCE_DIR) {
    return loadFiles(dir);
  },
  
  async loadInputFiles(dir = DEFAULT_INPUT_DIR) {
    return loadFiles(dir);
  },
  
  async writeOutput(outputCsv, dir=DEFAULT_OUTPUT_DIR) {
    const ouputFileName = getOutputFileName();
    const outputFileLocation = `${dir}/${ouputFileName}`;
    return writeToFile(outputFileLocation, outputCsv);
  }
};
