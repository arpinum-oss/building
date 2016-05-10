'use strict';

var Bluebird = require('bluebird');
var path = require('path');
var glob = Bluebird.promisify(require('glob'));
var fs = Bluebird.promisifyAll(require('fs-extra'));

function Files() {
  var self = this;
  self.glob = glob;
  self.copyFiles = copyFiles;
  self.globAndCopyFiles = globAndCopyFiles;
  self.writeContent = writeContent;
  self.writeJson = writeJson;
  self.fs = fs;

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
}

module.exports = Files;
