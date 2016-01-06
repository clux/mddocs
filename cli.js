#!/usr/bin/env node
var fs = require('fs');
var path = require('path');
var co = require('co');
var mddoc = require('.');
var argv = require('yargs')
    .usage('Usage: $0 file.md -u [user]')
    .demand(1)
    .alias('u', 'user')
    .argv;
var file = argv._[0];

// read markdown input and relevant package properties
var md = fs.readFileSync(file);
var pkg = require(path.join(process.cwd(), 'package.json'));

var opts = {
  version: pkg.version,
  name: pkg.name,
  user: argv.user || 'clux',
};

co(function *() {
  var res = yield mddoc(md, opts);
  process.stdout.write(res);
}).catch(function (err) {
  console.error(err.stack);
  process.exit(1);
});
