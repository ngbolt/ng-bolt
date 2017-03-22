var source = require('vinyl-source-stream');
var vinylBuffer = require('vinyl-buffer');

module.exports = {
  streamBuffer: streamBuffer
};

/**
 * @param buffer The object or string to a stream.
 * @returns {Object} A stream containing the contents of the buffer that was passed in.
 */
function streamBuffer( buffer ) {
  // make a new stream with fake file name
  var stream = source('buffer.json');
  // write the file contents to the stream
  if ( buffer !== null && typeof buffer === 'object' ) {
    stream.write(JSON.stringify(buffer));
  } else {
    stream.write('' + buffer);
  }
  process.nextTick(function() {
    // in the next process cycle, end the stream
    stream.end();
  });
  return stream.pipe(vinylBuffer());
}