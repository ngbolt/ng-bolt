var _ = require('lodash');
var path = require('canonical-path');

/**
 * @dgProcessor generateExamplesProcessor
 * @description
 * Create doc objects of the various things that need to be rendered for an example.
 */
module.exports = function generateExamplesProcessor(log, exampleMap) {

  return {
    $runAfter: ['adding-extra-docs'],
    $runBefore: ['extra-docs-added'],
    $process: function(docs) {
      var that = this;
      exampleMap.forEach(function(example) {
        // Create the doc that will be injected into the website as a runnable example
        var runnableExampleDoc = that.createRunnableExampleDoc(example);
        docs.push(runnableExampleDoc);
        example.runnableExampleDoc = runnableExampleDoc;
      });
    },

    createRunnableExampleDoc: function(example) {
      var exampleDoc = {
        id: example.id + '-runnableExample',
        aliases:  [],
        docType: 'runnableExample',
        fileInfo: example.doc.fileInfo,
        startingLine: example.doc.startingLine,
        endingLine: example.doc.endingLine,
        example: example,
        path: 'inline',
        outputPath: 'inline',
        template: 'inline/runnableExample.template.html'
      };
      return exampleDoc;
    }
  };
};