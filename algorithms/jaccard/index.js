const { 
  getTextShingleSet,
  calculateJaccardSimilarity,
 } = require("./jaccard");

 // Computes jaccard similarity
module.exports = function getSimilarity (text1, text2) {
  const shingleSet1 = getTextShingleSet(text1);
  const shingleSet2 = getTextShingleSet(text2);
  return calculateJaccardSimilarity(shingleSet1, shingleSet2);
}