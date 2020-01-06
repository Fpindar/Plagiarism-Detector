const { setDifference } = require("../structures/set");
const STOP_WORDS = require("../utils/stop-words.json");

const Utils = {
  // Combines multiple funtions into 1
  pipe(...fns) {
    return (value) => fns.reduce((accumulator, fn) => fn(accumulator), value);
  },
  
  // Converts text to lowercase
  toLowerCase(text) {
    return text.toLowerCase();
  },

  // Strips text of blank characters (tabs, empty lines etc)
  replaceBlankCharactersWithSingleBlank(text) {
    return text.replace(/\s\s+/g, ' ');
  },

  // Strips text of punctuation marks
  stripPunctuation(text) {
    return text.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
  },

  // Splits text into array of texts
  splitText(text) {
    return text.split(" ");
  },

  cleanText(text) {
    return Utils.pipe(
      Utils.toLowerCase,
      Utils.stripPunctuation,
      Utils.replaceBlankCharactersWithSingleBlank
    )(text)
  },

  // Removes irrelevant words from word set
  removeStopWordsFromSet(set) {
    return setDifference(set, STOP_WORDS);
  },
};

module.exports = Utils;