'use strict';

var _ = require('lodash');
var Bluebird = require('bluebird');
var path = require('path');
var spawn = require('cross-spawn');

var shell = {
  executeLocal: executeLocal,
  execute: execute,
  createExecution: createExecution
};

function executeLocal(binary, args, options) {
  return execute(binary, args, _.merge({resolveLocalBin: true}, options));
}

function execute(binary, args, options) {
  return createExecution(binary, args, options).promise;
}

function createExecution(binary, args, opts) {
  var options = _.defaults({}, opts, defaultExecuteOptions());
  var theBinary = binaryFrom(binary, options);
  var value = spawn(theBinary, args, options.spawn);
  var promise = executionPromise(value);
  return {
    value: value,
    promise: promise
  };
}

function binaryFrom(binary, options) {
  if (options.resolveLocalBin) {
    return path.resolve('node_modules', '.bin', binary);
  }
  return binary;
}

function executionPromise(execution) {
  return new Bluebird(function (resolve, reject) {
    execution.on('close', executionClosed);
    execution.on('error', reject);
    function executionClosed(code) {
      if (code !== 0) {
        reject(new Error('Executions failed'));
      }
      resolve();
    }
  });
}

function defaultExecuteOptions() {
  return {
    resolveLocalBin: false,
    spawn: {
      stdio: 'inherit',
      encoding: 'UTF-8'
    }
  };
}

module.exports = shell;
