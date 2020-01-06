const SetMethods = {
  // Check if sets contain elements
  setContains(set, element) {
    const newSet = new Set(set);
    return newSet.has(element);
  },

  // Returns union of sets
  setUnion(set1, set2) {
    return new Set([...set1, ...set2]);
  },

  // Returns intersection of sets
  setIntersection(set1, set2) {
    const set2Contains = (x) => SetMethods.setContains(set2, x);
    return new Set([...set1].filter(set2Contains));
  },

  // Returns difference of sets
  setDifference(set1, set2) {
    const set2DoesNotContains = (x) => !SetMethods.setContains(set2, x);
    return new Set([...set1].filter(set2DoesNotContains));
  }
};

module.exports = SetMethods;