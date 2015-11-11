'use strict';

module.exports = {
  files: new (require('./lib/Files'))(),
  shell: new (require('./lib/Shell')())
}
