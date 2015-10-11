#!/usr/bin/env node
var fs = require('fs');
var path = require('path');
var mddoc = require('.');
var argv = require('yargs')
    .usage('Usage: $0 file.md -u [user]')
    .demand(1)
    .alias('u', 'user')
    .argv;

var file = argv._[0];

var md = fs.readFileSync(file).toString();
var pkg = require(path.join(process.cwd(), 'package.json'));

var opts = {
  version: pkg.version,
  name: pkg.name,
  user: argv.user || 'clux'
};

process.stdout.write(mddoc(md, opts));
