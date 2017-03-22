var replaceTask = require('gulp-replace-task')

module.exports = {
  merge: merge
};

/**
 * Merge properties from object2 into object1, assuming object2 is not undefined.
 * @param object1
 * @param object2
 */
function merge( object1, object2 ) {
  if ( object2 ) {
    Object.assign(object1, object2);
  }
}