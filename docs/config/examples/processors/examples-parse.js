var _ = require('lodash');
var path = require('canonical-path');

var EXAMPLE_REGEX = /<example([^>]*)>([\S\s]+?)<\/example>/g;
var ATTRIBUTE_REGEX = /\s*([^=]+)\s*=\s*(?:(?:"([^"]+)")|(?:'([^']+)'))/g;
var JAVASCRIPT_REGEX = /<javascript([^>]*)>([\S\s]+?)<\/javascript>/g;
var CSS_REGEX = /<css([^>]*)>([\S\s]+?)<\/css>/g;
var HTML_REGEX = /<html([^>]*)>([\S\s]+?)<\/html>/g;


/**
 * @dgProcessor parseExamplesProcessor
 * @description
 * Search the documentation for examples that need to be extracted.
 */
module.exports = function parseExamplesProcessor(log, exampleMap, trimIndentation, createDocMessage) {
  return {
    $runAfter: ['files-read'],
    $runBefore: ['parsing-tags'],
    $process: function(docs) {

      docs.forEach(function(doc) {
        try {
          if (!doc.content) { return; }
          doc.content = doc.content.replace(EXAMPLE_REGEX, function processExample(match, attributeText, exampleText) {
            var example = extractAttributes(attributeText);

            var id = uniqueName(exampleMap, 'example-' + (example.name || 'example'));
            _.assign(example, {
              attributes: _.omit(example, ['files', 'doc']),
              javascript: extractJavascript(exampleText),
              html: extractHtml(exampleText),
              css: extractCss(exampleText),
              id: id,
              doc: doc,
            });

            // store the example information for later
            exampleMap.set(id, example);

            return '{@runnableExample ' + id + '}';
          });
        } catch(error) {
          throw new Error(createDocMessage('Failed to parse examples', doc, error));
        }
      });

    }
  };

  function extractAttributes(attributeText) {
    var attributes = {};
    attributeText.replace(ATTRIBUTE_REGEX, function(match, prop, val1, val2){
      attributes[prop] = val1 || val2;
    });
    return attributes;
  }

  function extractContentAndAttributes(exampleText, regex) {
    var extracted = {};
    exampleText.replace(regex, function(match, attributeText, contentText){
      extracted = extractAttributes(attributeText);
      extracted.content = contentText;
    });
    return extracted;
  }

  function extractHtml(exampleText) {
    return extractContentAndAttributes(exampleText, HTML_REGEX);
  }

  function extractJavascript(exampleText) {
   return extractContentAndAttributes(exampleText, JAVASCRIPT_REGEX);
  }

  function extractCss(exampleText) {
    return extractContentAndAttributes(exampleText, CSS_REGEX);
  }

  function uniqueName(containerMap, name) {
    if ( containerMap.has(name) ) {
      var index = 1;
      while(containerMap.has(name + index)) {
        index += 1;
      }
      name = name + index;
    }
    return name;
  }
};
