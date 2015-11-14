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

## building.files

```javascript
var files = require('building').files;
```

### glob(pattern, [options])

* return: `{Promise}`

Promisification of [glob method] from [glob module]. The documentation is available on [glob repository].

### copyFiles(filePaths, destinationDirectory, [options])

* `filePaths` `{Array<String>}` The file paths to copy
* `destinationDirectory` `{String}` The destination directory
* `options` `{Object}`
* return: `{Promise}`

Copy given files at the root of the destination directory.

#### Options

* `preservePathAfter` `{String}` Copy files but preserve the path after the given one.
Example: when copying `src/assets/js/file.js` into `dist`, you may want to preserve the path after `src/assets` to obtain `dist/js/file.js`.

### globAndCopyFiles(globbing, destinationDirectory, [options])

* `globbing` `{Object}` The globbing information
* `destinationDirectory` `{String}` The destination directory
* `options` `{Object}`
* return: `{Promise}`

Glob files then copy them like `copyFiles`.

#### Globbing

The globbing object contains:

* `pattern`
* `options`

They correspond to the arguments of the [glob method].

#### Options

Same options as `building.files.copyFiles`.

### writeContent(destination, content)

* `destination` `{String}` The destination file, existing or not
* `content` `{String}` The content to write
* return: `{Promise}`

Write content to an existing file or create it before.

### writeJson(destination, object)

* `destination` `{String}` The destination file, existing or not
* `object` `{Object}` The object to write as JSON
* return: `{Promise}`

Write object as JSON to an existing file or create it before.

## building.shell

```javascript
var shell = require('building').shell;
```

### execute(binary, args, [options])

* `binary` `{String}` The binary to execute
* `args` `{Array<String>}` The arguments to pass
* `options` `{Object}`
* return: `{Promise}`

Execute a binary with its arguments.

#### Options

* `resolveLocalBin` `{Boolean}` (default: `false`) Set to `true` to resolve binary from local `node_modules` binary.
Example if `binary` is `jshint` and `resolveLocalBin` is `true`, the resolved binary is `./node_modules/.bin/jshint`.

### createExecution(binary, args, [options])

* `binary` `{String}` The binary to execute
* `args` `{Array<String>}` The arguments to pass
* `options` `{Object}`
* return: `{Object}` containing:
  * value `{ChildProcess}` The standard Node.JS [child process]
  * promise `{Promise}` The execution promise

Like `building.shell.execute` but returns an execution object to access the child process.

#### Options

Same options as `building.shell.execute`.

## License

[MIT](LICENSE)

[glob module]: https://www.npmjs.com/package/glob
[glob method]: https://github.com/isaacs/node-glob#globpattern-options-cb
[glob repository]: https://github.com/isaacs/node-glob
[child process]: https://nodejs.org/api/child_process.html#child_process_class_childprocess
