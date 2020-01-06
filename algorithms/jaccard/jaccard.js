const {
  setIntersection,
  setUnion,
} = require("../structures/set");

const {
  cleanText,
  splitText,
  removeStopWordsFromSet,
  pipe,
} = require("./utils");

module.exports = {
  // Get word set
  getTextShingleSet(text) {
    return pipe(
      cleanText,
      splitText,
      removeStopWordsFromSet,
    )(text);
  },

  // Calculate jaccard similarity by 2 sets (size of intersection / size of union)
  calculateJaccardSimilarity(set1, set2) {
    const intersection = setIntersection(set1, set2);
    const union = setUnion(set1, set2);
    return intersection.size / union.size;
  }
}