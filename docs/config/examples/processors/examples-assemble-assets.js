var _ = require('lodash');
var path = require('canonical-path');

/**
 * @dgProcessor assembleExampleAssets
 * @description
 * Create doc objects that contains all of the javascript and css that are defined in any of our examples. These will be
 * combined into javascript and css files respectively and included in our app index.
 */
module.exports = function assembleExampleAssetsProcessor(log, exampleMap) {

  return {
    $runAfter: ['extra-docs-added'],
    $runBefore: ['rendering-docs'],
    $process: function(docs) {
      var that = this;
      var javascript = {};
      var css = {};
      exampleMap.forEach(function(example) {
        if(example.javascript && example.runnable === 'true'){
          javascript[example.id] = example.javascript;
        }
        if(example.css && example.runnable === 'true'){
          css[example.id] = example.css;
        }
      });
      // Create the doc that will be injected into the website as a runnable example
      docs.push(that.createRunnableExampleDoc(javascript))
      docs.push(that.createExampleCssDoc(css))
    },

    createRunnableExampleDoc: function(javascript) {
      return {
        name: "ExampleJavascript",
        items: javascript,
        template: 'exampleJavascript.template.js',
        outputPath: 'data/example-javascript.js'
      };
    },

    createExampleCssDoc: function(css) {
      return {
        name: "ExampleCss",
        items: css,
        template: 'exampleCss.template.css',
        outputPath: 'data/example-css.css'
      };
    }
  };
};