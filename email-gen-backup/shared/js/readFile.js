var fs = require('fs');
var Q = require('q');

function readFile(dir, fileName, fileHandler) {
  var deferred = Q.defer();
  fs.readFile(`${dir}/resources/${fileName}`, function(err, data) {
    if (err) {
      console.error(`Error reading file ${fileName}`);
      deferred.resolve(fileHandler(data));
    }
    deferred.resolve(fileHandler(data));
  });
  return deferred.promise;
}

module.exports = readFile
