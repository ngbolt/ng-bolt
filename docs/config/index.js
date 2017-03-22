var path = require('canonical-path');
var packagePath = __dirname;
var config = require('../../gulp/configure.js')();
var fs = require('fs');

var Package = require('dgeni').Package;

// Create and export a new Dgeni package
module.exports = new Package('myDoc', [
  require('dgeni-packages/ngdoc'),
  require('dgeni-packages/nunjucks'),
  require('./examples'),
])
   // /docs/config/index.js
  .processor(require('./processors/checkAnchorLinks'))
  .processor(require('./processors/index-page'))
  .processor(require('./processors/api-data'))
  .processor(require('./processors/app-api-data'))
  .processor(require('./processors/guide-data'))
  .processor(require('./processors/home-data'))
  .factory(require('./links/services/getLinkInfo'))

  .config(function (log, readFilesProcessor, writeFilesProcessor) {
    // Set the log level to 'info', switch to 'debug' when troubleshooting
    log.level = config.docsLogLevel || 'warn';

    // Specify the base path used when resolving relative 
    // paths to source and output files
    readFilesProcessor.basePath = path.resolve(packagePath, '../..');

    // Specify our source files that we want to extracted
    readFilesProcessor.sourceFiles = [];

    // Include ngBoltJS source files
    if (config.generateBoltDocs) {
      readFilesProcessor.sourceFiles.push({ 
        // Pass in a different src files location and basepath from your profile for testing purposes
        include: config.docsSrc || './src/**/*.js', 
        basePath: config.docsBasePath || './src' 
      });
    }

    // Optionally add app source files
    if (config.generateAppDocs) {
      readFilesProcessor.sourceFiles.push({
        include: path.join(config.root, config.appSrc, '/**/*.js'),
        basePath: path.join(config.root, config.appSrc)
      })
    }

    // Include static markdown documents for guides and index pages.
    readFilesProcessor.sourceFiles.push({ 
      include: './docs/content/**/*.md', 
      exclude: './docs/content/app/index.md',
      basePath: './docs/content', 
      fileReader: 'ngdocFileReader' 
    });

    // Include any content markdown documents in application root.
    readFilesProcessor.sourceFiles.push({
      include: path.join(config.root, 'content/**/*.md'),
      exclude: path.join(config.root, 'content/app/index.md'),
      basePath: path.join(config.root, 'content'),
      fileReader: 'ngdocFileReader'
    });

    // Look for <app-root>/content/app/index.md, if does not exist, add docs app default.
    if (config.generateAppDocs) {
      try {
        var appIndexPath = path.join(config.root, 'content/app/index.md')
        fs.accessSync(appIndexPath, fs.F_OK);
        readFilesProcessor.sourceFiles.push({
          include: appIndexPath,
          basePath: path.join(config.root, 'content'),
          fileReader: 'ngdocFileReader'
        })
      } catch(e) {
        readFilesProcessor.sourceFiles.push({
          include: './docs/content/app/index.md',
          basePath: './docs/content',
          fileReader: 'ngdocFileReader'
        })
      }
    }

    // Use the writeFilesProcessor to specify the output folder for the extracted files
    writeFilesProcessor.outputFolder = path.join(config.docsDest);

  })

  .config(function(parseTagsProcessor, getInjectables) {
    parseTagsProcessor.tagDefinitions = parseTagsProcessor.tagDefinitions.concat(getInjectables(require('./tag-defs')));
  })

  .config(function (templateFinder) {
    // Specify where the templates are located
    templateFinder.templateFolders.unshift(path.resolve(packagePath, 'templates'));
  })

  .config(function (computePathsProcessor, computeIdsProcessor) {
    // create new compute for 'content' and 'indexPage' type doc
    computeIdsProcessor.idTemplates.push({
      docTypes: ['content', 'indexPage'],
      getId: function (doc) { return doc.fileInfo.baseName; },
      getAliases: function (doc) { return [doc.id]; }
    });

    // Build custom paths and set the outputPaths for "content" pages
    computePathsProcessor.pathTemplates.push({
      docTypes: ['content'],
      getPath: function (doc) {
        // console.log(doc.fileInfo);
        var docPath = path.dirname(doc.fileInfo.relativePath);
        if (doc.fileInfo.baseName !== 'index') {
          docPath = path.join(docPath, doc.fileInfo.baseName);
        }
        return docPath;
      },
      outputPathTemplate: 'partials/${path}.html'
    });

    // Here we are defining what to output for our docType Module
    //
    // Each angular module will be extracted to it's own partial
    // and will act as a container for the various Components, Controllers, Services in that Module
    // We are basically specifying where we want the output files to be located
    computePathsProcessor.pathTemplates.push({
      docTypes: ['module'],
      pathTemplate: '${area}/${name}',
      outputPathTemplate: 'partials/${area}/${name}.html'
    });

    // Doing the same thing but for regular types like Services, Controllers, etc...
    // By default they are grouped in a componentGroup and processed
    // via the generateComponentGroupsProcessor internally in Dgeni
    computePathsProcessor.pathTemplates.push({
      docTypes: ['componentGroup'],
      pathTemplate: '${area}/${moduleName}/${groupType}',
      outputPathTemplate: 'partials/${area}/${moduleName}/${groupType}.html'
    });
  })