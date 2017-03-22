var StringMap = require('stringmap');

/**
 * @dgService exampleMap
 * @description
 * A map of examples parsed out of the doc content, keyed on example id.
 */
module.exports = function exampleMap() {
  return new StringMap();
};