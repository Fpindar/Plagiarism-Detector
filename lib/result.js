module.exports = {
  // Creates result object
  createResult(score, source, input) {
    return {
      sourceId: source.id,
      inputId: input.id,
      score
    };
  },

  // Get result source Id
  getResultSource(result) {
    return result.sourceId;
  },

  // Get result score
  getResultScore(result) {
    return result.score;
  }
}