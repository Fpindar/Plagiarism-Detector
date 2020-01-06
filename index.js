const {
  loadSources,
  loadInputFiles,
  writeOutput,
} = require("./lib/io");

const {
  createStore,
  addToStore,
} = require("./lib/store");

const {
  getPlagarismScore,
} = require("./lib/detect");

const {
  getOutputHeaders,
  createOutput,
  outputToCsv,
} = require("./lib/output");

const {
  createResult
} = require("./lib/result");

// Map through sources and input files and gets similarities scores
async function getSimilarities(sources, inputFiles) {
  const similarities = [];

  for(const source of sources) {
    for(const inputFile of inputFiles) {
      if(!similarities[inputFile.id]) similarities[inputFile.id] = []
      const similarity = await getPlagarismScore(source.content, inputFile.content);
      const result = createResult(similarity, source, inputFile);
      similarities[inputFile.id].push(result);
    }
  }
  return Object.values(similarities);
}

// Convets the Store to CSV format
function convertStoreToCSV(store, sources, inputFiles) {
  const outputHeaders = getOutputHeaders(sources);
  const output = createOutput(store, sources, inputFiles);
  const outputCsv = outputToCsv(outputHeaders, output);

  return outputCsv;
}

async function main() {
  // Create store to hold results to be written in CSV.
  const initStore = createStore(); 

  // Load source files into memory
  const sources = await loadSources();

  // Load input files into memory
  const inputFiles = await loadInputFiles();
  
  // Compare all input files by sources and get similarity scores
  const results = await getSimilarities(sources, inputFiles);

  // Write result of comparison into store
  const completeStore = addToStore(initStore, results);
  
  // Convert store to CSV
  const outputCsv = convertStoreToCSV(completeStore, sources, inputFiles);
  
  // Write CSV to output file
  await writeOutput(outputCsv);
}

main();
