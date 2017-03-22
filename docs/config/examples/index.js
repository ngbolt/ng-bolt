var path = require('canonical-path');
var packagePath = __dirname;
var Package = require('dgeni').Package;

/**
 * @dgPackage examples
 * @description Processors to support the runnable examples feature in the ngBoltJS docs site.
 */
module.exports = new Package('examples', ['jsdoc'])

.processor(require('./processors/examples-parse'))
.processor(require('./processors/examples-generate'))
.processor(require('./processors/examples-assemble-assets'))

.factory(require('./services/exampleMap'))
.factory(require('./inline-tag-defs/runnableExample'))

.config(function(templateFinder) {
  templateFinder.templateFolders.push(path.resolve(packagePath, 'templates'));
})

.config(function(inlineTagProcessor, runnableExampleInlineTagDef) {
  inlineTagProcessor.inlineTagDefinitions.push(runnableExampleInlineTagDef);
});
