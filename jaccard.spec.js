const { 
  getTextShingleSet,
  calculateJaccardSimilarity,
 } = require("./jaccard");

describe("#jaccard", () => {
  describe("#getTextShingleSet", () => {
    it(`should return a clean(lowercase, no punctuation, blank spaces, stop words) set of words`, () => {
      const text = "The plane was ready for touch down";
      const expected = new Set(["plane", "ready", "touch"]);
      const result = getTextShingleSet(text);
      expect(result).toEqual(expected);
    });
  });

  describe("#calculateJaccardSimilarity", () => {
    it("should return size ratio of intersection to union of 2 sets", () => {
      const testData = {
        set1: ["a", "b", "c", "d", "e"],
        set2: ["c", "d", "e", "f", "g", "h"],
      };
      const expected = 3/8;
      const result = calculateJaccardSimilarity(testData.set1, testData.set2);
      expect(result).toEqual(expected);
    });
  });
});