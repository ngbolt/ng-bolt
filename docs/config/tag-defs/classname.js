module.exports = function(extractTypeTransform, extractNameTransform, wholeTagTransform) {
  return {
    name: 'classname',
    multi: true,
    docProperty: 'classnames',
    transforms: [ extractTypeTransform, extractNameTransform, wholeTagTransform ]
  };
};