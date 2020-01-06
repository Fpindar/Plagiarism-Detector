const os = require("os");

// Convert object collection to CSV
function objectToCSV(columns=[], data) {
  const header = generateHeader(columns);
  const normalizedData = data.map(normalize(columns));
  const outputRows = normalizedData.map(toOutputRow);

  const rows = [header, ...outputRows];
  const output = generateOutput(rows);
  return output;
}

// Generates header line
function generateHeader(columns) {
  return columns.join();
}

// Removes irrelevant keys from object
function normalize(columns) {
  return (data) => {
    const normalized = { ...data };
    const irrelevantKeys = Object.keys(data).filter(key => !columns.includes(key));
    irrelevantKeys.forEach(key => delete normalized[key]);
    return normalized;
  };
}

// Converts data to CSV row
function toOutputRow(data) {
  return Object.values(data).join();
}

// Combines output rows to single csv text
function generateOutput(rows) {
  return rows.join(os.EOL);
}

module.exports = objectToCSV;