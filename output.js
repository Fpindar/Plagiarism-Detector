const {
  groupStoreByInput,
} = require("./store");

const {
  getResultSource,
  getResultScore,
} = require("./result");

const objectToCsv = require("./csv");

// Gets all comparison score for each input
function accumulateScores(inputGroup) {
  const scores = {};
  inputGroup.forEach((result) => {
    scores[getResultSource(result)] = getResultScore(result);
  })
  return scores;
}

// Creates row object
function createOutputEntry(inputId, scores) {
  return {
    input_file: inputId,
    ...scores
  };
}

module.exports = {
  // Computes appropriate csv headers by sources
  getOutputHeaders(sources) {
    const sourceNames = sources.map(({ id }) => id);
    const headers = ["input_file", ...sourceNames];
    return headers;
  },

  // Loop through store and add individual result as row to csv
  createOutput(store) {
    const output = Object.values(store).map((inputGroup, index) => {
      const scores = accumulateScores(inputGroup);
      const inputId = inputGroup[0].inputId;
      return createOutputEntry(inputId, scores)
    });
    return output;
  },
  
  // Convert csv output object to text in csv format
  outputToCsv(outputHeaders, output) {
    console.log(output)
    return objectToCsv(outputHeaders, output);
  },
};