// processors/api-data.js

var _ = require('lodash');
var config = require('../../../gulp/configure.js')();

// Creating a generic method to assign all of our
// data more easily (including subpages)
function buildDocData(doc, extraData) {

  // So that we can create states even though our module names contain dots(.)
  // in UI-Router dotted notation means it's a child state, so this is problematic
  // if we are following Angular styleguides and conventions regarding
  // naming of our Modules
  // #hack #lazy
  var splitName = doc.name.split('.');
  doc.stateName = _.camelCase(splitName);

  return _.assign({
    name: doc.name,
    type: doc.docType,
    template: doc.outputPath,
    path: '/#/' + doc.path,
    deprecated: doc.deprecated,
    order: parseInt(doc.sortorder, 10) || 100
  }, extraData);
}

module.exports = function appApiPagesProcessor(moduleMap) {
  // Defining when the processor will run, and it's process
  return {
    $runAfter: ['paths-computed'],
    $runBefore: ['rendering-docs'],
    $process: process
  };

  // Our process method definition
  // Getting all docs as a parameter
  function process(docs) {
    var apiPages = _(docs)

      // Filtering our all the docs that are not in a module
      // and the ones that are componentGroups
      .filter(function (doc) {
        return doc.area == 'app' && doc.docType !== 'componentGroup';
      })

      // Filtering and grouping by Module
      .filter('module')
      .groupBy('module')

      // Map of our Module Docs
      .map(function (moduleDocs, moduleName) {

        var moduleDoc = _.find(docs, {
          docType: 'module',
          name: moduleName
        });

        // Making sure we don't get any exceptions when the module is undefined
        if (!moduleDoc) return;

        // Calling back to our generic method to build the object
        return buildDocData(moduleDoc, {
          docs: moduleDocs

            .filter(function (doc) {
              return doc.docType !== 'module';
            })

            .map(buildDocData)
        });

      })

      // Removing null items
      .filter()

      // Get the value
      .value();

    // After all the processing is done, we push the changes to docs
    // Note here that we are using our constant template defined earlier
    // Name and Items are parsed with the template
    docs.push({
      name: 'APP_API_DATA',
      template: 'constant-data.template.js',
      outputPath: 'data/app-api-data.js',
      items: apiPages
    });
  }
};