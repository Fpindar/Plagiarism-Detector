const getJaccardSimilarityScore = require("../algorithms/jaccard/");

module.exports = {
  // Get jaccard similarity score of 2 files
  async getPlagarismScore(source, input) {
    return getJaccardSimilarityScore(source, input);
  }
};