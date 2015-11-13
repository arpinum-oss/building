# Building [![Build Status](https://travis-ci.org/arpinum-oss/building.svg?branch=master)](https://travis-ci.org/arpinum-oss/building)

**Building** helps you write custom tasks for your favorite build tool.

## Installation

    npm install building --save-dev

## Usage

```javascript
// require the whole module...
var building = require('building');

// or specific parts
var files = require('building').files;

return files.writeJson('/tmp/file.json', {hello:'world'});
```

## Promise friendly

All methods tend to manipulate I/O and thus are asynchronous. They use exclusively promises.

## **building** module

The **building** module exposes the following helpers:

* files
* shell

## building.files.glob(pattern, [options])

Promisification of [glob] module. The documentation is available on [glob repository].

Returns a promise.

## building.files.copyFiles(filePaths, destinationDirectory, [options])

## building.files.globAndCopyFiles(globbing, destinationDirectory, [options])

## building.files.writeContent(destination, content)

## building.files.writeJson(destination, object)

## building.shell.execute(binary, args, [options])

## building.shell.createExecution(binary, args, [options])

## License

[MIT](LICENSE)

[glob]: https://www.npmjs.com/package/glob
[glob repository]: https://github.com/isaacs/node-glob
