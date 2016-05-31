'use strict';

var Bluebird = require('bluebird');
var path = require('path');
var glob = Bluebird.promisify(require('glob'));
var fs = Bluebird.promisifyAll(require('fs-extra'));

var files = {
  glob: glob,
  copyFiles: copyFiles,
  globAndCopyFiles: globAndCopyFiles,
  writeContent: writeContent,
  writeJson: writeJson,
  fs: fs
};

function globAndCopyFiles(globbing, destinationDirectory, options) {
  return glob(globbing.pattern, globbing.options).then(function (files) {
    return copyFiles(files, destinationDirectory, options);
  });
}

function copyFiles(filePaths, destinationDirectory, opts) {
  var options = opts || {};
  return Bluebird.each(filePaths, function (filePath) {
    return copyFile(filePath, destinationDirectory);
  });

  function copyFile(filePath) {
    return fs.copyAsync(filePath, destinationPath(filePath));
  }

  function destinationPath(filePath) {
    return path.join(destinationDirectory, relativePath(filePath));
  }

  function relativePath(filePath) {
    if (options.preservePathAfter) {
      var fullBaseDirectoryPath = path.resolve(options.preservePathAfter);
      return path.relative(fullBaseDirectoryPath, filePath);
    }
    return path.basename(filePath);
  }
}

function writeContent(destination, content) {
  return fs.ensureFileAsync(destination)
    .then(function () {
      return fs.writeFileAsync(destination, content);
    });
}

function writeJson(destination, object) {
  return fs.ensureFileAsync(destination)
    .then(function () {
      return fs.writeJsonAsync(destination, object);
    });
}

module.exports = files;
